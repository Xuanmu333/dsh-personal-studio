window.__ModuleLoader__.load({ id: 'dsh-personal-studio', factory: (require) => { var module = { exports: {} }; var exports = module.exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_react_dom = require("react-dom");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
var import_jsx_runtime = require("react/jsx-runtime");
var STORAGE_KEY = "dsh.personal-studio.projects.v1";
var THEME_KEY = "dsh.personal-studio.theme.v1";
var BRAND_KEY = "dsh.personal-studio.brand.v1";
var DEFAULT_BRAND = { name: "DSH Personal Studio", tagline: "\u4E2A\u4EBA\u667A\u80FD\u5DE5\u4F5C\u7A7A\u95F4", logo: "" };
function loadProjects() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(value)) return [];
    return value.map((item) => ({
      id: String(item.id ?? projectId()),
      name: String(item.name ?? "\u672A\u547D\u540D\u9879\u76EE"),
      layout: ["single", "dual", "triple", "vertical"].includes(item.layout) ? item.layout : "single",
      kind: item.kind === "generated" ? "generated" : "attached",
      workspaceId: String(item.workspaceId ?? ""),
      path: String(item.path ?? ""),
      panes: Array.isArray(item.panes) ? item.panes : ["overview"],
      paneSources: Array.isArray(item.paneSources) ? item.paneSources.map(String) : [],
      sections: Array.isArray(item.sections) && item.sections.length > 0 ? item.sections.map((section) => ({
        id: String(section.id ?? projectId()),
        name: String(section.name ?? "\u9879\u76EE\u5206\u533A"),
        workspaceId: String(section.workspaceId ?? item.workspaceId ?? ""),
        path: String(section.path ?? item.path ?? "")
      })).filter((section) => section.workspaceId !== "" && section.path !== "") : [{ id: projectId(), name: "\u4E3B\u9879\u76EE", workspaceId: String(item.workspaceId ?? ""), path: String(item.path ?? "") }],
      launch: ["workspace", "web", "worktable"].includes(item.launch) ? item.launch : "workspace",
      data: {
        kind: ["project-files", "sqlite", "http"].includes(item.data?.kind) ? item.data.kind : "project-files",
        location: String(item.data?.location ?? ""),
        readOnly: item.data?.readOnly !== false
      },
      aiMode: item.aiMode === "build" ? "build" : "analyze",
      sessions: item.sessions && typeof item.sessions === "object" ? item.sessions : {}
    })).filter((item) => item.workspaceId !== "" && item.path !== "");
  } catch {
    return [];
  }
}
function loadBrand() {
  try {
    const value = JSON.parse(localStorage.getItem(BRAND_KEY) ?? "null");
    if (value === null || typeof value !== "object") return DEFAULT_BRAND;
    return {
      name: String(value.name ?? DEFAULT_BRAND.name),
      tagline: String(value.tagline ?? DEFAULT_BRAND.tagline),
      logo: typeof value.logo === "string" ? value.logo : ""
    };
  } catch {
    return DEFAULT_BRAND;
  }
}
function loadTheme() {
  if (document.body.hasAttribute("data-ds-dark-theme")) return "dark";
  return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
}
var snapshot = { projects: loadProjects(), activeId: null, theme: loadTheme(), brand: loadBrand() };
var listeners = /* @__PURE__ */ new Set();
function commit(next) {
  snapshot = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next.projects));
  localStorage.setItem(THEME_KEY, next.theme);
  localStorage.setItem(BRAND_KEY, JSON.stringify(next.brand));
  listeners.forEach((listener) => {
    listener();
  });
}
var studio = {
  subscribe(listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot() {
    return snapshot;
  },
  setActive(activeId) {
    commit({ ...snapshot, activeId });
  },
  setTheme(theme) {
    commit({ ...snapshot, theme });
  },
  setBrand(brand) {
    commit({ ...snapshot, brand });
  },
  add(project) {
    commit({ ...snapshot, projects: [...snapshot.projects, project], activeId: project.id });
  },
  update(project) {
    commit({ ...snapshot, projects: snapshot.projects.map((item) => item.id === project.id ? project : item) });
  },
  remove(id) {
    commit({
      ...snapshot,
      projects: snapshot.projects.filter((project) => project.id !== id),
      activeId: snapshot.activeId === id ? null : snapshot.activeId
    });
  }
};
var nativeTheme = null;
function setTheme(theme) {
  if (nativeTheme !== null) nativeTheme.setTheme(theme);
  else studio.setTheme(theme);
}
function useStudio() {
  return (0, import_react.useSyncExternalStore)(studio.subscribe, studio.getSnapshot, studio.getSnapshot);
}
function projectId() {
  return globalThis.crypto?.randomUUID?.() ?? `project-${Date.now()}`;
}
function paneCount(layout) {
  if (layout === "single") return 1;
  if (layout === "triple") return 3;
  return 2;
}
function panesFor(layout, panes) {
  const count = paneCount(layout);
  const defaults = ["overview", "files", "data"];
  return Array.from({ length: count }, (_, index) => panes[index] ?? defaults[index] ?? "report");
}
var dshBridge = null;
function listWorkspaces() {
  try {
    const items = dshBridge?.workspaces?.list?.getSnapshot?.()?.items ?? [];
    return items.map((item) => ({
      id: String(item.workspaceId ?? item.id ?? ""),
      title: String(item.title ?? item.path ?? "\u672A\u547D\u540D\u5DE5\u4F5C\u533A"),
      path: String(item.path ?? "")
    })).filter((item) => item.id && item.path);
  } catch {
    return [];
  }
}
async function promptIntoSession(sessionId, text) {
  const bridge = dshBridge;
  if (bridge === null) throw new Error("AI \u4F1A\u8BDD\u670D\u52A1\u4E0D\u53EF\u7528");
  let session = null;
  for (let attempt = 0; attempt < 10; attempt += 1) {
    session = bridge.sessions?.binding?.(sessionId)?.session ?? null;
    if (session !== null) break;
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
  }
  if (session !== null && typeof bridge.conversation?.sendSession === "function") {
    await bridge.conversation.sendSession(session, text, [], "queue");
    return;
  }
  if (session !== null && typeof session.prompt === "function") {
    const result = await session.prompt([{ type: "text", text }], "queue");
    if (result?.ok !== false) return;
  }
  throw new Error("\u65E0\u6CD5\u8FDE\u63A5\u9879\u76EE AI \u4F1A\u8BDD");
}
function modePrompt(project, mode) {
  const sections = project.sections.map((section) => `- ${section.name}: ${section.path}`).join("\n");
  const data = project.data.kind === "project-files" ? "\u9879\u76EE\u6587\u4EF6\u4E0E\u4EA7\u7269\u76EE\u5F55" : `${project.data.kind.toUpperCase()}\uFF1A${project.data.location || "\u5C1A\u672A\u914D\u7F6E\u5730\u5740"}`;
  const boundary = `\u9879\u76EE\u540D\u79F0\uFF1A${project.name}
\u9879\u76EE\u6839\u76EE\u5F55\uFF1A${project.path}
\u542F\u52A8\u7C7B\u578B\uFF1A${project.launch}
\u9879\u76EE\u5206\u533A\uFF1A
${sections}
\u6570\u636E\u63A5\u53E3\uFF1A${data}
\u6570\u636E\u6743\u9650\uFF1A${project.data.readOnly ? "\u53EA\u8BFB" : "\u5141\u8BB8\u5199\u5165"}`;
  if (mode === "analyze") {
    return `\u3010\u9879\u76EE\u5206\u6790\u6A21\u5F0F\u3011
${boundary}
\u8BF7\u628A\u5F53\u524D\u5DE5\u4F5C\u533A\u89C6\u4E3A\u552F\u4E00\u9879\u76EE\u6570\u636E\u8FB9\u754C\u3002\u9ED8\u8BA4\u53EA\u8BFB\u53D6\u9879\u76EE\u6587\u4EF6\u3001\u6570\u636E\u4EA7\u7269\u548C\u7248\u672C\u72B6\u6001\uFF0C\u5148\u4E0D\u8981\u4FEE\u6539\u6587\u4EF6\u3002\u4F60\u53EF\u4EE5\u4E3A\u6211\u603B\u7ED3\u3001\u5206\u6790\u3001\u6838\u5BF9\u548C\u5F62\u6210\u62A5\u544A\u3002\u8BF7\u7B80\u77ED\u786E\u8BA4\u5DF2\u8FDB\u5165\u5206\u6790\u6A21\u5F0F\u3002`;
  }
  return `\u3010\u9879\u76EE\u6784\u5EFA\u6A21\u5F0F\u3011
${boundary}
\u8BF7\u628A\u5F53\u524D\u5DE5\u4F5C\u533A\u89C6\u4E3A\u552F\u4E00\u9879\u76EE\u6570\u636E\u8FB9\u754C\u3002\u4F60\u53EF\u4EE5\u6309\u6211\u7684\u540E\u7EED\u8981\u6C42\u751F\u6210\u65B0\u9879\u76EE\uFF0C\u6216\u4FEE\u6539\u5DF2\u63A5\u5165\u9879\u76EE\uFF1B\u52A8\u624B\u524D\u5148\u68C0\u67E5\u73B0\u6709\u7ED3\u6784\uFF0C\u6240\u6709\u5199\u5165\u4EC5\u9650\u6B64\u76EE\u5F55\u3002\u8BF7\u7B80\u77ED\u786E\u8BA4\u5DF2\u8FDB\u5165\u6784\u5EFA\u6A21\u5F0F\u3002`;
}
async function openProjectMode(project, mode) {
  if (dshBridge === null || typeof dshBridge.sessions?.create !== "function") return project;
  let sessionId = project.sessions[mode];
  if (!sessionId) {
    sessionId = await dshBridge.sessions.create({ workspaceId: project.workspaceId });
    const next2 = { ...project, aiMode: mode, sessions: { ...project.sessions, [mode]: sessionId } };
    studio.update(next2);
    await dshBridge.sessions.open?.(sessionId);
    await promptIntoSession(sessionId, modePrompt(next2, mode));
    return next2;
  }
  const next = { ...project, aiMode: mode };
  studio.update(next);
  await dshBridge.sessions.open?.(sessionId);
  return next;
}
var styles = String.raw`
:root {
  --studio-ink: #edf5ff;
  --studio-muted: #7f93aa;
  --studio-dim: #41556a;
  --studio-blue: #4ba8ff;
  --studio-blue-soft: rgba(75,168,255,.16);
  --studio-orange: #ff9d5c;
  --studio-field: #03080d;
  --studio-panel: rgba(7,16,26,.94);
}

html[data-dsh-studio-active] body {
  background: var(--studio-field) !important;
}

[data-dsh-studio-sidebar-root] {
  position: relative;
  background: #050b12 !important;
  border-right-color: rgba(91,147,190,.12) !important;
}

[data-dsh-studio-native-region] {
  min-height: 42px !important;
  transition: flex-basis 260ms cubic-bezier(.2,.8,.2,1), opacity 180ms ease;
}

html[data-dsh-studio-active] [data-dsh-studio-native-region] {
  flex: 0 0 42px !important;
  overflow: hidden !important;
  opacity: .74;
  cursor: pointer;
}

.dsh-studio-sidebar {
  color: var(--studio-ink);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", sans-serif;
  padding: 2px 0 6px;
  user-select: none;
}

html[data-dsh-studio-active] [data-dsh-studio-foot-area] {
  flex: 1 1 auto !important;
  min-height: 0 !important;
}

html[data-dsh-studio-active] [data-dsh-studio-footer-actions] {
  flex: 1 1 auto !important;
  min-height: 0 !important;
  align-items: flex-start;
}

.dsh-studio-section-head {
  height: 38px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  border-radius: 9px;
  color: #b7c8d9;
  cursor: default;
}

.dsh-studio-section-head:hover { background: rgba(112,163,204,.07); }
.dsh-studio-section-head strong { flex: 1; font-size: 13px; font-weight: 560; letter-spacing: .01em; }
.dsh-studio-section-head .hint { color: #52687d; font-size: 10px; }
.dsh-studio-theme-button {
  width: 28px;
  height: 28px;
  flex: 0 0 28px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #758b9f;
  cursor: pointer;
}
.dsh-studio-theme-button:hover { background: rgba(91,151,197,.12); color: #d8edff; }

.dsh-studio-projects {
  display: grid;
  gap: 4px;
  padding: 4px 4px 2px;
  max-height: min(40vh, 360px);
  overflow: auto;
}

.dsh-studio-empty {
  margin: 5px 5px 2px;
  padding: 18px 12px;
  border: 1px dashed rgba(93,137,173,.18);
  border-radius: 12px;
  color: #53687d;
  font-size: 11px;
  line-height: 1.6;
  text-align: center;
}

.dsh-studio-project-row {
  position: relative;
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #9eb1c4;
  text-align: left;
  cursor: pointer;
}

.dsh-studio-project-row:hover { background: rgba(89,146,190,.08); color: #dfefff; }
.dsh-studio-project-row.active {
  background: rgba(56,128,187,.13);
  color: #edf7ff;
  box-shadow: inset 2px 0 0 #4ba8ff;
}
.dsh-studio-project-row span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsh-studio-project-row small { margin-left: auto; color: #526a80; font-size: 9px; text-transform: uppercase; }

.dsh-studio-rail-button {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #93a9bc;
}
.dsh-studio-rail-button:hover { background: rgba(112,163,204,.1); }

.dsh-studio-menu {
  position: fixed;
  z-index: 180;
  min-width: 168px;
  padding: 6px;
  border: 1px solid rgba(105,162,206,.18);
  border-radius: 12px;
  background: rgba(7,16,26,.98);
  box-shadow: 0 18px 50px rgba(0,0,0,.42);
  color: #d8e8f7;
}
.dsh-studio-menu button {
  width: 100%;
  height: 34px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}
.dsh-studio-menu button:hover { background: rgba(76,154,214,.12); }
.dsh-studio-menu button.danger { color: #ff8f91; }

.dsh-studio-dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  background: rgba(0,3,7,.56);
  backdrop-filter: blur(8px);
}
.dsh-studio-dialog {
  width: min(430px, calc(100vw - 40px));
  padding: 22px;
  border: 1px solid rgba(100,165,214,.2);
  border-radius: 18px;
  background: #07111b;
  box-shadow: 0 30px 90px rgba(0,0,0,.58);
  color: var(--studio-ink);
}
.dsh-studio-dialog-head { display: flex; align-items: center; margin-bottom: 20px; }
.dsh-studio-dialog-head h2 { flex: 1; margin: 0; font-size: 17px; font-weight: 600; }
.dsh-studio-icon-button { width: 30px; height: 30px; display: grid; place-items: center; border: 0; border-radius: 50%; background: transparent; color: #8196a9; cursor: pointer; }
.dsh-studio-icon-button:hover { background: rgba(95,158,207,.1); color: #d9edff; }
.dsh-studio-field { display: grid; gap: 7px; margin: 14px 0; }
.dsh-studio-field label { color: #8297aa; font-size: 11px; }
.dsh-studio-field input, .dsh-studio-field select {
  height: 40px;
  box-sizing: border-box;
  padding: 0 12px;
  border: 1px solid rgba(101,153,193,.18);
  border-radius: 10px;
  outline: 0;
  background: #050c14;
  color: #e6f3ff;
  font: inherit;
}
.dsh-studio-field input:focus, .dsh-studio-field select:focus { border-color: #4ba8ff; box-shadow: 0 0 0 3px rgba(75,168,255,.1); }
.dsh-studio-folder-button { height: 36px; display: flex; align-items: center; justify-content: center; gap: 7px; border: 1px solid rgba(101,153,193,.14); border-radius: 9px; background: rgba(77,137,183,.08); color: #94acc0; font: inherit; font-size: 11px; cursor: pointer; }
.dsh-studio-folder-button:hover { border-color: rgba(75,168,255,.3); background: rgba(75,168,255,.11); color: #c8e2f6; }
.dsh-studio-folder-button:disabled { opacity: .45; cursor: default; }
.dsh-studio-dialog-actions { display: flex; justify-content: flex-end; gap: 9px; margin-top: 20px; }
.dsh-studio-button { height: 36px; padding: 0 15px; border: 0; border-radius: 10px; background: rgba(91,145,185,.12); color: #bbcede; cursor: pointer; }
.dsh-studio-button.primary { background: var(--studio-orange); color: #1d0e04; font-weight: 650; }
.dsh-studio-button:disabled { opacity: .35; cursor: default; }
.dsh-studio-project-binding { display: grid; gap: 6px; margin: 14px 0; padding: 11px 12px; border-radius: 10px; background: rgba(76,143,194,.08); }
.dsh-studio-project-binding span { color: #71879a; font-size: 10px; }
.dsh-studio-project-binding strong { overflow: hidden; color: #c5d9e9; font-size: 11px; font-weight: 520; text-overflow: ellipsis; white-space: nowrap; }
.dsh-studio-dialog-error { margin-top: 10px; color: #ff999b; font-size: 11px; line-height: 1.5; }

.dsh-studio-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 36;
  overflow: hidden;
  background: var(--studio-field);
  color: var(--studio-ink);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "PingFang SC", sans-serif;
}
.dsh-studio-grid { position: absolute; inset: 0; width: 100%; height: 100%; opacity: .42; pointer-events: none; }
.dsh-studio-topbar {
  position: relative;
  z-index: 2;
  height: 58px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 22px;
  border-bottom: 1px solid rgba(89,146,190,.1);
  background: rgba(3,8,13,.82);
  backdrop-filter: blur(18px);
}
.dsh-studio-topbar .project-mark { width: 28px; height: 28px; display: grid; place-items: center; border-radius: 9px; background: rgba(75,168,255,.12); color: #65b6ff; }
.dsh-studio-topbar h1 { margin: 0; font-size: 14px; font-weight: 590; letter-spacing: .01em; }
.dsh-studio-topbar .path { color: #536b81; font-size: 10px; }
.dsh-studio-topbar-actions { margin-left: auto; display: flex; align-items: center; gap: 9px; }
.dsh-studio-layouts { display: flex; gap: 4px; }
.dsh-studio-layout-button { height: 28px; padding: 0 10px; border: 0; border-radius: 8px; background: transparent; color: #647a8e; font-size: 10px; cursor: pointer; }
.dsh-studio-layout-button:hover { background: rgba(74,143,196,.09); color: #aac2d7; }
.dsh-studio-layout-button.active { background: rgba(75,168,255,.14); color: #76bdff; }
.dsh-studio-ai-toggle { width: 32px; height: 32px; display: grid; place-items: center; border: 0; border-radius: 8px; background: transparent; color: #71879b; cursor: pointer; }
.dsh-studio-ai-toggle svg { transform: scaleX(-1); }
.dsh-studio-ai-toggle:hover, .dsh-studio-ai-toggle.active { background: rgba(75,168,255,.12); color: #7dc3ff; }

.dsh-studio-stage {
  position: absolute;
  inset: 58px 0 0;
  z-index: 1;
  padding: 18px;
  transition: padding-right 220ms cubic-bezier(.2,.8,.2,1);
}
.dsh-studio-stage.ai-open { padding-right: 404px; }
.dsh-studio-surface { width: 100%; height: 100%; display: flex; overflow: hidden; border-radius: 18px; background: rgba(7,16,26,.7); box-shadow: 0 26px 70px rgba(0,0,0,.2); }
.dsh-studio-surface.vertical { flex-direction: column; }
.dsh-studio-pane { position: relative; width: 100%; height: 100%; min-width: 0; min-height: 0; flex: 1 1 0; overflow: hidden; background: rgba(8,18,28,.78); }
.dsh-studio-pane:nth-of-type(even) { background: rgba(6,15,24,.82); }
.dsh-studio-pane-bar { position: absolute; top: 0; left: 0; right: 0; z-index: 2; height: 34px; display: flex; align-items: center; gap: 8px; padding: 0 11px; background: rgba(4,10,16,.72); color: #5f7589; backdrop-filter: blur(12px); opacity: .38; transition: opacity 150ms ease; }
.dsh-studio-pane:hover .dsh-studio-pane-bar { opacity: 1; }
.dsh-studio-pane-bar span { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 10px; }
.dsh-studio-pane-bar button { height: 22px; padding: 0 8px; border: 0; border-radius: 7px; background: rgba(88,149,196,.1); color: #9db5c9; font-size: 9px; cursor: pointer; }
.dsh-studio-pane-bar select { height: 24px; border: 0; outline: 0; border-radius: 7px; background: rgba(88,149,196,.1); color: #9db5c9; font-size: 9px; }
.dsh-studio-empty-pane { height: 100%; display: grid; place-items: center; padding: 36px; box-sizing: border-box; }
.dsh-studio-empty-pane-content { width: min(340px, 80%); display: grid; justify-items: center; gap: 13px; color: #60768b; text-align: center; }
.dsh-studio-empty-pane-content .glyph { width: 44px; height: 44px; display: grid; place-items: center; border-radius: 14px; background: rgba(74,156,218,.1); color: #5baff2; }
.dsh-studio-empty-pane-content strong { color: #a7bbcd; font-size: 13px; font-weight: 540; }
.dsh-studio-project-pane { height: 100%; display: grid; align-content: center; justify-items: start; gap: 10px; box-sizing: border-box; padding: clamp(34px, 6vw, 82px); }
.dsh-studio-project-pane .glyph { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 13px; background: rgba(75,168,255,.11); color: #5eb4fb; }
.dsh-studio-project-pane .eyebrow { margin-top: 7px; color: #577086; font-size: 9px; letter-spacing: .14em; text-transform: uppercase; }
.dsh-studio-project-pane strong { color: #bfd2e2; font-size: 17px; font-weight: 570; }
.dsh-studio-project-pane p { max-width: 360px; margin: 0; color: #6f8498; font-size: 11px; line-height: 1.65; }
.dsh-studio-project-pane code { max-width: 100%; overflow: hidden; padding: 6px 9px; border-radius: 7px; background: rgba(91,151,197,.065); color: #7890a5; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 9px; text-overflow: ellipsis; white-space: nowrap; }
.dsh-studio-pane-actions { display: flex; gap: 8px; margin-top: 8px; }
.dsh-studio-pane-actions button { height: 32px; padding: 0 12px; border: 0; border-radius: 9px; background: var(--studio-orange); color: #201006; font-size: 10px; font-weight: 620; cursor: pointer; }
.dsh-studio-pane-actions button.secondary { background: rgba(75,168,255,.11); color: #7dc3ff; }
.dsh-studio-divider { position: relative; z-index: 3; flex: 0 0 9px; margin: 0 -4px; cursor: col-resize; }
.vertical > .dsh-studio-divider { cursor: row-resize; }
.dsh-studio-divider::after { content: ""; position: absolute; background: rgba(78,169,237,.05); transition: background 150ms ease; }
.dsh-studio-divider:not(.row)::after { top: 0; bottom: 0; left: 4px; width: 1px; }
.dsh-studio-divider.row::after { left: 0; right: 0; top: 4px; height: 1px; }
.dsh-studio-divider:hover::after { background: rgba(78,169,237,.5); }

html[data-dsh-studio-active] [data-dsh-studio-conversation] {
  position: fixed !important;
  z-index: 84 !important;
  top: 110px !important;
  right: 0 !important;
  bottom: 0 !important;
  left: auto !important;
  width: 386px !important;
  height: auto !important;
  min-width: 320px !important;
  overflow: hidden !important;
  border: 0 !important;
  border-left: 1px solid rgba(96,166,220,.14) !important;
  border-radius: 0 !important;
  background: #07101a !important;
  box-shadow: none !important;
  transition: opacity 150ms ease, transform 200ms cubic-bezier(.2,.8,.2,1) !important;
}
html[data-dsh-studio-active] [data-dsh-studio-conversation][data-studio-open="false"] { opacity: 0 !important; transform: translateX(100%) !important; pointer-events: none !important; }
.dsh-studio-ai-sidebar {
  position: fixed;
  z-index: 90;
  top: 58px;
  right: 0;
  bottom: 0;
  width: 386px;
  border-left: 1px solid rgba(96,166,220,.14);
  background: #07101a;
  color: #98aec2;
}
.dsh-studio-ai-sidebar-head {
  height: 52px;
  display: flex;
  align-items: center;
  gap: 9px;
  box-sizing: border-box;
  padding: 0 10px 0 15px;
  border-bottom: 1px solid rgba(96,166,220,.1);
}
.dsh-studio-ai-sidebar-head .status { width: 6px; height: 6px; border-radius: 50%; background: #57b1ff; box-shadow: 0 0 9px rgba(87,177,255,.55); }
.dsh-studio-ai-sidebar-head .title { min-width: 0; display: grid; gap: 1px; margin-right: auto; }
.dsh-studio-ai-sidebar-head .title strong { color: #c7d9e9; font-size: 11px; font-weight: 570; }
.dsh-studio-ai-sidebar-head .title span { max-width: 125px; overflow: hidden; color: #62798d; font-size: 9px; text-overflow: ellipsis; white-space: nowrap; }
.dsh-studio-ai-sidebar-head button { border: 0; background: transparent; color: #70869a; cursor: pointer; }
.dsh-studio-ai-sidebar-head button:hover { background: rgba(83,151,203,.1); color: #cae1f4; }
.dsh-studio-ai-sidebar-head .close { width: 28px; height: 28px; display: grid; place-items: center; border-radius: 7px; }
.dsh-studio-ai-modes { display: flex; gap: 2px; padding: 2px; border-radius: 8px; background: rgba(64,113,151,.1); }
.dsh-studio-ai-modes button { height: 24px; padding: 0 9px; border-radius: 6px; color: #6e8498; font-size: 9px; }
.dsh-studio-ai-modes button.active { background: rgba(75,168,255,.16); color: #79c2ff; }

html[data-dsh-studio-theme="light"] {
  color-scheme: light;
  --studio-ink: #182431;
  --studio-muted: #627384;
  --studio-dim: #93a0ad;
  --studio-blue: #1776bc;
  --studio-blue-soft: rgba(23,118,188,.1);
  --studio-orange: #e97832;
  --studio-field: #f3f5f7;
  --studio-panel: rgba(255,255,255,.94);
}

html[data-dsh-studio-theme="light"] body {
  background: #f3f5f7 !important;
}

html[data-dsh-studio-theme="light"] [data-dsh-studio-sidebar-root] {
  background: #f7f8f9 !important;
  border-right-color: rgba(50,78,101,.1) !important;
}

html[data-dsh-studio-theme="light"] .dsh-studio-sidebar { color: #253545; }
html[data-dsh-studio-theme="light"] .dsh-studio-section-head { color: #3f5365; }
html[data-dsh-studio-theme="light"] .dsh-studio-section-head:hover { background: rgba(34,105,157,.055); }
html[data-dsh-studio-theme="light"] .dsh-studio-section-head .hint { color: #94a0ab; }
html[data-dsh-studio-theme="light"] .dsh-studio-theme-button { color: #677b8d; }
html[data-dsh-studio-theme="light"] .dsh-studio-theme-button:hover { background: rgba(34,105,157,.08); color: #1e669b; }
html[data-dsh-studio-theme="light"] .dsh-studio-empty {
  border-color: rgba(45,91,126,.15);
  background: rgba(255,255,255,.42);
  color: #8996a2;
}
html[data-dsh-studio-theme="light"] .dsh-studio-project-row { color: #617386; }
html[data-dsh-studio-theme="light"] .dsh-studio-project-row:hover { background: rgba(29,103,157,.06); color: #243b4e; }
html[data-dsh-studio-theme="light"] .dsh-studio-project-row.active {
  background: rgba(23,118,188,.085);
  color: #153a55;
  box-shadow: inset 2px 0 0 #2889cc;
}
html[data-dsh-studio-theme="light"] .dsh-studio-project-row small { color: #9aa6b0; }
html[data-dsh-studio-theme="light"] .dsh-studio-rail-button { color: #66798b; }
html[data-dsh-studio-theme="light"] .dsh-studio-rail-button:hover { background: rgba(34,105,157,.07); }

html[data-dsh-studio-theme="light"] .dsh-studio-menu {
  border-color: rgba(52,91,121,.14);
  background: rgba(255,255,255,.985);
  box-shadow: 0 18px 50px rgba(33,51,66,.16);
  color: #314657;
}
html[data-dsh-studio-theme="light"] .dsh-studio-menu button:hover { background: rgba(35,111,166,.075); }
html[data-dsh-studio-theme="light"] .dsh-studio-menu button.danger { color: #c95355; }
html[data-dsh-studio-theme="light"] .dsh-studio-dialog-backdrop { background: rgba(66,79,91,.22); }
html[data-dsh-studio-theme="light"] .dsh-studio-dialog {
  border-color: rgba(52,91,121,.14);
  background: #ffffff;
  box-shadow: 0 30px 90px rgba(39,55,68,.2);
  color: #1b2b39;
}
html[data-dsh-studio-theme="light"] .dsh-studio-icon-button { color: #778896; }
html[data-dsh-studio-theme="light"] .dsh-studio-icon-button:hover { background: rgba(35,111,166,.075); color: #285d84; }
html[data-dsh-studio-theme="light"] .dsh-studio-field label { color: #657685; }
html[data-dsh-studio-theme="light"] .dsh-studio-field input,
html[data-dsh-studio-theme="light"] .dsh-studio-field select {
  border-color: rgba(51,87,114,.16);
  background: #f7f8f9;
  color: #243746;
}
html[data-dsh-studio-theme="light"] .dsh-studio-folder-button { border-color: rgba(51,87,114,.13); background: #f7f8f9; color: #607688; }
html[data-dsh-studio-theme="light"] .dsh-studio-folder-button:hover { border-color: rgba(23,118,188,.28); background: rgba(23,118,188,.06); color: #245f89; }
html[data-dsh-studio-theme="light"] .dsh-studio-button { background: #edf1f4; color: #536574; }
html[data-dsh-studio-theme="light"] .dsh-studio-button.primary { background: #e97832; color: #fffaf6; }
html[data-dsh-studio-theme="light"] .dsh-studio-project-binding { background: rgba(35,111,166,.055); }
html[data-dsh-studio-theme="light"] .dsh-studio-project-binding strong { color: #3b5365; }
html[data-dsh-studio-theme="light"] .dsh-studio-dialog-error { color: #c95355; }

html[data-dsh-studio-theme="light"] .dsh-studio-overlay { background: #f3f5f7; color: #182431; }
html[data-dsh-studio-theme="light"] .dsh-studio-grid { opacity: .28; }
html[data-dsh-studio-theme="light"] .dsh-studio-topbar {
  border-bottom-color: rgba(43,83,113,.1);
  background: rgba(248,250,251,.9);
}
html[data-dsh-studio-theme="light"] .dsh-studio-topbar .project-mark { background: rgba(23,118,188,.09); color: #267fbe; }
html[data-dsh-studio-theme="light"] .dsh-studio-topbar .path { color: #8b98a3; }
html[data-dsh-studio-theme="light"] .dsh-studio-layout-button { color: #738391; }
html[data-dsh-studio-theme="light"] .dsh-studio-layout-button:hover { background: rgba(35,111,166,.065); color: #365c77; }
html[data-dsh-studio-theme="light"] .dsh-studio-layout-button.active { background: rgba(23,118,188,.1); color: #176ea9; }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-toggle { color: #6d7f8e; }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-toggle:hover,
html[data-dsh-studio-theme="light"] .dsh-studio-ai-toggle.active { background: rgba(23,118,188,.09); color: #176ea9; }
html[data-dsh-studio-theme="light"] .dsh-studio-surface {
  background: rgba(255,255,255,.7);
  box-shadow: 0 24px 64px rgba(47,65,79,.11);
}
html[data-dsh-studio-theme="light"] .dsh-studio-pane { background: rgba(255,255,255,.86); }
html[data-dsh-studio-theme="light"] .dsh-studio-pane:nth-of-type(even) { background: rgba(248,250,251,.9); }
html[data-dsh-studio-theme="light"] .dsh-studio-pane-bar { background: rgba(250,251,252,.88); color: #82909c; }
html[data-dsh-studio-theme="light"] .dsh-studio-pane-bar button { background: rgba(35,111,166,.07); color: #526c7e; }
html[data-dsh-studio-theme="light"] .dsh-studio-pane-bar select { background: rgba(35,111,166,.07); color: #526c7e; }
html[data-dsh-studio-theme="light"] .dsh-studio-empty-pane-content { color: #8997a2; }
html[data-dsh-studio-theme="light"] .dsh-studio-empty-pane-content .glyph { background: rgba(23,118,188,.085); color: #2580bf; }
html[data-dsh-studio-theme="light"] .dsh-studio-empty-pane-content strong { color: #516574; }
html[data-dsh-studio-theme="light"] .dsh-studio-project-pane .glyph { background: rgba(23,118,188,.085); color: #2580bf; }
html[data-dsh-studio-theme="light"] .dsh-studio-project-pane .eyebrow { color: #91a0ac; }
html[data-dsh-studio-theme="light"] .dsh-studio-project-pane strong { color: #425969; }
html[data-dsh-studio-theme="light"] .dsh-studio-project-pane p { color: #7c8b96; }
html[data-dsh-studio-theme="light"] .dsh-studio-project-pane code { background: rgba(35,111,166,.055); color: #708392; }
html[data-dsh-studio-theme="light"] .dsh-studio-pane-actions button.secondary { background: rgba(23,118,188,.085); color: #176ea9; }

html[data-dsh-studio-theme="light"][data-dsh-studio-active] [data-dsh-studio-conversation] {
  border-left-color: rgba(43,99,140,.13) !important;
  background: #ffffff !important;
  box-shadow: none !important;
}
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar {
  border-left-color: rgba(43,99,140,.13);
  background: #ffffff;
  color: #667989;
}
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar-head { border-bottom-color: rgba(43,99,140,.1); }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar-head .title strong { color: #304759; }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar-head .status { background: #2786c8; box-shadow: 0 0 9px rgba(39,134,200,.3); }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar-head button { color: #758694; }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar-head button:hover { background: rgba(35,111,166,.075); color: #285d84; }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-modes { background: rgba(35,111,166,.055); }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-modes button.active { background: rgba(23,118,188,.1); color: #176ea9; }

/* Apple-inspired desktop material system: quiet hierarchy, direct feedback, reversible panels. */
:root {
  --studio-ink: rgba(255,255,255,.94);
  --studio-muted: rgba(235,235,245,.6);
  --studio-dim: rgba(235,235,245,.3);
  --studio-blue: #0a84ff;
  --studio-blue-soft: rgba(10,132,255,.16);
  --studio-orange: #ff9f0a;
  --studio-field: #0b0b0d;
  --studio-panel: rgba(28,28,30,.82);
  --studio-separator: rgba(255,255,255,.08);
  --studio-fill: rgba(255,255,255,.075);
  --studio-fill-hover: rgba(255,255,255,.11);
}

[data-dsh-studio-sidebar-root] {
  background: rgba(22,22,24,.92) !important;
  border-right-color: var(--studio-separator) !important;
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  backdrop-filter: blur(28px) saturate(160%);
}
.dsh-studio-sidebar { color: var(--studio-ink); }
.dsh-studio-section-head { height: 40px; padding: 0 10px; border-radius: 10px; color: var(--studio-muted); }
.dsh-studio-section-head:hover { background: var(--studio-fill); }
.dsh-studio-section-head strong { color: var(--studio-ink); font-size: 12px; font-weight: 590; letter-spacing: 0; }
.dsh-studio-section-head .hint { color: var(--studio-dim); font-size: 9px; }
.dsh-studio-theme-button, .dsh-studio-ai-toggle, .dsh-studio-icon-button, .dsh-studio-rail-button { color: var(--studio-muted); }
.dsh-studio-theme-button:hover, .dsh-studio-ai-toggle:hover, .dsh-studio-ai-toggle.active, .dsh-studio-icon-button:hover, .dsh-studio-rail-button:hover { background: var(--studio-fill-hover); color: var(--studio-ink); }
.dsh-studio-projects { gap: 3px; padding: 4px 6px 2px; }
.dsh-studio-project-row { height: 34px; padding: 0 9px; border-radius: 8px; color: var(--studio-muted); }
.dsh-studio-project-row:hover { background: var(--studio-fill); color: var(--studio-ink); }
.dsh-studio-project-row.active { background: rgba(10,132,255,.18); color: #fff; box-shadow: none; }
.dsh-studio-project-row small { color: var(--studio-dim); font-size: 8px; font-weight: 560; letter-spacing: .04em; }
.dsh-studio-empty { border: 0; border-radius: 10px; background: rgba(255,255,255,.035); color: var(--studio-dim); }

.dsh-studio-menu {
  padding: 5px;
  border-color: rgba(255,255,255,.1);
  border-radius: 12px;
  background: rgba(38,38,40,.9);
  box-shadow: 0 18px 50px rgba(0,0,0,.38), 0 1px 0 rgba(255,255,255,.08) inset;
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  backdrop-filter: blur(30px) saturate(180%);
}
.dsh-studio-menu button { height: 32px; border-radius: 7px; font-size: 12px; }
.dsh-studio-menu button:hover { background: rgba(255,255,255,.09); }

.dsh-studio-dialog-backdrop { background: rgba(0,0,0,.38); -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); }
.dsh-studio-dialog {
  width: min(440px, calc(100vw - 40px));
  max-height: calc(100vh - 40px);
  overflow: auto;
  padding: 24px;
  border-color: rgba(255,255,255,.1);
  border-radius: 20px;
  background: rgba(30,30,32,.9);
  box-shadow: 0 28px 80px rgba(0,0,0,.48), 0 1px 0 rgba(255,255,255,.09) inset;
  -webkit-backdrop-filter: blur(34px) saturate(170%);
  backdrop-filter: blur(34px) saturate(170%);
}
.dsh-studio-dialog-head h2 { font-size: 18px; font-weight: 650; letter-spacing: -.012em; }
.dsh-studio-field { gap: 8px; margin: 15px 0; }
.dsh-studio-field label { color: var(--studio-muted); font-size: 11px; font-weight: 510; }
.dsh-studio-field input, .dsh-studio-field select {
  height: 42px;
  border-color: rgba(255,255,255,.1);
  border-radius: 10px;
  background: rgba(255,255,255,.065);
  color: var(--studio-ink);
}
.dsh-studio-field input:focus, .dsh-studio-field select:focus { border-color: var(--studio-blue); box-shadow: 0 0 0 3px rgba(10,132,255,.2); }
.dsh-studio-field input[type="file"] { height: auto; min-height: 42px; padding: 5px; color: var(--studio-muted); font-size: 11px; }
.dsh-studio-field input[type="file"]::file-selector-button { height: 30px; margin-right: 9px; border: 0; border-radius: 7px; padding: 0 11px; background: var(--studio-fill); color: var(--studio-ink); font: inherit; cursor: pointer; }
.dsh-studio-folder-button, .dsh-studio-button { border-radius: 10px; background: var(--studio-fill); color: var(--studio-ink); }
.dsh-studio-folder-button { height: 38px; border-color: rgba(255,255,255,.08); }
.dsh-studio-folder-button:hover, .dsh-studio-button:hover { background: var(--studio-fill-hover); }
.dsh-studio-button.primary { background: var(--studio-blue); color: #fff; font-weight: 620; }
.dsh-studio-project-binding { border-radius: 11px; background: var(--studio-fill); }
.dsh-studio-project-binding strong { color: var(--studio-ink); }

.dsh-studio-overlay { background: var(--studio-field); }
.dsh-studio-topbar {
  border-bottom-color: var(--studio-separator);
  background: rgba(22,22,24,.78);
  -webkit-backdrop-filter: blur(28px) saturate(170%);
  backdrop-filter: blur(28px) saturate(170%);
}
.dsh-studio-topbar .project-mark { border-radius: 8px; background: rgba(10,132,255,.16); color: #409cff; }
.dsh-studio-topbar h1 { color: var(--studio-ink); font-size: 13px; font-weight: 620; letter-spacing: -.006em; }
.dsh-studio-topbar .path { color: var(--studio-dim); font-size: 9px; }
.dsh-studio-layouts { gap: 2px; padding: 3px; border-radius: 9px; background: rgba(255,255,255,.055); }
.dsh-studio-layout-button { height: 25px; border-radius: 7px; color: var(--studio-muted); }
.dsh-studio-layout-button:hover { background: rgba(255,255,255,.07); color: var(--studio-ink); }
.dsh-studio-layout-button.active { background: rgba(255,255,255,.13); color: var(--studio-ink); box-shadow: 0 1px 3px rgba(0,0,0,.22); }

.dsh-studio-stage { padding: 14px; transition: padding-right 320ms cubic-bezier(.22,1,.36,1); }
.dsh-studio-stage.ai-open { padding-right: 400px; }
.dsh-studio-surface {
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 16px;
  background: rgba(28,28,30,.76);
  box-shadow: 0 18px 50px rgba(0,0,0,.24), 0 1px 0 rgba(255,255,255,.055) inset;
  -webkit-backdrop-filter: blur(22px) saturate(145%);
  backdrop-filter: blur(22px) saturate(145%);
}
.dsh-studio-pane, .dsh-studio-pane:nth-of-type(even) { background: rgba(28,28,30,.58); }
.dsh-studio-pane-bar { background: rgba(28,28,30,.68); color: var(--studio-dim); -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px); }
.dsh-studio-pane-bar button, .dsh-studio-pane-bar select { background: var(--studio-fill); color: var(--studio-muted); }
.dsh-studio-project-pane .glyph, .dsh-studio-empty-pane-content .glyph { border-radius: 12px; background: rgba(10,132,255,.14); color: #409cff; }
.dsh-studio-project-pane .eyebrow { color: var(--studio-dim); font-weight: 600; letter-spacing: .12em; }
.dsh-studio-project-pane strong { color: var(--studio-ink); font-size: 18px; font-weight: 650; letter-spacing: -.014em; }
.dsh-studio-project-pane p { color: var(--studio-muted); font-size: 12px; line-height: 1.55; }
.dsh-studio-pane-actions button { height: 34px; border-radius: 9px; background: var(--studio-blue); color: #fff; }
.dsh-studio-pane-actions button.secondary { background: var(--studio-fill); color: var(--studio-ink); }
.dsh-studio-divider::after { background: transparent; }
.dsh-studio-divider:hover::after { background: rgba(10,132,255,.55); }

.dsh-studio-ai-sidebar {
  border-left-color: var(--studio-separator);
  background: rgba(22,22,24,.88);
  -webkit-backdrop-filter: blur(30px) saturate(170%);
  backdrop-filter: blur(30px) saturate(170%);
}
.dsh-studio-ai-sidebar-head { border-bottom-color: var(--studio-separator); }
.dsh-studio-ai-sidebar-head .status { background: #30d158; box-shadow: none; }
.dsh-studio-ai-sidebar-head .title strong { color: var(--studio-ink); font-weight: 610; }
.dsh-studio-ai-sidebar-head .title span { color: var(--studio-dim); }
.dsh-studio-ai-modes { background: rgba(255,255,255,.055); }
.dsh-studio-ai-modes button { color: var(--studio-muted); }
.dsh-studio-ai-modes button.active { background: rgba(255,255,255,.13); color: var(--studio-ink); box-shadow: 0 1px 3px rgba(0,0,0,.2); }
html[data-dsh-studio-active] [data-dsh-studio-conversation] {
  border-left-color: var(--studio-separator) !important;
  background: rgba(22,22,24,.9) !important;
  transition: opacity 180ms ease, transform 320ms cubic-bezier(.22,1,.36,1) !important;
}

.dsh-studio-section-head, .dsh-studio-project-row, .dsh-studio-theme-button, .dsh-studio-rail-button,
.dsh-studio-menu button, .dsh-studio-icon-button, .dsh-studio-folder-button, .dsh-studio-button,
.dsh-studio-layout-button, .dsh-studio-ai-toggle, .dsh-studio-ai-sidebar-head button,
.dsh-studio-pane-bar button, .dsh-studio-pane-actions button {
  transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease, transform 100ms ease-out;
}
.dsh-studio-project-row:active, .dsh-studio-theme-button:active, .dsh-studio-rail-button:active,
.dsh-studio-menu button:active, .dsh-studio-icon-button:active, .dsh-studio-folder-button:active,
.dsh-studio-button:active, .dsh-studio-layout-button:active, .dsh-studio-ai-toggle:active,
.dsh-studio-ai-sidebar-head button:active, .dsh-studio-pane-actions button:active { transform: scale(.97); }
.dsh-studio-project-row:focus-visible, .dsh-studio-theme-button:focus-visible, .dsh-studio-rail-button:focus-visible,
.dsh-studio-menu button:focus-visible, .dsh-studio-icon-button:focus-visible, .dsh-studio-folder-button:focus-visible,
.dsh-studio-button:focus-visible, .dsh-studio-layout-button:focus-visible, .dsh-studio-ai-toggle:focus-visible,
.dsh-studio-ai-sidebar-head button:focus-visible, .dsh-studio-pane-actions button:focus-visible {
  outline: 2px solid var(--studio-blue);
  outline-offset: 2px;
}

html[data-dsh-studio-theme="light"] {
  --studio-ink: rgba(0,0,0,.88);
  --studio-muted: rgba(60,60,67,.68);
  --studio-dim: rgba(60,60,67,.38);
  --studio-blue: #007aff;
  --studio-blue-soft: rgba(0,122,255,.12);
  --studio-orange: #ff9500;
  --studio-field: #f5f5f7;
  --studio-panel: rgba(255,255,255,.8);
  --studio-separator: rgba(60,60,67,.12);
  --studio-fill: rgba(120,120,128,.1);
  --studio-fill-hover: rgba(120,120,128,.15);
}
html[data-dsh-studio-theme="light"] body, html[data-dsh-studio-theme="light"] .dsh-studio-overlay { background: var(--studio-field) !important; }
html[data-dsh-studio-theme="light"] [data-dsh-studio-sidebar-root] { background: rgba(246,246,248,.88) !important; border-right-color: var(--studio-separator) !important; }
html[data-dsh-studio-theme="light"] .dsh-studio-section-head, html[data-dsh-studio-theme="light"] .dsh-studio-project-row { color: var(--studio-muted); }
html[data-dsh-studio-theme="light"] .dsh-studio-section-head strong, html[data-dsh-studio-theme="light"] .dsh-studio-project-row:hover { color: var(--studio-ink); }
html[data-dsh-studio-theme="light"] .dsh-studio-section-head:hover, html[data-dsh-studio-theme="light"] .dsh-studio-project-row:hover { background: var(--studio-fill); }
html[data-dsh-studio-theme="light"] .dsh-studio-project-row.active { background: rgba(0,122,255,.12); color: #065ea8; box-shadow: none; }
html[data-dsh-studio-theme="light"] .dsh-studio-empty { border: 0; background: rgba(120,120,128,.06); color: var(--studio-dim); }
html[data-dsh-studio-theme="light"] .dsh-studio-menu, html[data-dsh-studio-theme="light"] .dsh-studio-dialog { border-color: rgba(60,60,67,.14); background: rgba(250,250,252,.9); }
html[data-dsh-studio-theme="light"] .dsh-studio-field input, html[data-dsh-studio-theme="light"] .dsh-studio-field select,
html[data-dsh-studio-theme="light"] .dsh-studio-folder-button { border-color: rgba(60,60,67,.13); background: rgba(120,120,128,.08); color: var(--studio-ink); }
html[data-dsh-studio-theme="light"] .dsh-studio-button { background: var(--studio-fill); color: var(--studio-ink); }
html[data-dsh-studio-theme="light"] .dsh-studio-button.primary { background: var(--studio-blue); color: #fff; }
html[data-dsh-studio-theme="light"] .dsh-studio-topbar { border-bottom-color: var(--studio-separator); background: rgba(248,248,250,.78); }
html[data-dsh-studio-theme="light"] .dsh-studio-topbar h1 { color: var(--studio-ink); }
html[data-dsh-studio-theme="light"] .dsh-studio-topbar .path, html[data-dsh-studio-theme="light"] .dsh-studio-project-pane .eyebrow { color: var(--studio-dim); }
html[data-dsh-studio-theme="light"] .dsh-studio-layouts, html[data-dsh-studio-theme="light"] .dsh-studio-ai-modes { background: rgba(120,120,128,.09); }
html[data-dsh-studio-theme="light"] .dsh-studio-layout-button, html[data-dsh-studio-theme="light"] .dsh-studio-ai-modes button { color: var(--studio-muted); }
html[data-dsh-studio-theme="light"] .dsh-studio-layout-button.active, html[data-dsh-studio-theme="light"] .dsh-studio-ai-modes button.active { background: rgba(255,255,255,.9); color: var(--studio-ink); box-shadow: 0 1px 4px rgba(0,0,0,.12); }
html[data-dsh-studio-theme="light"] .dsh-studio-surface { border-color: rgba(60,60,67,.1); background: rgba(255,255,255,.76); box-shadow: 0 16px 44px rgba(0,0,0,.09), 0 1px 0 rgba(255,255,255,.9) inset; }
html[data-dsh-studio-theme="light"] .dsh-studio-pane, html[data-dsh-studio-theme="light"] .dsh-studio-pane:nth-of-type(even) { background: rgba(255,255,255,.58); }
html[data-dsh-studio-theme="light"] .dsh-studio-pane-bar { background: rgba(250,250,252,.72); color: var(--studio-dim); }
html[data-dsh-studio-theme="light"] .dsh-studio-project-pane strong { color: var(--studio-ink); }
html[data-dsh-studio-theme="light"] .dsh-studio-project-pane p { color: var(--studio-muted); }
html[data-dsh-studio-theme="light"] .dsh-studio-pane-actions button { background: var(--studio-blue); color: #fff; }
html[data-dsh-studio-theme="light"] .dsh-studio-pane-actions button.secondary { background: var(--studio-fill); color: var(--studio-ink); }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar, html[data-dsh-studio-theme="light"][data-dsh-studio-active] [data-dsh-studio-conversation] { border-left-color: var(--studio-separator) !important; background: rgba(248,248,250,.9) !important; }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar-head { border-bottom-color: var(--studio-separator); }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar-head .title strong { color: var(--studio-ink); }

@media (prefers-reduced-motion: reduce) {
  .dsh-studio-stage, html[data-dsh-studio-active] [data-dsh-studio-conversation] { transition: opacity 160ms ease !important; }
  .dsh-studio-project-row:active, .dsh-studio-theme-button:active, .dsh-studio-rail-button:active,
  .dsh-studio-menu button:active, .dsh-studio-icon-button:active, .dsh-studio-folder-button:active,
  .dsh-studio-button:active, .dsh-studio-layout-button:active, .dsh-studio-ai-toggle:active,
  .dsh-studio-ai-sidebar-head button:active, .dsh-studio-pane-actions button:active { transform: none; }
}
@media (prefers-reduced-transparency: reduce) {
  [data-dsh-studio-sidebar-root], .dsh-studio-topbar, .dsh-studio-menu, .dsh-studio-dialog,
  .dsh-studio-surface, .dsh-studio-ai-sidebar, html[data-dsh-studio-active] [data-dsh-studio-conversation] {
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
  }
}
@media (prefers-contrast: more) {
  .dsh-studio-menu, .dsh-studio-dialog, .dsh-studio-surface, .dsh-studio-ai-sidebar,
  html[data-dsh-studio-active] [data-dsh-studio-conversation] { border-color: currentColor !important; }
}

@media (max-width: 1050px) {
  .dsh-studio-stage.ai-open { padding-right: 322px; }
  .dsh-studio-ai-sidebar { width: 304px; }
  html[data-dsh-studio-active] [data-dsh-studio-conversation] { width: 304px !important; min-width: 280px !important; }
}

/* Unified plugin-owned sidebar shell. DSH's native workspace browser remains mounted as a child slot. */
.dsh-studio-shell {
  width: 100%; height: 100%; min-width: 0; display: flex; flex-direction: column; overflow: hidden;
  box-sizing: border-box; padding: 8px 8px 10px; color: var(--studio-ink);
  background: rgba(22,22,24,.92); border-right: 1px solid var(--studio-separator);
  font: 13px/18px -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", sans-serif;
  -webkit-backdrop-filter: blur(28px) saturate(160%); backdrop-filter: blur(28px) saturate(160%);
}
.dsh-studio-shell.rail { width: 56px; padding-inline: 10px; align-items: center; }
.dsh-studio-shell-head { width: 100%; height: 44px; display: flex; align-items: center; gap: 8px; }
.dsh-studio-brand { min-width: 0; flex: 1; display: flex; align-items: center; gap: 9px; border: 0; padding: 4px 2px; background: transparent; color: inherit; text-align: left; cursor: pointer; }
.dsh-studio-brand-image, .dsh-studio-brand-fallback { flex: none; display: grid; place-items: center; overflow: hidden; border-radius: 7px; object-fit: contain; color: var(--studio-blue); }
.dsh-studio-brand-copy { min-width: 0; display: grid; gap: 0; }
.dsh-studio-brand-copy strong, .dsh-studio-brand-copy small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsh-studio-brand-copy strong { color: var(--studio-ink); font-size: 12px; line-height: 16px; font-weight: 650; letter-spacing: -.01em; }
.dsh-studio-brand-copy small { color: var(--studio-dim); font-size: 9px; line-height: 12px; }
.dsh-studio-shell-icon, .dsh-studio-new-session, .dsh-studio-theme-button { border: 0; background: transparent; color: var(--studio-muted); cursor: pointer; }
.dsh-studio-shell-icon { width: 30px; height: 30px; flex: none; display: grid; place-items: center; border-radius: 9px; }
.dsh-studio-shell-icon:hover { background: var(--studio-fill); color: var(--studio-ink); }
.dsh-studio-new-session { width: 100%; min-height: 36px; display: flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid var(--studio-separator); border-radius: 10px; margin: 2px 0 10px; background: var(--studio-fill); color: var(--studio-ink); font: inherit; font-weight: 560; }
.dsh-studio-new-session:hover { background: var(--studio-fill-hover); }
.dsh-studio-shell.rail .dsh-studio-new-session { width: 36px; height: 36px; padding: 0; border-radius: 10px; }
.dsh-studio-navigation { width: 100%; min-height: 0; flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.dsh-studio-native-workspaces { min-height: 116px; max-height: 56%; flex: 0 1 56%; display: flex; overflow: hidden; }
.dsh-studio-native-workspaces > * { min-width: 0; flex: 1; }
.dsh-studio-project-list { flex: none; max-height: 42%; display: grid; gap: 2px; overflow: auto; padding: 7px 0 6px; border-top: 1px solid var(--studio-separator); }
.dsh-studio-shell.rail .dsh-studio-project-list { width: 36px; max-height: 40%; justify-items: center; border-top: 0; }
.dsh-studio-project-row { width: 100%; min-height: 36px; display: grid; grid-template-columns: 20px minmax(0,1fr) auto 12px; align-items: center; gap: 7px; border: 0; border-radius: 9px; padding: 0 7px; background: transparent; color: var(--studio-muted); font: inherit; text-align: left; cursor: pointer; }
.dsh-studio-shell.rail .dsh-studio-project-row { width: 36px; grid-template-columns: 1fr; place-items: center; padding: 0; }
.dsh-studio-project-icon { display: grid; place-items: center; color: currentColor; }
.dsh-studio-project-chevron { opacity: 0; color: var(--studio-dim); transition: opacity 120ms ease, transform 180ms cubic-bezier(.2,.8,.2,1); }
.dsh-studio-project-row:hover .dsh-studio-project-chevron { opacity: 1; transform: translateX(1px); }
.dsh-studio-project-row.active { background: var(--studio-blue-soft); color: #70b7ff; }
.dsh-studio-project-empty { min-height: 36px; display: flex; align-items: center; justify-content: center; gap: 6px; border: 0; border-radius: 9px; background: transparent; color: var(--studio-dim); font: 11px/16px inherit; cursor: pointer; }
.dsh-studio-project-empty:hover { background: var(--studio-fill); color: var(--studio-muted); }
.dsh-studio-shell-foot { width: 100%; flex: none; display: grid; gap: 2px; padding-top: 7px; border-top: 1px solid var(--studio-separator); }
.dsh-studio-theme-button { width: 100%; min-height: 34px; display: flex; align-items: center; gap: 9px; border-radius: 9px; padding: 0 8px; font: inherit; }
.dsh-studio-shell.rail .dsh-studio-theme-button { width: 36px; padding: 0; justify-content: center; }
.dsh-studio-native-settings > button { width: 100% !important; min-height: 34px !important; border-radius: 9px !important; }
.dsh-studio-brand-preview { display: flex; align-items: center; gap: 12px; padding: 14px; border: 1px solid var(--studio-separator); border-radius: 14px; background: var(--studio-fill); }
.dsh-studio-brand-preview > div { min-width: 0; display: grid; gap: 2px; }
.dsh-studio-brand-preview strong { color: var(--studio-ink); font-size: 15px; }
.dsh-studio-brand-preview span { color: var(--studio-muted); font-size: 11px; }
.dsh-studio-dialog-spacer { flex: 1; }
.dsh-studio-section-picker { display: grid; grid-template-columns:minmax(0,1fr) 32px; gap: 7px; align-items: center; }
.dsh-studio-field-note { color: var(--studio-dim); font-size: 10px; line-height: 15px; }

/* Codex-like reading rhythm: full-width assistant prose, compact user bubble, quiet composer card. */
[data-conversation-scroll] { --dsh-chat-content-width: 720px; --dsh-composer-card-max-width: 752px; --dsh-composer-side-clearance: 22px; }
[data-conversation-scroll] [data-composer-card] { min-height: 92px; border-radius: 18px; padding-top: 10px; box-shadow: 0 8px 24px rgba(0,0,0,.14); }
[data-conversation-scroll] [data-input-mirror] { min-height: 42px; font-size: 14px; line-height: 22px; }

/* AI is a floating companion surface with the same 16px corner system as the canvas. */
.dsh-studio-ai-sidebar { top: 72px; right: 14px; bottom: 14px; height: auto; width: 372px; overflow: hidden; border: 1px solid var(--studio-separator); border-radius: 16px; box-shadow: 0 18px 50px rgba(0,0,0,.24); }
html[data-dsh-studio-active] [data-dsh-studio-conversation] { top: 72px !important; right: 14px !important; bottom: 14px !important; height: auto !important; overflow: hidden !important; border: 1px solid var(--studio-separator) !important; border-radius: 16px !important; box-shadow: 0 18px 50px rgba(0,0,0,.24) !important; }
.dsh-studio-stage.ai-open { padding-right: 400px; }

html[data-dsh-studio-theme="light"] .dsh-studio-shell { background: rgba(246,246,248,.9); border-right-color: var(--studio-separator); }
html[data-dsh-studio-theme="light"] .dsh-studio-project-row.active { background: var(--studio-blue-soft); color: #0068bd; }
html[data-dsh-studio-theme="light"] .dsh-studio-brand-fallback { color: #007aff; }

@media (max-width: 1050px) {
  .dsh-studio-ai-sidebar { width: 304px; }
  .dsh-studio-stage.ai-open { padding-right: 332px; }
}
`;
function StudioMark({ size = 24, className }) {
  const { brand } = useStudio();
  if (brand.logo !== "") {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { className: `dsh-studio-brand-image${className ? ` ${className}` : ""}`, src: brand.logo, width: size, height: size, alt: "" });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `dsh-studio-brand-fallback${className ? ` ${className}` : ""}`, style: { width: size, height: size }, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconSparkle16, { size: Math.max(16, size - 4) }) });
}
function SidebarBrandName() {
  const { brand } = useStudio();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dsh-studio-brand-copy", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: brand.name }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: brand.tagline })
  ] });
}
function HeroBrandMark({ size = 34, className }) {
  const { brand } = useStudio();
  const ref = (0, import_react.useRef)(null);
  (0, import_react.useLayoutEffect)(() => {
    const slot = ref.current?.closest('[data-slot="conversation.hero.brand.mark"]');
    const markSeat = slot?.parentElement;
    const title = markSeat?.nextElementSibling;
    const badge = title?.nextElementSibling;
    if (!(title instanceof HTMLElement) || !(badge instanceof HTMLElement)) return;
    const previousTitle = title.textContent;
    const previousBadge = badge.textContent;
    title.textContent = brand.name;
    badge.textContent = brand.tagline;
    return () => {
      title.textContent = previousTitle;
      badge.textContent = previousBadge;
    };
  }, [brand.name, brand.tagline]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ref, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioMark, { size, className }) });
}
function BrandDialog({ onClose }) {
  const current = useStudio().brand;
  const [name, setName] = (0, import_react.useState)(current.name);
  const [tagline, setTagline] = (0, import_react.useState)(current.tagline);
  const [logo, setLogo] = (0, import_react.useState)(current.logo);
  const upload = (file) => {
    if (file === void 0) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-studio-dialog-backdrop", onMouseDown: (event) => {
      if (event.target === event.currentTarget) onClose();
    }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-dialog dsh-studio-brand-dialog", role: "dialog", "aria-modal": "true", "aria-label": "\u54C1\u724C\u4E0E Logo", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-dialog-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "\u54C1\u724C\u4E0E Logo" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dsh-studio-icon-button", type: "button", "aria-label": "\u5173\u95ED", onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconCloseOutline16, {}) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-brand-preview", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioMark, { size: 42 }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: name || "\u672A\u547D\u540D\u5DE5\u4F5C\u53F0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tagline || "\u4E2A\u4EBA\u667A\u80FD\u5DE5\u4F5C\u7A7A\u95F4" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "studio-brand-name", children: "\u4E3B\u754C\u9762\u540D\u79F0" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { id: "studio-brand-name", value: name, onChange: (event) => {
          setName(event.target.value);
        }, placeholder: "\u4F8B\u5982\uFF1A\u7384\u6728\u5DE5\u4F5C\u53F0" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "studio-brand-tagline", children: "\u6807\u8BC6\u6587\u5B57" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { id: "studio-brand-tagline", value: tagline, onChange: (event) => {
          setTagline(event.target.value);
        }, placeholder: "\u4F8B\u5982\uFF1A\u4E2A\u4EBA\u667A\u80FD\u5DE5\u4F5C\u7A7A\u95F4" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "studio-brand-logo", children: "Logo \u56FE\u7247" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { id: "studio-brand-logo", type: "file", accept: "image/png,image/jpeg,image/webp,image/svg+xml", onChange: (event) => {
          upload(event.target.files?.[0]);
        } })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-dialog-actions", children: [
        logo !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dsh-studio-button", type: "button", onClick: () => {
          setLogo("");
        }, children: "\u6062\u590D\u9ED8\u8BA4\u56FE\u6807" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsh-studio-dialog-spacer" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dsh-studio-button", type: "button", onClick: onClose, children: "\u53D6\u6D88" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dsh-studio-button primary", type: "button", disabled: name.trim() === "", onClick: () => {
          studio.setBrand({ name: name.trim(), tagline: tagline.trim(), logo });
          onClose();
        }, children: "\u4FDD\u5B58" })
      ] })
    ] }) }),
    document.body
  );
}
function ProjectDialog({
  project,
  onClose
}) {
  const [name, setName] = (0, import_react.useState)(project?.name ?? "");
  const [layout, setLayout] = (0, import_react.useState)(project?.layout ?? "single");
  const [kind, setKind] = (0, import_react.useState)(project?.kind ?? "attached");
  const [workspaces, setWorkspaces] = (0, import_react.useState)(listWorkspaces);
  const [workspaceId, setWorkspaceId] = (0, import_react.useState)(project?.workspaceId ?? workspaces[0]?.id ?? "");
  const [folderName, setFolderName] = (0, import_react.useState)("");
  const [sectionWorkspaceIds, setSectionWorkspaceIds] = (0, import_react.useState)(project?.sections.map((section) => section.workspaceId) ?? []);
  const [launch, setLaunch] = (0, import_react.useState)(project?.launch ?? "workspace");
  const [dataKind, setDataKind] = (0, import_react.useState)(project?.data.kind ?? "project-files");
  const [dataLocation, setDataLocation] = (0, import_react.useState)(project?.data.location ?? "");
  const [saving, setSaving] = (0, import_react.useState)(false);
  const [picking, setPicking] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)("");
  const pickLocalFolder = async () => {
    setPicking(true);
    setError("");
    try {
      const path = await dshBridge?.uiWorkspace?.pickDirectory?.();
      if (!path) return;
      const workspace = await dshBridge?.workspaces?.create?.({ path });
      const id = String(workspace?.workspaceId ?? workspace?.id ?? "");
      if (!id) throw new Error("\u6240\u9009\u6587\u4EF6\u5939\u65E0\u6CD5\u6CE8\u518C\u4E3A DSH \u5DE5\u4F5C\u533A");
      const title = String(workspace?.title ?? path.split(/[\\/]/).filter(Boolean).at(-1) ?? "\u672C\u5730\u9879\u76EE");
      const option = { id, title, path: String(workspace?.path ?? path) };
      setWorkspaces((current) => [...current.filter((item) => item.id !== id), option]);
      setWorkspaceId(id);
      if (name.trim() === "") setName(title);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setPicking(false);
    }
  };
  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const parent = workspaces.find((item) => item.id === workspaceId);
      if (parent === void 0) throw new Error("\u8BF7\u5148\u5728 DSH \u5DE5\u4F5C\u533A\u4E2D\u6DFB\u52A0\u4E00\u4E2A\u672C\u5730\u76EE\u5F55");
      let binding = parent;
      if (project === void 0 && kind === "generated") {
        const folder = folderName.trim().replace(/^[\\/]+|[\\/]+$/g, "");
        if (!folder) throw new Error("\u8BF7\u8F93\u5165\u65B0\u9879\u76EE\u6587\u4EF6\u5939\u540D\u79F0");
        const path = await dshBridge?.uiWorkspace?.createDirectory?.(parent.path, folder);
        if (!path) throw new Error("\u65E0\u6CD5\u521B\u5EFA\u9879\u76EE\u76EE\u5F55");
        const created = await dshBridge?.workspaces?.create?.({ path });
        const createdId = created?.workspaceId ?? created?.id;
        if (!createdId) throw new Error("\u9879\u76EE\u76EE\u5F55\u5DF2\u521B\u5EFA\uFF0C\u4F46\u65E0\u6CD5\u6CE8\u518C\u4E3A DSH \u5DE5\u4F5C\u533A");
        binding = { id: String(createdId), title: name.trim(), path };
      }
      const next = {
        id: project?.id ?? projectId(),
        name: name.trim(),
        layout,
        kind,
        workspaceId: project === void 0 ? binding.id : project.workspaceId,
        path: project === void 0 ? binding.path : project.path,
        panes: panesFor(layout, project?.panes ?? ["overview"]),
        paneSources: project?.paneSources ?? [],
        sections: (() => {
          const ids = Array.from(new Set([binding.id, ...sectionWorkspaceIds].filter(Boolean)));
          return ids.map((id, index) => {
            if (id === binding.id) return { id: project?.sections.find((section) => section.workspaceId === id)?.id ?? projectId(), name: index === 0 ? "\u4E3B\u9879\u76EE" : binding.title, workspaceId: id, path: binding.path };
            const workspace = workspaces.find((item) => item.id === id);
            return { id: project?.sections.find((section) => section.workspaceId === id)?.id ?? projectId(), name: workspace.title, workspaceId: id, path: workspace.path };
          });
        })(),
        launch,
        data: { kind: dataKind, location: dataLocation.trim(), readOnly: true },
        aiMode: project?.aiMode ?? (kind === "generated" ? "build" : "analyze"),
        sessions: project?.sessions ?? {}
      };
      if (project === void 0) studio.add(next);
      else studio.update(next);
      onClose();
      await openProjectMode(next, next.aiMode);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setSaving(false);
    }
  };
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-studio-dialog-backdrop", onMouseDown: (event) => {
      if (event.target === event.currentTarget) onClose();
    }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-dialog", role: "dialog", "aria-modal": "true", "aria-label": project ? "\u7F16\u8F91\u9879\u76EE" : "\u65B0\u5EFA\u9879\u76EE", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-dialog-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: project ? "\u7F16\u8F91\u9879\u76EE" : "\u65B0\u5EFA\u9879\u76EE" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dsh-studio-icon-button", type: "button", "aria-label": "\u5173\u95ED", onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconCloseOutline16, {}) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "studio-project-name", children: "\u9879\u76EE\u540D\u79F0" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { id: "studio-project-name", autoFocus: true, value: name, onChange: (event) => {
          setName(event.target.value);
        }, placeholder: "\u4F8B\u5982\uFF1A\u6211\u7684\u5206\u6790\u9879\u76EE" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "studio-project-kind", children: "\u63A5\u5165\u65B9\u5F0F" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { id: "studio-project-kind", value: kind, disabled: project !== void 0, onChange: (event) => {
          setKind(event.target.value);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "attached", children: "\u63A5\u5165\u672C\u5730\u9879\u76EE" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "generated", children: "AI \u521B\u5EFA\u65B0\u9879\u76EE" })
        ] })
      ] }),
      project === void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "studio-project-workspace", children: kind === "attached" ? "\u9009\u62E9 DSH \u5DE5\u4F5C\u533A" : "\u9009\u62E9\u65B0\u9879\u76EE\u7684\u7236\u5DE5\u4F5C\u533A" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { id: "studio-project-workspace", value: workspaceId, onChange: (event) => {
          setWorkspaceId(event.target.value);
        }, children: [
          workspaces.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "\u6682\u65E0\u53EF\u7528\u5DE5\u4F5C\u533A" }),
          workspaces.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: item.id, children: item.title }, item.id))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "dsh-studio-folder-button", type: "button", disabled: picking, onClick: () => {
          void pickLocalFolder();
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconFolderClose16, { size: 14 }),
          picking ? "\u6B63\u5728\u6253\u5F00\u2026" : kind === "attached" ? "\u4ECE\u7535\u8111\u9009\u62E9\u9879\u76EE\u6587\u4EF6\u5939" : "\u4ECE\u7535\u8111\u9009\u62E9\u7236\u6587\u4EF6\u5939"
        ] })
      ] }),
      project === void 0 && kind === "generated" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "studio-project-folder", children: "\u65B0\u9879\u76EE\u6587\u4EF6\u5939" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { id: "studio-project-folder", value: folderName, onChange: (event) => {
          setFolderName(event.target.value);
        }, placeholder: "\u4F8B\u5982\uFF1Amy-new-project" })
      ] }),
      project !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-project-binding", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u5DE5\u4F5C\u533A\u8FDE\u63A5" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "\u5DF2\u8FDE\u63A5\u5230 DSH \u5DE5\u4F5C\u533A" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "studio-project-launch", children: "\u70B9\u51FB\u9879\u76EE\u65F6\u542F\u52A8" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { id: "studio-project-launch", value: launch, onChange: (event) => {
          setLaunch(event.target.value);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "workspace", children: "DSH \u9879\u76EE\u5DE5\u4F5C\u533A" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "web", children: "\u7F51\u9875\u9879\u76EE" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "worktable", children: "\u5DE5\u4F5C\u53F0\u9879\u76EE" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "\u6302\u8F7D\u5230\u5206\u533A\u7684 DSH \u9879\u76EE" }),
        sectionWorkspaceIds.map((id, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-section-picker", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { value: id, onChange: (event) => {
            setSectionWorkspaceIds((items) => items.map((item, itemIndex) => itemIndex === index ? event.target.value : item));
          }, children: workspaces.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: item.id, children: item.title }, item.id)) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dsh-studio-icon-button", type: "button", "aria-label": "\u79FB\u9664\u5206\u533A", onClick: () => {
            setSectionWorkspaceIds((items) => items.filter((_, itemIndex) => itemIndex !== index));
          }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconCloseOutline16, { size: 13 }) })
        ] }, `${id}-${index}`)),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "dsh-studio-folder-button", type: "button", disabled: workspaces.length === 0, onClick: () => {
          setSectionWorkspaceIds((items) => [...items, workspaces[0].id]);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPlusOutline16, { size: 14 }),
          "\u6DFB\u52A0\u9879\u76EE\u5206\u533A"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "studio-project-data", children: "AI \u6570\u636E\u63A5\u53E3" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { id: "studio-project-data", value: dataKind, onChange: (event) => {
          setDataKind(event.target.value);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "project-files", children: "\u9879\u76EE\u6587\u4EF6\u4E0E\u4EA7\u7269\uFF08\u9ED8\u8BA4\uFF09" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "sqlite", children: "SQLite \u6570\u636E\u5E93" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "http", children: "HTTP \u6570\u636E\u63A5\u53E3" })
        ] }),
        dataKind !== "project-files" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { value: dataLocation, onChange: (event) => {
          setDataLocation(event.target.value);
        }, placeholder: dataKind === "sqlite" ? "\u6570\u636E\u5E93\u76F8\u5BF9\u8DEF\u5F84\uFF0C\u4F8B\u5982 data/app.db" : "\u63A5\u53E3\u5730\u5740\uFF0C\u4F8B\u5982 http://127.0.0.1:4000/api" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { className: "dsh-studio-field-note", children: "AI \u9ED8\u8BA4\u53EA\u8BFB\u8BBF\u95EE\uFF1B\u51ED\u636E\u4E0D\u4F1A\u4FDD\u5B58\u5728\u8FD9\u4E2A\u63D2\u4EF6\u4E2D\u3002" })
      ] }),
      error !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-studio-dialog-error", children: error }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "studio-project-layout", children: "\u521D\u59CB\u89C6\u56FE" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { id: "studio-project-layout", value: layout, onChange: (event) => {
          setLayout(event.target.value);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "single", children: "\u5355\u753B\u5E03" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "dual", children: "\u5DE6\u53F3\u53CC\u533A" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "triple", children: "\u4E09\u680F\u89C6\u56FE" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "vertical", children: "\u4E0A\u4E0B\u53CC\u533A" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-dialog-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dsh-studio-button", type: "button", onClick: onClose, children: "\u53D6\u6D88" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dsh-studio-button primary", type: "button", disabled: saving || picking || name.trim() === "" || workspaceId === "", onClick: () => {
          void save();
        }, children: saving ? "\u6B63\u5728\u8FDE\u63A5\u2026" : "\u4FDD\u5B58\u9879\u76EE" })
      ] })
    ] }) }),
    document.body
  );
}
function PersonalSidebar(props) {
  const { collapsed, width, renderSlot, startSession, toggleSidebar } = props;
  const state = useStudio();
  const wide = !collapsed;
  const [menu, setMenu] = (0, import_react.useState)(null);
  const [editing, setEditing] = (0, import_react.useState)(false);
  const [editingBrand, setEditingBrand] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    document.documentElement.toggleAttribute("data-dsh-studio-active", state.activeId !== null);
    document.documentElement.setAttribute("data-dsh-studio-theme", state.theme);
    return () => {
      document.documentElement.removeAttribute("data-dsh-studio-active");
    };
  }, [state.activeId, state.theme]);
  (0, import_react.useEffect)(() => {
    if (menu === null) return;
    const close = () => {
      setMenu(null);
    };
    window.addEventListener("pointerdown", close);
    return () => {
      window.removeEventListener("pointerdown", close);
    };
  }, [menu]);
  const showContext = (event, project, brand = false) => {
    event.preventDefault();
    event.stopPropagation();
    setMenu({ x: event.clientX, y: event.clientY, project, brand });
  };
  const openProject = (project) => {
    studio.setActive(project.id);
    void openProjectMode(project, project.aiMode);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "aside",
    {
      className: `dsh-studio-shell${wide ? " wide" : " rail"}`,
      "data-dsh-studio-sidebar-root": "",
      style: wide ? { width } : void 0,
      onContextMenu: (event) => {
        if (event.target === event.currentTarget) showContext(event);
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { className: "dsh-studio-shell-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "dsh-studio-brand", type: "button", "aria-label": wide ? "\u54C1\u724C\u8BBE\u7F6E" : "\u5C55\u5F00\u4FA7\u8FB9\u680F", onContextMenu: (event) => {
            showContext(event, void 0, true);
          }, onClick: () => {
            if (!wide) toggleSidebar();
            else setEditingBrand(true);
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioMark, { size: wide ? 26 : 24 }),
            wide && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarBrandName, {})
          ] }),
          wide && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dsh-studio-shell-icon", type: "button", "aria-label": "\u6536\u8D77\u4FA7\u8FB9\u680F", onClick: toggleSidebar, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPanelLeftOutline16, { size: 16 }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "dsh-studio-new-session", type: "button", "aria-label": "\u65B0\u5EFA\u4F1A\u8BDD", onClick: () => {
          studio.setActive(null);
          startSession();
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPlusOutline16, { size: wide ? 14 : 18 }),
          wide && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u65B0\u5EFA\u4F1A\u8BDD" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-navigation", onContextMenu: (event) => {
          if (event.target.closest("button") === null) showContext(event);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-studio-native-workspaces", children: renderSlot("sidebar.workspaces", { wide, expandSidebar: () => {
            if (!wide) toggleSidebar();
          } }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-project-list", role: "tree", "aria-label": "\u9879\u76EE", children: [
            state.projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", role: "treeitem", className: `dsh-studio-project-row${state.activeId === project.id ? " active" : ""}`, onClick: () => {
              openProject(project);
            }, onContextMenu: (event) => {
              showContext(event, project);
            }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsh-studio-project-icon", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconSparkle16, { size: wide ? 14 : 18 }) }),
              wide && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: project.name }),
                project.sections.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: project.sections.length }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronRightOutline14, { className: "dsh-studio-project-chevron", size: 12 })
              ] })
            ] }, project.id)),
            wide && state.projects.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "dsh-studio-project-empty", type: "button", onClick: () => {
              setEditing(void 0);
            }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPlusOutline16, { size: 13 }),
              "\u53F3\u952E\u6216\u70B9\u51FB\u6DFB\u52A0\u9879\u76EE"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { className: "dsh-studio-shell-foot", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "dsh-studio-theme-button", type: "button", "aria-label": state.theme === "dark" ? "\u5207\u6362\u4E3A\u6D45\u8272\u754C\u9762" : "\u5207\u6362\u4E3A\u6DF1\u8272\u754C\u9762", onClick: () => {
            setTheme(state.theme === "dark" ? "light" : "dark");
          }, children: [
            state.theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconLightOutline16, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconDarkOutline16, { size: 16 }),
            wide && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: state.theme === "dark" ? "\u6D45\u8272\u5916\u89C2" : "\u6DF1\u8272\u5916\u89C2" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-studio-native-settings", children: renderSlot("sidebar.settings", { wide }) }),
          renderSlot("sidebar.footer.action", { wide })
        ] }),
        menu !== null && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-studio-menu", style: { left: menu.x, top: menu.y }, onPointerDown: (event) => {
          event.stopPropagation();
        }, children: menu.brand ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", onClick: () => {
          setMenu(null);
          setEditingBrand(true);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconEditOutline16, {}),
          "\u4FEE\u6539\u54C1\u724C\u4E0E Logo"
        ] }) : menu.project === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", onClick: () => {
          setMenu(null);
          setEditing(void 0);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPlusOutline16, {}),
          "\u65B0\u5EFA\u9879\u76EE"
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", onClick: () => {
            setMenu(null);
            setEditing(menu.project);
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconEditOutline16, {}),
            "\u7F16\u8F91\u9879\u76EE"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "danger", type: "button", onClick: () => {
            studio.remove(menu.project.id);
            setMenu(null);
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconTrashOutline16, {}),
            "\u5220\u9664\u9879\u76EE"
          ] })
        ] }) }), document.body),
        editing !== false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectDialog, { project: editing, onClose: () => {
          setEditing(false);
        } }),
        editingBrand && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandDialog, { onClose: () => {
          setEditingBrand(false);
        } })
      ]
    }
  );
}
var paneLabels = {
  overview: { title: "\u9879\u76EE\u6982\u89C8", description: "\u9879\u76EE\u8DEF\u5F84\u3001\u72B6\u6001\u4E0E AI \u5DE5\u4F5C\u5165\u53E3" },
  files: { title: "\u6587\u4EF6\u4E0E\u4EE3\u7801", description: "\u7531\u9879\u76EE AI \u8BFB\u53D6\u3001\u68C0\u7D22\u6216\u4FEE\u6539\u5F53\u524D\u5DE5\u4F5C\u533A\u6587\u4EF6" },
  data: { title: "\u6570\u636E\u4E0E\u4EA7\u7269", description: "\u5206\u6790\u9879\u76EE\u751F\u6210\u7684\u6570\u636E\u3001\u65E5\u5FD7\u3001\u8868\u683C\u548C\u5176\u4ED6\u4EA7\u7269" },
  report: { title: "\u603B\u7ED3\u4E0E\u62A5\u544A", description: "\u628A\u9879\u76EE\u6570\u636E\u6574\u7406\u4E3A\u7ED3\u8BBA\u3001\u98CE\u9669\u4E0E\u4E0B\u4E00\u6B65\u884C\u52A8" }
};
function Pane({ project, index, onMode }) {
  const kind = project.panes[index] ?? "overview";
  const section = project.sections.find((item) => item.id === project.paneSources[index]) ?? project.sections[index] ?? project.sections[0];
  const setKind = (nextKind) => {
    const panes = panesFor(project.layout, project.panes);
    panes[index] = nextKind;
    studio.update({ ...project, panes });
  };
  const setSection = (sectionId) => {
    const paneSources = [...project.paneSources];
    paneSources[index] = sectionId;
    studio.update({ ...project, paneSources });
  };
  const details = paneLabels[kind];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "dsh-studio-pane", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-pane-bar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: section?.name ?? `\u533A\u57DF ${index + 1}` }),
      project.sections.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { "aria-label": `\u533A\u57DF ${index + 1} \u9879\u76EE\u6765\u6E90`, value: section?.id, onChange: (event) => {
        setSection(event.target.value);
      }, children: project.sections.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: item.id, children: item.name }, item.id)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { "aria-label": `\u533A\u57DF ${index + 1} \u5185\u5BB9`, value: kind, onChange: (event) => {
        setKind(event.target.value);
      }, children: Object.entries(paneLabels).map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value, children: label.title }, value)) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-project-pane", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "glyph", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconSparkle16, { size: 18 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "eyebrow", children: project.kind === "generated" ? "AI \u751F\u6210\u9879\u76EE" : "\u672C\u5730\u9879\u76EE" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: details.title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
        details.description,
        section !== void 0 ? `\uFF0C\u6570\u636E\u8303\u56F4\u4E3A\u201C${section.name}\u201D` : "",
        "\u3002"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-pane-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => {
          onMode("analyze", kind === "report" ? "\u8BF7\u57FA\u4E8E\u5F53\u524D\u9879\u76EE\u5DF2\u6709\u6570\u636E\u548C\u4EA7\u7269\u5F62\u6210\u4E00\u4EFD\u603B\u7ED3\u62A5\u544A\u3002" : "\u8BF7\u8BFB\u53D6\u5F53\u524D\u9879\u76EE\uFF0C\u5148\u7ED9\u6211\u4E00\u4EFD\u7ED3\u6784\u3001\u73B0\u72B6\u548C\u5173\u952E\u6570\u636E\u7684\u5206\u6790\u3002");
        }, children: "\u4EA4\u7ED9 AI \u5206\u6790" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "secondary", onClick: () => {
          onMode("build");
        }, children: project.kind === "generated" ? "\u5F00\u59CB\u751F\u6210\u9879\u76EE" : "\u4FEE\u6539\u8FD9\u4E2A\u9879\u76EE" })
      ] })
    ] })
  ] });
}
function SplitSurface({ project, onMode }) {
  const [sizes, setSizes] = (0, import_react.useState)(() => Array.from({ length: paneCount(project.layout) }, () => 1 / paneCount(project.layout)));
  const surface = (0, import_react.useRef)(null);
  const vertical = project.layout === "vertical";
  (0, import_react.useEffect)(() => {
    const count = paneCount(project.layout);
    setSizes(Array.from({ length: count }, () => 1 / count));
  }, [project.layout]);
  const startResize = (event, dividerIndex) => {
    event.preventDefault();
    const rect = surface.current?.getBoundingClientRect();
    if (rect === void 0) return;
    const initial = vertical ? event.clientY : event.clientX;
    const extent = vertical ? rect.height : rect.width;
    const before = sizes[dividerIndex];
    const after = sizes[dividerIndex + 1];
    const onMove = (move) => {
      const delta = ((vertical ? move.clientY : move.clientX) - initial) / extent;
      const nextBefore = Math.max(0.16, Math.min(before + after - 0.16, before + delta));
      const next = [...sizes];
      next[dividerIndex] = nextBefore;
      next[dividerIndex + 1] = before + after - nextBefore;
      setSizes(next);
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: surface, className: `dsh-studio-surface${vertical ? " vertical" : ""}`, children: sizes.map((size, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "contents" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flexGrow: 0, flexShrink: 0, flexBasis: `${size * 100}%`, minWidth: 0, minHeight: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pane, { project, index, onMode }) }),
    index < sizes.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `dsh-studio-divider${vertical ? " row" : ""}`, onPointerDown: (event) => {
      startResize(event, index);
    } })
  ] }, index)) });
}
function findConversationRoot() {
  return document.querySelector("[data-conversation-scroll]")?.parentElement ?? null;
}
function StudioOverlay() {
  const state = useStudio();
  const project = state.projects.find((item) => item.id === state.activeId);
  const [sidebarRight, setSidebarRight] = (0, import_react.useState)(0);
  const [aiOpen, setAiOpen] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    setAiOpen(false);
  }, [project?.id]);
  (0, import_react.useLayoutEffect)(() => {
    if (project === void 0) return;
    const update = () => {
      const sidebar2 = document.querySelector("[data-dsh-studio-sidebar-root]");
      setSidebarRight(sidebar2?.getBoundingClientRect().right ?? 0);
    };
    update();
    const observer = new ResizeObserver(update);
    const sidebar = document.querySelector("[data-dsh-studio-sidebar-root]");
    if (sidebar !== null) observer.observe(sidebar);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [project?.id]);
  (0, import_react.useLayoutEffect)(() => {
    if (project === void 0) return;
    const root = findConversationRoot();
    if (root === null) return;
    root.setAttribute("data-dsh-studio-conversation", "");
    root.setAttribute("data-studio-open", String(aiOpen));
    return () => {
      root.removeAttribute("data-dsh-studio-conversation");
      root.removeAttribute("data-studio-open");
    };
  }, [project?.id, aiOpen]);
  if (project === void 0) return null;
  const changeLayout = (layout) => {
    studio.update({ ...project, layout, panes: panesFor(layout, project.panes) });
  };
  const handleMode = async (mode, prompt) => {
    try {
      const next = await openProjectMode(project, mode);
      setAiOpen(true);
      const sessionId = next.sessions[mode];
      if (prompt && sessionId) await promptIntoSession(sessionId, prompt);
    } catch (reason) {
      window.alert(reason instanceof Error ? reason.message : String(reason));
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { className: "dsh-studio-overlay", style: { left: sidebarRight }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { className: "dsh-studio-topbar", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "project-mark", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconSparkle16, { size: 15 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: project.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "path", children: project.launch === "web" ? "\u7F51\u9875\u9879\u76EE" : project.launch === "worktable" ? "\u5DE5\u4F5C\u53F0\u9879\u76EE" : project.kind === "generated" ? "AI \u521B\u5EFA\u9879\u76EE" : "DSH \u9879\u76EE" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-topbar-actions", children: [
          project.aiMode === "build" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-studio-layouts", "aria-label": "\u9879\u76EE\u5E03\u5C40", children: [
            ["single", "\u5355\u753B\u5E03"],
            ["dual", "\u53CC\u533A"],
            ["triple", "\u4E09\u680F"],
            ["vertical", "\u4E0A\u4E0B"]
          ].map(([layout, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: `dsh-studio-layout-button${project.layout === layout ? " active" : ""}`, onClick: () => {
            changeLayout(layout);
          }, children: label }, layout)) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: `dsh-studio-ai-toggle${aiOpen ? " active" : ""}`, type: "button", "aria-label": aiOpen ? "\u6536\u8D77 AI \u4FA7\u680F" : "\u5C55\u5F00 AI \u4FA7\u680F", title: aiOpen ? "\u6536\u8D77 AI \u4FA7\u680F" : "\u5C55\u5F00 AI \u4FA7\u680F", onClick: () => {
            if (aiOpen) setAiOpen(false);
            else void handleMode(project.aiMode);
          }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPanelLeftOutline16, { size: 17 }) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `dsh-studio-stage${aiOpen ? " ai-open" : ""}`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitSurface, { project, onMode: (mode, prompt) => {
        void handleMode(mode, prompt);
      } }) })
    ] }),
    aiOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", { className: "dsh-studio-ai-sidebar", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-ai-sidebar-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "AI \u52A9\u624B" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: project.name })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-studio-ai-modes", "aria-label": "AI \u5DE5\u4F5C\u6A21\u5F0F", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: project.aiMode === "analyze" ? "active" : "", onClick: () => {
          void handleMode("analyze");
        }, children: "\u5206\u6790" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: project.aiMode === "build" ? "active" : "", onClick: () => {
          void handleMode("build");
        }, children: "\u6784\u5EFA" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "close", type: "button", "aria-label": "\u6536\u8D77 AI \u4FA7\u680F", title: "\u6536\u8D77 AI \u4FA7\u680F", onClick: () => {
        setAiOpen(false);
      }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconCloseOutline16, { size: 14 }) })
    ] }) })
  ] });
}
var inject = ["slots", "theme", "sessions", "conversation", "workspaces", "uiWorkspace", "layout"];
function apply(ctx) {
  dshBridge = { sessions: ctx.sessions, conversation: ctx.conversation, workspaces: ctx.workspaces, uiWorkspace: ctx.uiWorkspace };
  nativeTheme = ctx.theme;
  const syncTheme = (themeSnapshot = ctx.theme.getTheme()) => {
    const theme = themeSnapshot.active.colorScheme;
    if (studio.getSnapshot().theme !== theme) studio.setTheme(theme);
  };
  syncTheme();
  ctx.on("theme/change", syncTheme);
  ctx.effect(() => () => {
    nativeTheme = null;
    dshBridge = null;
  }, "dsh-personal-studio: native bridges");
  ctx.effect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-dsh-plugin", "dsh-personal-studio");
    style.textContent = styles;
    document.head.appendChild(style);
    return () => {
      style.remove();
      document.documentElement.removeAttribute("data-dsh-studio-active");
      document.documentElement.removeAttribute("data-dsh-studio-theme");
    };
  }, "dsh-personal-studio: styles");
  ctx.slots.inject("sidebar", () => ctx.slots.register({
    name: "sidebar",
    priority: -10,
    children: {
      "sidebar.brand.mark": { kind: "single", scope: "root" },
      "sidebar.brand.name": { kind: "single", scope: "root" },
      "sidebar.workspaces": { kind: "single", scope: "root" },
      "sidebar.settings": { kind: "single", scope: "root" },
      "sidebar.footer.action": { kind: "list", scope: "root" }
    },
    inject: () => ({
      startSession: (workspaceId) => {
        ctx.uiWorkspace.startSession(workspaceId);
      },
      toggleSidebar: () => {
        ctx.layout.toggleSidebar();
      }
    })
  }, PersonalSidebar), "dsh-personal-studio: sidebar shell");
  ctx.slots.inject("sidebar.brand.mark", () => ctx.slots.register({ name: "sidebar.brand.mark", priority: -10 }, StudioMark), "dsh-personal-studio: sidebar brand mark");
  ctx.slots.inject("sidebar.brand.name", () => ctx.slots.register({ name: "sidebar.brand.name", priority: -10 }, SidebarBrandName), "dsh-personal-studio: sidebar brand name");
  ctx.slots.inject("conversation.hero.brand.mark", () => ctx.slots.register({ name: "conversation.hero.brand.mark", priority: -10 }, HeroBrandMark), "dsh-personal-studio: hero brand mark");
  ctx.slots.inject("shell.overlay", () => ctx.slots.register({
    name: "shell.overlay",
    id: "dsh-personal-studio-overlay",
    order: 100
  }, StudioOverlay), "dsh-personal-studio: overlay");
}
return module.exports; } });
