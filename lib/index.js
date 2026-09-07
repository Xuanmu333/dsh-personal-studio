// src/index.ts
import { spawn } from "node:child_process";
import { existsSync, promises as fs } from "node:fs";
import { createServer } from "node:net";
import { basename, join, resolve } from "node:path";
var name = "dsh-personal-studio";
var inject = ["webServer"];
var running = /* @__PURE__ */ new Map();
var WINDOWS_RESERVED_NAME = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/i;
function json(res, status, value) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(JSON.stringify(value));
}
async function requestBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    const part = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += part.length;
    if (size > 32768) throw new Error("\u8BF7\u6C42\u5185\u5BB9\u8FC7\u5927");
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
    return async () => {
      unregisterLaunch();
      unregisterCreateDirectory();
      for (const { child } of running.values()) stopProject(child);
      running.clear();
    };
  }, "dsh-personal-studio: project preview launcher");
}
export {
  apply,
  inject,
  name
};
