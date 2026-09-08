// src/index.ts
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { existsSync, promises as fs } from "node:fs";
import { createServer } from "node:net";
import { homedir } from "node:os";
import { basename, join, resolve } from "node:path";
var name = "dsh-personal-studio";
var inject = ["webServer"];
var running = /* @__PURE__ */ new Map();
var terminals = /* @__PURE__ */ new Map();
var terminalByRoot = /* @__PURE__ */ new Map();
var TERMINAL_OUTPUT_LIMIT = 2e5;
var WORK_LOG_DIRECTORY = process.env.DSH_PERSONAL_STUDIO_WORK_LOG_DIR ? resolve(process.env.DSH_PERSONAL_STUDIO_WORK_LOG_DIR) : join(homedir(), "Documents", "Obsidian Vault", "06 \u5DE5\u4F5C\u660E\u7EC6", "\u5DE5\u4F5C\u65E5\u5FD7");
var WINDOWS_RESERVED_NAME = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/i;
function json(res, status, value) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(JSON.stringify(value));
}
async function requestBody(req, maxBytes = 32768) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    const part = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += part.length;
    if (size > maxBytes) throw new Error("\u8BF7\u6C42\u5185\u5BB9\u8FC7\u5927");
    chunks.push(part);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
async function availablePort() {
  return await new Promise((accept, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (address === null || typeof address === "string") {
        server.close();
        reject(new Error("\u65E0\u6CD5\u5206\u914D\u9879\u76EE\u9884\u89C8\u7AEF\u53E3"));
        return;
      }
      server.close((error) => {
        if (error) reject(error);
        else accept(address.port);
      });
    });
  });
}
function stopProject(child) {
  if (child.exitCode !== null || child.killed) return;
  if (process.platform !== "win32" || child.pid === void 0) {
    child.kill("SIGTERM");
    return;
  }
  const killer = spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
    stdio: "ignore",
    windowsHide: true
  });
  killer.once("error", () => {
    if (child.exitCode === null) child.kill();
  });
  killer.once("exit", (code) => {
    if (code !== 0 && child.exitCode === null) child.kill();
  });
}
async function waitForPreview(url, child) {
  const deadline = Date.now() + 15e3;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error("\u9879\u76EE\u542F\u52A8\u811A\u672C\u63D0\u524D\u9000\u51FA");
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(1e3) });
      if (response.ok) return;
    } catch {
    }
    await new Promise((accept) => {
      setTimeout(accept, 250);
    });
  }
  stopProject(child);
  throw new Error("\u9879\u76EE\u542F\u52A8\u8D85\u8FC7 15 \u79D2\uFF0C\u8BF7\u68C0\u67E5\u9879\u76EE\u7684\u542F\u52A8\u811A\u672C");
}
async function launchProject(projectPath) {
  const root = await fs.realpath(resolve(projectPath));
  const active = running.get(root);
  if (active !== void 0 && active.child.exitCode === null) return { kind: "web", url: active.url };
  const manifestPath = join(root, "package.json");
  if (!existsSync(manifestPath)) return { kind: "workspace" };
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const script = manifest.scripts?.start !== void 0 ? "start" : manifest.scripts?.dev !== void 0 ? "dev" : void 0;
  if (script === void 0) return { kind: "workspace" };
  const command = existsSync(join(root, "pnpm-lock.yaml")) ? "pnpm" : existsSync(join(root, "yarn.lock")) ? "yarn" : "npm";
  const port = await availablePort();
  const url = `http://127.0.0.1:${port}/`;
  const args = command === "yarn" ? [script] : ["run", script];
  const child = spawn(command, args, {
    cwd: root,
    shell: process.platform === "win32",
    windowsHide: true,
    env: { ...process.env, PORT: String(port), HOST: "127.0.0.1", NO_OPEN: "1", BROWSER: "none" },
    stdio: "ignore"
  });
  child.once("exit", () => {
    running.delete(root);
  });
  child.once("error", () => {
    running.delete(root);
  });
  running.set(root, { child, url });
  await waitForPreview(url, child);
  return { kind: "web", url };
}
async function createProjectDirectory(parentPath, name2) {
  const folder = name2.trim();
  if (folder === "" || folder === "." || folder === ".." || /[\\/]/.test(folder)) {
    throw new Error("\u9879\u76EE\u6587\u4EF6\u5939\u540D\u79F0\u53EA\u80FD\u662F\u4E00\u4E2A\u6709\u6548\u7684\u6587\u4EF6\u5939\u540D\u79F0");
  }
  if (/[<>:"|?*\u0000-\u001f]/.test(folder) || /[. ]$/.test(folder) || WINDOWS_RESERVED_NAME.test(folder)) {
    throw new Error("\u9879\u76EE\u6587\u4EF6\u5939\u540D\u79F0\u4E0D\u7B26\u5408 Windows \u547D\u540D\u89C4\u5219");
  }
  const parent = await fs.realpath(resolve(parentPath));
  if (!(await fs.stat(parent)).isDirectory()) throw new Error("\u6240\u9009\u7236\u5DE5\u4F5C\u533A\u4E0D\u662F\u6587\u4EF6\u5939");
  const path = join(parent, folder);
  try {
    await fs.mkdir(path);
  } catch (reason) {
    if (reason.code === "EEXIST") throw new Error(`\u6587\u4EF6\u5939\u201C${folder}\u201D\u5DF2\u7ECF\u5B58\u5728`);
    throw reason;
  }
  return await fs.realpath(path);
}
function appendTerminalOutput(terminal, value) {
  terminal.output += value.replace(/\u001B\[[0-?]*[ -/]*[@-~]/gu, "").replace(/\r\n?/gu, "\n");
  if (terminal.output.length <= TERMINAL_OUTPUT_LIMIT) return;
  const remove = terminal.output.length - TERMINAL_OUTPUT_LIMIT;
  terminal.output = terminal.output.slice(remove);
  terminal.baseOffset += remove;
}
function terminalSnapshot(terminal, offset = terminal.baseOffset) {
  const begin = Math.max(0, offset - terminal.baseOffset);
  return {
    sessionId: terminal.id,
    shell: terminal.shell,
    output: terminal.output.slice(begin),
    offset: terminal.baseOffset + terminal.output.length,
    status: terminal.status
  };
}
async function openProjectTerminal(projectPath) {
  const root = await fs.realpath(resolve(projectPath));
  if (!(await fs.stat(root)).isDirectory()) throw new Error("\u9879\u76EE\u8DEF\u5F84\u4E0D\u662F\u6587\u4EF6\u5939");
  const activeId = terminalByRoot.get(root);
  const active = activeId === void 0 ? void 0 : terminals.get(activeId);
  if (active?.status === "running") return active;
  const command = process.platform === "darwin" ? process.env.SHELL || "/bin/zsh" : process.platform === "win32" ? "powershell.exe" : void 0;
  if (command === void 0) throw new Error("\u5F53\u524D\u7CFB\u7EDF\u6682\u4E0D\u652F\u6301\u9879\u76EE\u7EC8\u7AEF");
  const args = process.platform === "darwin" ? ["-l"] : ["-NoLogo", "-NoProfile", "-NoExit", "-Command", "-"];
  const child = spawn(command, args, {
    cwd: root,
    shell: false,
    windowsHide: true,
    stdio: ["pipe", "pipe", "pipe"]
  });
  const terminal = {
    id: randomUUID(),
    child,
    root,
    shell: process.platform === "darwin" ? "terminal" : "powershell",
    output: "",
    baseOffset: 0,
    status: "running"
  };
  child.stdout?.setEncoding("utf8");
  child.stderr?.setEncoding("utf8");
  child.stdout?.on("data", (value) => {
    appendTerminalOutput(terminal, String(value));
  });
  child.stderr?.on("data", (value) => {
    appendTerminalOutput(terminal, String(value));
  });
  child.once("exit", (code) => {
    terminal.status = "exited";
    appendTerminalOutput(terminal, `
[\u7EC8\u7AEF\u5DF2\u9000\u51FA${code === null ? "" : `\uFF0C\u4EE3\u7801 ${code}`} ]
`);
    terminalByRoot.delete(root);
  });
  await new Promise((accept, reject) => {
    child.once("error", reject);
    child.once("spawn", accept);
  });
  terminals.set(terminal.id, terminal);
  terminalByRoot.set(root, terminal.id);
  if (process.platform === "win32") {
    child.stdin?.write("[Console]::InputEncoding = [System.Text.UTF8Encoding]::new($false); [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false); $OutputEncoding = [Console]::OutputEncoding\n");
  }
  return terminal;
}
function requireTerminal(sessionId) {
  if (typeof sessionId !== "string" || sessionId === "") throw new Error("\u7F3A\u5C11\u7EC8\u7AEF\u4F1A\u8BDD");
  const terminal = terminals.get(sessionId);
  if (terminal === void 0) throw new Error("\u7EC8\u7AEF\u4F1A\u8BDD\u4E0D\u5B58\u5728\uFF0C\u8BF7\u91CD\u65B0\u6253\u5F00");
  return terminal;
}
function requireLogDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/u.test(value)) throw new Error("\u65E5\u671F\u683C\u5F0F\u65E0\u6548");
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    throw new Error("\u65E5\u671F\u4E0D\u5B58\u5728");
  }
  return value;
}
async function readWorkLog(date) {
  const path = join(WORK_LOG_DIRECTORY, `${date}.md`);
  try {
    return { date, content: await fs.readFile(path, "utf8"), exists: true };
  } catch (reason) {
    if (reason.code !== "ENOENT") throw reason;
    return { date, content: "", exists: false };
  }
}
async function saveWorkLog(date, content) {
  await fs.mkdir(WORK_LOG_DIRECTORY, { recursive: true });
  await fs.writeFile(join(WORK_LOG_DIRECTORY, `${date}.md`), content, "utf8");
}
async function listWorkLogs(month) {
  if (!/^\d{4}-\d{2}$/u.test(month)) throw new Error("\u6708\u4EFD\u683C\u5F0F\u65E0\u6548");
  try {
    const names = await fs.readdir(WORK_LOG_DIRECTORY);
    return names.filter((name2) => name2.startsWith(`${month}-`) && /^\d{4}-\d{2}-\d{2}\.md$/u.test(name2)).map((name2) => name2.slice(0, -3)).sort();
  } catch (reason) {
    if (reason.code === "ENOENT") return [];
    throw reason;
  }
}
function apply(ctx) {
  ctx.effect(() => {
    const unregisterLaunch = ctx.webServer.register({
      kind: "exact",
      path: "/api/personal-studio/launch",
      handler: async (req, res) => {
        if (req.method !== "POST") {
          json(res, 405, { error: "\u53EA\u652F\u6301 POST \u8BF7\u6C42" });
          return;
        }
        try {
          const body = await requestBody(req);
          if (typeof body.path !== "string" || body.path.trim() === "") throw new Error("\u7F3A\u5C11\u9879\u76EE\u8DEF\u5F84");
          const result = await launchProject(body.path);
          json(res, 200, { ...result, name: basename(body.path) });
        } catch (reason) {
          json(res, 422, { error: reason instanceof Error ? reason.message : String(reason) });
        }
      }
    });
    const unregisterCreateDirectory = ctx.webServer.register({
      kind: "exact",
      path: "/api/personal-studio/create-directory",
      handler: async (req, res) => {
        if (req.method !== "POST") {
          json(res, 405, { error: "\u53EA\u652F\u6301 POST \u8BF7\u6C42" });
          return;
        }
        try {
          const body = await requestBody(req);
          if (typeof body.parentPath !== "string" || body.parentPath.trim() === "") throw new Error("\u7F3A\u5C11\u7236\u5DE5\u4F5C\u533A\u8DEF\u5F84");
          if (typeof body.name !== "string") throw new Error("\u7F3A\u5C11\u9879\u76EE\u6587\u4EF6\u5939\u540D\u79F0");
          const path = await createProjectDirectory(body.parentPath, body.name);
          json(res, 201, { path });
        } catch (reason) {
          json(res, 422, { error: reason instanceof Error ? reason.message : String(reason) });
        }
      }
    });
    const unregisterOpenTerminal = ctx.webServer.register({
      kind: "exact",
      path: "/api/personal-studio/open-terminal",
      handler: async (req, res) => {
        if (req.method !== "POST") {
          json(res, 405, { error: "\u53EA\u652F\u6301 POST \u8BF7\u6C42" });
          return;
        }
        try {
          const body = await requestBody(req);
          if (typeof body.path !== "string" || body.path.trim() === "") throw new Error("\u7F3A\u5C11\u9879\u76EE\u8DEF\u5F84");
          const terminal = await openProjectTerminal(body.path);
          json(res, 200, terminalSnapshot(terminal));
        } catch (reason) {
          json(res, 422, { error: reason instanceof Error ? reason.message : String(reason) });
        }
      }
    });
    const unregisterReadTerminal = ctx.webServer.register({
      kind: "exact",
      path: "/api/personal-studio/read-terminal",
      handler: async (req, res) => {
        if (req.method !== "POST") {
          json(res, 405, { error: "\u53EA\u652F\u6301 POST \u8BF7\u6C42" });
          return;
        }
        try {
          const body = await requestBody(req);
          const terminal = requireTerminal(body.sessionId);
          const offset = typeof body.offset === "number" && Number.isFinite(body.offset) ? body.offset : terminal.baseOffset;
          json(res, 200, terminalSnapshot(terminal, offset));
        } catch (reason) {
          json(res, 422, { error: reason instanceof Error ? reason.message : String(reason) });
        }
      }
    });
    const unregisterSendTerminal = ctx.webServer.register({
      kind: "exact",
      path: "/api/personal-studio/send-terminal",
      handler: async (req, res) => {
        if (req.method !== "POST") {
          json(res, 405, { error: "\u53EA\u652F\u6301 POST \u8BF7\u6C42" });
          return;
        }
        try {
          const body = await requestBody(req);
          const terminal = requireTerminal(body.sessionId);
          if (terminal.status !== "running" || terminal.child.stdin === null) throw new Error("\u7EC8\u7AEF\u5DF2\u9000\u51FA\uFF0C\u8BF7\u91CD\u65B0\u6253\u5F00");
          if (typeof body.command !== "string") throw new Error("\u7F3A\u5C11\u7EC8\u7AEF\u8F93\u5165");
          appendTerminalOutput(terminal, `
\u276F ${body.command}
`);
          terminal.child.stdin.write(`${body.command}
`);
          const offset = typeof body.offset === "number" && Number.isFinite(body.offset) ? body.offset : terminal.baseOffset;
          json(res, 200, terminalSnapshot(terminal, offset));
        } catch (reason) {
          json(res, 422, { error: reason instanceof Error ? reason.message : String(reason) });
        }
      }
    });
    const unregisterReadWorkLog = ctx.webServer.register({
      kind: "exact",
      path: "/api/personal-studio/read-work-log",
      handler: async (req, res) => {
        if (req.method !== "POST") {
          json(res, 405, { error: "\u53EA\u652F\u6301 POST \u8BF7\u6C42" });
          return;
        }
        try {
          const body = await requestBody(req);
          json(res, 200, await readWorkLog(requireLogDate(body.date)));
        } catch (reason) {
          json(res, 422, { error: reason instanceof Error ? reason.message : String(reason) });
        }
      }
    });
    const unregisterSaveWorkLog = ctx.webServer.register({
      kind: "exact",
      path: "/api/personal-studio/save-work-log",
      handler: async (req, res) => {
        if (req.method !== "POST") {
          json(res, 405, { error: "\u53EA\u652F\u6301 POST \u8BF7\u6C42" });
          return;
        }
        try {
          const body = await requestBody(req, 1048576);
          const date = requireLogDate(body.date);
          if (typeof body.content !== "string") throw new Error("\u5DE5\u4F5C\u65E5\u5FD7\u5185\u5BB9\u65E0\u6548");
          await saveWorkLog(date, body.content);
          json(res, 200, { date, saved: true });
        } catch (reason) {
          json(res, 422, { error: reason instanceof Error ? reason.message : String(reason) });
        }
      }
    });
    const unregisterListWorkLogs = ctx.webServer.register({
      kind: "exact",
      path: "/api/personal-studio/list-work-logs",
      handler: async (req, res) => {
        if (req.method !== "POST") {
          json(res, 405, { error: "\u53EA\u652F\u6301 POST \u8BF7\u6C42" });
          return;
        }
        try {
          const body = await requestBody(req);
          if (typeof body.month !== "string") throw new Error("\u7F3A\u5C11\u6708\u4EFD");
          json(res, 200, { dates: await listWorkLogs(body.month) });
        } catch (reason) {
          json(res, 422, { error: reason instanceof Error ? reason.message : String(reason) });
        }
      }
    });
    return async () => {
      unregisterLaunch();
      unregisterCreateDirectory();
      unregisterOpenTerminal();
      unregisterReadTerminal();
      unregisterSendTerminal();
      unregisterReadWorkLog();
      unregisterSaveWorkLog();
      unregisterListWorkLogs();
      for (const { child } of running.values()) stopProject(child);
      running.clear();
      for (const terminal of terminals.values()) stopProject(terminal.child);
      terminals.clear();
      terminalByRoot.clear();
    };
  }, "dsh-personal-studio: project preview launcher");
}
export {
  apply,
  inject,
  name
};
