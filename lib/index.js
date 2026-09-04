// src/index.ts
import { access, mkdir } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";
var name = "dsh-personal-studio";
var inject = ["webServer"];
function json(response, status, value) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  response.end(JSON.stringify(value));
}
async function bodyOf(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  } catch {
    return {};
  }
}
function apply(ctx) {
  ctx.webServer.register({
    kind: "exact",
    path: "/api/personal-studio/projects/create",
    handler: async (request, response) => {
      if (request.method !== "POST") {
        response.writeHead(405);
        response.end();
        return;
      }
      try {
        const body = await bodyOf(request);
        const parent = typeof body.parent === "string" ? resolve(body.parent) : "";
        const name2 = typeof body.name === "string" ? body.name.trim() : "";
        if (!parent || !name2 || name2 === "." || name2 === ".." || name2.includes("/") || name2.includes("\\")) {
          json(response, 400, { error: "invalid project folder" });
          return;
        }
        await access(parent);
        const path = resolve(parent, name2);
        if (dirname(path) !== parent || !path.startsWith(parent + sep)) {
          json(response, 400, { error: "project folder must be a direct child of the selected workspace" });
          return;
        }
        await mkdir(path);
        json(response, 200, { ok: true, path });
      } catch (error) {
        if (error?.code === "EEXIST") json(response, 409, { error: "\u540C\u540D\u9879\u76EE\u6587\u4EF6\u5939\u5DF2\u5B58\u5728" });
        else json(response, 500, { error: "\u521B\u5EFA\u9879\u76EE\u76EE\u5F55\u5931\u8D25" });
      }
    }
  });
}
export {
  apply,
  inject,
  name
};
