import {
  useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore,
} from 'react'
import {
  IconChevronDownOutline14,
  IconChevronRightOutline14,
  IconCloseOutline16,
  IconEditOutline16,
  IconFolderClose16,
  IconDarkOutline16,
  IconLightOutline16,
  IconPanelLeftOutline16,
  IconPlusOutline16,
  IconSparkle16,
  IconTrashOutline16,
} from '@deepseek-ai/dsh-client-ui-primitives'

type Layout = 'single' | 'dual' | 'triple' | 'vertical'
type Theme = 'dark' | 'light'
type ProjectKind = 'attached' | 'generated'
type AiMode = 'analyze' | 'build'
type PaneKind = 'overview' | 'files' | 'data' | 'report'

type Project = {
  id: string
  name: string
  layout: Layout
  kind: ProjectKind
  workspaceId: string
  path: string
  panes: PaneKind[]
  aiMode: AiMode
  sessions: Partial<Record<AiMode, string>>
}

type StudioState = {
  projects: Project[]
  activeId: string | null
  theme: Theme
}

const STORAGE_KEY = 'dsh.personal-studio.projects.v1'
const THEME_KEY = 'dsh.personal-studio.theme.v1'

function loadProjects(): Project[] {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(value)) return []
    return value.map((item: any) => ({
      id: String(item.id ?? projectId()),
      name: String(item.name ?? '未命名项目'),
      layout: (['single', 'dual', 'triple', 'vertical'].includes(item.layout) ? item.layout : 'single') as Layout,
      kind: item.kind === 'generated' ? 'generated' : 'attached',
      workspaceId: String(item.workspaceId ?? ''),
      path: String(item.path ?? ''),
      panes: Array.isArray(item.panes) ? item.panes : ['overview'],
      aiMode: item.aiMode === 'build' ? 'build' : 'analyze',
      sessions: item.sessions && typeof item.sessions === 'object' ? item.sessions : {},
    })).filter((item: Project) => item.workspaceId !== '' && item.path !== '')
  } catch {
    return []
  }
}

function loadTheme(): Theme {
  if (document.body.hasAttribute('data-ds-dark-theme')) return 'dark'
  return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'
}

let snapshot: StudioState = { projects: loadProjects(), activeId: null, theme: loadTheme() }
const listeners = new Set<() => void>()

function commit(next: StudioState): void {
  snapshot = next
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next.projects))
  localStorage.setItem(THEME_KEY, next.theme)
  listeners.forEach(listener => { listener() })
}

const studio = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => { listeners.delete(listener) }
  },
  getSnapshot() { return snapshot },
  setActive(activeId: string | null) { commit({ ...snapshot, activeId }) },
  setTheme(theme: Theme) { commit({ ...snapshot, theme }) },
  add(project: Project) {
    commit({ ...snapshot, projects: [...snapshot.projects, project], activeId: project.id })
  },
  update(project: Project) {
    commit({ ...snapshot, projects: snapshot.projects.map(item => item.id === project.id ? project : item) })
  },
  remove(id: string) {
    commit({
      ...snapshot,
      projects: snapshot.projects.filter(project => project.id !== id),
      activeId: snapshot.activeId === id ? null : snapshot.activeId,
    })
  },
}

let nativeTheme: { setTheme: (theme: Theme) => void } | null = null

function setTheme(theme: Theme): void {
  if (nativeTheme !== null) nativeTheme.setTheme(theme)
  else studio.setTheme(theme)
}

function useStudio(): StudioState {
  return useSyncExternalStore(studio.subscribe, studio.getSnapshot, studio.getSnapshot)
}

function projectId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `project-${Date.now()}`
}

function paneCount(layout: Layout): number {
  if (layout === 'single') return 1
  if (layout === 'triple') return 3
  return 2
}

function panesFor(layout: Layout, panes: PaneKind[]): PaneKind[] {
  const count = paneCount(layout)
  const defaults: PaneKind[] = ['overview', 'files', 'data']
  return Array.from({ length: count }, (_, index) => panes[index] ?? defaults[index] ?? 'report')
}

let dshBridge: { sessions: any; conversation: any; workspaces: any } | null = null

function listWorkspaces(): { id: string; title: string; path: string }[] {
  try {
    const items = dshBridge?.workspaces?.list?.getSnapshot?.()?.items ?? []
    return items.map((item: any) => ({
      id: String(item.workspaceId ?? item.id ?? ''),
      title: String(item.title ?? item.path ?? '未命名工作区'),
      path: String(item.path ?? ''),
    })).filter((item: any) => item.id && item.path)
  } catch { return [] }
}

async function promptIntoSession(sessionId: string, text: string): Promise<void> {
  const bridge = dshBridge
  if (bridge === null) throw new Error('AI 会话服务不可用')
  let session: any = null
  for (let attempt = 0; attempt < 10; attempt += 1) {
    session = bridge.sessions?.binding?.(sessionId)?.session ?? null
    if (session !== null) break
    await new Promise(resolve => { setTimeout(resolve, 150) })
  }
  if (session !== null && typeof bridge.conversation?.sendSession === 'function') {
    await bridge.conversation.sendSession(session, text, [], 'queue')
    return
  }
  if (session !== null && typeof session.prompt === 'function') {
    const result = await session.prompt([{ type: 'text', text }], 'queue')
    if (result?.ok !== false) return
  }
  throw new Error('无法连接项目 AI 会话')
}

function modePrompt(project: Project, mode: AiMode): string {
  const boundary = `项目名称：${project.name}\n项目根目录：${project.path}`
  if (mode === 'analyze') {
    return `【项目分析模式】\n${boundary}\n请把当前工作区视为唯一项目数据边界。默认只读取项目文件、数据产物和版本状态，先不要修改文件。你可以为我总结、分析、核对和形成报告。请简短确认已进入分析模式。`
  }
  return `【项目构建模式】\n${boundary}\n请把当前工作区视为唯一项目数据边界。你可以按我的后续要求生成新项目，或修改已接入项目；动手前先检查现有结构，所有写入仅限此目录。请简短确认已进入构建模式。`
}

async function openProjectMode(project: Project, mode: AiMode): Promise<Project> {
  if (dshBridge === null || typeof dshBridge.sessions?.create !== 'function') return project
  let sessionId = project.sessions[mode]
  if (!sessionId) {
    sessionId = await dshBridge.sessions.create({ workspaceId: project.workspaceId })
    const next = { ...project, aiMode: mode, sessions: { ...project.sessions, [mode]: sessionId } }
    studio.update(next)
    await dshBridge.sessions.open?.(sessionId)
    await promptIntoSession(sessionId, modePrompt(next, mode))
    return next
  }
  const next = { ...project, aiMode: mode }
  studio.update(next)
  await dshBridge.sessions.open?.(sessionId)
  return next
}

const styles = String.raw`
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
.dsh-studio-layouts { margin-left: auto; display: flex; gap: 4px; padding-right: 426px; transition: padding 220ms ease; }
.dsh-studio-layouts.chat-minimized { padding-right: 50px; }
.dsh-studio-layout-button { height: 28px; padding: 0 10px; border: 0; border-radius: 8px; background: transparent; color: #647a8e; font-size: 10px; cursor: pointer; }
.dsh-studio-layout-button:hover { background: rgba(74,143,196,.09); color: #aac2d7; }
.dsh-studio-layout-button.active { background: rgba(75,168,255,.14); color: #76bdff; }

.dsh-studio-stage {
  position: absolute;
  inset: 58px 0 0;
  z-index: 1;
  padding: 18px 426px 18px 18px;
  transition: padding-right 220ms cubic-bezier(.2,.8,.2,1);
}
.dsh-studio-stage.chat-minimized { padding-right: 18px; }
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
  top: 70px !important;
  right: 22px !important;
  bottom: 18px !important;
  left: auto !important;
  width: 386px !important;
  height: auto !important;
  min-width: 320px !important;
  overflow: hidden !important;
  border: 1px solid rgba(96,166,220,.2) !important;
  border-radius: 18px !important;
  background: rgba(6,14,23,.96) !important;
  box-shadow: 0 30px 90px rgba(0,0,0,.52), 0 0 0 1px rgba(75,168,255,.035) inset !important;
  transition: opacity 180ms ease, transform 220ms cubic-bezier(.2,.8,.2,1) !important;
}
html[data-dsh-studio-active] [data-dsh-studio-conversation][data-studio-minimized="true"] { opacity: 0 !important; transform: translateY(16px) scale(.97) !important; pointer-events: none !important; }

.dsh-studio-chat-toolbar {
  position: fixed;
  z-index: 96;
  top: 18px;
  right: 22px;
  width: 386px;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 9px;
  box-sizing: border-box;
  padding: 0 9px 0 13px;
  border: 1px solid rgba(96,166,220,.16);
  border-radius: 13px;
  background: rgba(7,16,26,.92);
  color: #98aec2;
  box-shadow: 0 15px 45px rgba(0,0,0,.34);
  backdrop-filter: blur(18px);
  cursor: grab;
}
.dsh-studio-chat-toolbar:active { cursor: grabbing; }
.dsh-studio-chat-toolbar strong { flex: 1; color: #c7d9e9; font-size: 11px; font-weight: 560; }
.dsh-studio-chat-toolbar .status { width: 6px; height: 6px; border-radius: 50%; background: #57b1ff; box-shadow: 0 0 10px rgba(87,177,255,.7); }
.dsh-studio-chat-toolbar button { width: 27px; height: 27px; display: grid; place-items: center; border: 0; border-radius: 8px; background: transparent; color: #70869a; cursor: pointer; }
.dsh-studio-chat-toolbar button:hover { background: rgba(83,151,203,.12); color: #cae1f4; }
.dsh-studio-ai-modes { display: flex; gap: 2px; padding: 2px; border-radius: 8px; background: rgba(64,113,151,.1); }
.dsh-studio-chat-toolbar .dsh-studio-ai-modes button { width: auto; height: 23px; padding: 0 8px; border-radius: 6px; color: #6e8498; font-size: 9px; }
.dsh-studio-chat-toolbar .dsh-studio-ai-modes button.active { background: rgba(75,168,255,.16); color: #79c2ff; }
.dsh-studio-chat-chip { position: fixed; right: 22px; bottom: 22px; z-index: 96; height: 42px; display: flex; align-items: center; gap: 9px; padding: 0 14px; border: 1px solid rgba(96,166,220,.2); border-radius: 14px; background: rgba(7,16,26,.95); color: #cbe4f8; box-shadow: 0 18px 45px rgba(0,0,0,.42); cursor: pointer; }
.dsh-studio-chat-chip svg { color: #5db2f8; }

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
  border-color: rgba(43,99,140,.16) !important;
  background: rgba(255,255,255,.97) !important;
  box-shadow: 0 30px 80px rgba(40,59,74,.17), 0 0 0 1px rgba(28,112,171,.025) inset !important;
}
html[data-dsh-studio-theme="light"] .dsh-studio-chat-toolbar {
  border-color: rgba(43,99,140,.15);
  background: rgba(255,255,255,.94);
  color: #667989;
  box-shadow: 0 15px 42px rgba(40,59,74,.14);
}
html[data-dsh-studio-theme="light"] .dsh-studio-chat-toolbar strong { color: #304759; }
html[data-dsh-studio-theme="light"] .dsh-studio-chat-toolbar .status { background: #2786c8; box-shadow: 0 0 9px rgba(39,134,200,.35); }
html[data-dsh-studio-theme="light"] .dsh-studio-chat-toolbar button { color: #758694; }
html[data-dsh-studio-theme="light"] .dsh-studio-chat-toolbar button:hover { background: rgba(35,111,166,.075); color: #285d84; }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-modes { background: rgba(35,111,166,.055); }
html[data-dsh-studio-theme="light"] .dsh-studio-chat-toolbar .dsh-studio-ai-modes button.active { background: rgba(23,118,188,.1); color: #176ea9; }
html[data-dsh-studio-theme="light"] .dsh-studio-chat-chip {
  border-color: rgba(43,99,140,.16);
  background: rgba(255,255,255,.96);
  color: #31546e;
  box-shadow: 0 18px 45px rgba(40,59,74,.15);
}
html[data-dsh-studio-theme="light"] .dsh-studio-chat-chip svg { color: #2786c8; }

@media (max-width: 1050px) {
  .dsh-studio-stage { padding-right: 340px; }
  .dsh-studio-layouts { padding-right: 340px; }
  .dsh-studio-chat-toolbar { width: 304px; }
  html[data-dsh-studio-active] [data-dsh-studio-conversation] { width: 304px !important; min-width: 280px !important; }
}
`

function findSidebarRoot(node: HTMLElement): HTMLElement | null {
  let current: HTMLElement | null = node
  while (current !== null) {
    const rect = current.getBoundingClientRect()
    if (rect.height > window.innerHeight * .8 && rect.width > 48 && rect.width < 420) return current
    current = current.parentElement
  }
  return null
}

function ProjectDialog({
  project,
  onClose,
}: {
  project?: Project
  onClose: () => void
}) {
  const [name, setName] = useState(project?.name ?? '')
  const [layout, setLayout] = useState<Layout>(project?.layout ?? 'single')
  const [kind, setKind] = useState<ProjectKind>(project?.kind ?? 'attached')
  const workspaces = listWorkspaces()
  const [workspaceId, setWorkspaceId] = useState(project?.workspaceId ?? workspaces[0]?.id ?? '')
  const [folderName, setFolderName] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const save = async () => {
    setSaving(true)
    setError('')
    try {
      const parent = workspaces.find(item => item.id === workspaceId)
      if (parent === undefined) throw new Error('请先在 DSH 工作区中添加一个本地目录')
      let binding = parent
      if (project === undefined && kind === 'generated') {
        const folder = folderName.trim().replace(/^[\\/]+|[\\/]+$/g, '')
        if (!folder) throw new Error('请输入新项目文件夹名称')
        const path = `${parent.path.replace(/[\\/]+$/, '')}/${folder}`
        const response = await fetch('/api/personal-studio/projects/create', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ parent: parent.path, name: folder }),
        })
        const body = await response.json()
        if (!response.ok || !body?.ok) throw new Error(body?.error ?? '无法创建项目目录')
        const created = await dshBridge?.workspaces?.create?.({ path })
        const createdId = created?.workspaceId ?? created?.id
        if (!createdId) throw new Error('项目目录已创建，但无法注册为 DSH 工作区')
        binding = { id: String(createdId), title: name.trim(), path }
      }
      const next: Project = {
        id: project?.id ?? projectId(),
        name: name.trim(),
        layout,
        kind,
        workspaceId: project === undefined ? binding.id : project.workspaceId,
        path: project === undefined ? binding.path : project.path,
        panes: panesFor(layout, project?.panes ?? ['overview']),
        aiMode: project?.aiMode ?? (kind === 'generated' ? 'build' : 'analyze'),
        sessions: project?.sessions ?? {},
      }
      if (project === undefined) studio.add(next)
      else studio.update(next)
      onClose()
      await openProjectMode(next, next.aiMode)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason))
    } finally { setSaving(false) }
  }
  return (
    <div className="dsh-studio-dialog-backdrop" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <div className="dsh-studio-dialog" role="dialog" aria-modal="true" aria-label={project ? '编辑项目' : '新建项目'}>
        <div className="dsh-studio-dialog-head">
          <h2>{project ? '编辑项目' : '新建项目'}</h2>
          <button className="dsh-studio-icon-button" type="button" aria-label="关闭" onClick={onClose}><IconCloseOutline16 /></button>
        </div>
        <div className="dsh-studio-field">
          <label htmlFor="studio-project-name">项目名称</label>
          <input id="studio-project-name" autoFocus value={name} onChange={event => { setName(event.target.value) }} placeholder="例如：我的分析项目" />
        </div>
        <div className="dsh-studio-field">
          <label htmlFor="studio-project-kind">接入方式</label>
          <select id="studio-project-kind" value={kind} disabled={project !== undefined} onChange={event => { setKind(event.target.value as ProjectKind) }}>
            <option value="attached">接入本地项目</option>
            <option value="generated">AI 创建新项目</option>
          </select>
        </div>
        {project === undefined && (
          <div className="dsh-studio-field">
            <label htmlFor="studio-project-workspace">{kind === 'attached' ? '选择已添加的 DSH 工作区' : '选择新项目的父工作区'}</label>
            <select id="studio-project-workspace" value={workspaceId} onChange={event => { setWorkspaceId(event.target.value) }}>
              {workspaces.length === 0 && <option value="">暂无可用工作区</option>}
              {workspaces.map(item => <option key={item.id} value={item.id}>{item.title} — {item.path}</option>)}
            </select>
          </div>
        )}
        {project === undefined && kind === 'generated' && (
          <div className="dsh-studio-field">
            <label htmlFor="studio-project-folder">新项目文件夹</label>
            <input id="studio-project-folder" value={folderName} onChange={event => { setFolderName(event.target.value) }} placeholder="例如：my-new-project" />
          </div>
        )}
        {project !== undefined && <div className="dsh-studio-project-binding"><span>本地项目</span><strong>{project.path}</strong></div>}
        {error !== '' && <div className="dsh-studio-dialog-error">{error}</div>}
        <div className="dsh-studio-field">
          <label htmlFor="studio-project-layout">初始视图</label>
          <select id="studio-project-layout" value={layout} onChange={event => { setLayout(event.target.value as Layout) }}>
            <option value="single">单画布</option>
            <option value="dual">左右双区</option>
            <option value="triple">三栏视图</option>
            <option value="vertical">上下双区</option>
          </select>
        </div>
        <div className="dsh-studio-dialog-actions">
          <button className="dsh-studio-button" type="button" onClick={onClose}>取消</button>
          <button className="dsh-studio-button primary" type="button" disabled={saving || name.trim() === '' || workspaceId === ''} onClick={() => { void save() }}>{saving ? '正在连接…' : '保存项目'}</button>
        </div>
      </div>
    </div>
  )
}

function SidebarSection({ wide }: { wide: boolean }) {
  const state = useStudio()
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState<{ x: number; y: number; project?: Project } | null>(null)
  const [editing, setEditing] = useState<Project | undefined | false>(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const node = rootRef.current
    if (node === null) return
    const sidebarRoot = findSidebarRoot(node)
    if (sidebarRoot === null) return
    sidebarRoot.setAttribute('data-dsh-studio-sidebar-root', '')
    const nativeRegion = sidebarRoot.children.item(sidebarRoot.children.length - 2) as HTMLElement | null
    const footArea = sidebarRoot.lastElementChild as HTMLElement | null
    const footerActions = footArea?.firstElementChild as HTMLElement | null
    nativeRegion?.setAttribute('data-dsh-studio-native-region', '')
    footArea?.setAttribute('data-dsh-studio-foot-area', '')
    footerActions?.setAttribute('data-dsh-studio-footer-actions', '')
    const onWorkspace = (event: MouseEvent) => {
      if (studio.getSnapshot().activeId === null || nativeRegion === null) return
      const rect = nativeRegion.getBoundingClientRect()
      if (event.clientY <= rect.top + 46) {
        studio.setActive(null)
        setOpen(false)
      }
    }
    nativeRegion?.addEventListener('click', onWorkspace, true)
    return () => {
      nativeRegion?.removeEventListener('click', onWorkspace, true)
      nativeRegion?.removeAttribute('data-dsh-studio-native-region')
      footArea?.removeAttribute('data-dsh-studio-foot-area')
      footerActions?.removeAttribute('data-dsh-studio-footer-actions')
      sidebarRoot.removeAttribute('data-dsh-studio-sidebar-root')
    }
  }, [wide])

  useEffect(() => {
    if (state.activeId !== null) setOpen(true)
    document.documentElement.toggleAttribute('data-dsh-studio-active', state.activeId !== null)
    return () => { document.documentElement.removeAttribute('data-dsh-studio-active') }
  }, [state.activeId])

  useEffect(() => {
    document.documentElement.setAttribute('data-dsh-studio-theme', state.theme)
  }, [state.theme])

  useEffect(() => {
    if (menu === null) return
    const close = () => { setMenu(null) }
    window.addEventListener('pointerdown', close)
    return () => { window.removeEventListener('pointerdown', close) }
  }, [menu])

  if (!wide) {
    return (
      <div ref={rootRef} className="dsh-studio-sidebar" data-dsh-personal-studio-sidebar="">
        <button className="dsh-studio-rail-button" type="button" aria-label="我的项目" onClick={() => {
          setOpen(true)
          const sidebarRoot = rootRef.current === null ? null : findSidebarRoot(rootRef.current)
          sidebarRoot?.querySelector<HTMLButtonElement>('button')?.click()
        }}>
          <IconFolderClose16 size={18} />
        </button>
      </div>
    )
  }

  const showContext = (event: React.MouseEvent, project?: Project) => {
    event.preventDefault()
    event.stopPropagation()
    setMenu({ x: event.clientX, y: event.clientY, project })
  }

  return (
    <div ref={rootRef} className="dsh-studio-sidebar" data-dsh-personal-studio-sidebar="">
      <div className="dsh-studio-section-head" onContextMenu={event => { showContext(event) }} onClick={() => { setOpen(value => !value) }}>
        {open ? <IconChevronDownOutline14 /> : <IconChevronRightOutline14 />}
        <IconFolderClose16 size={15} />
        <strong>我的项目</strong>
        <span className="hint">右键新建</span>
        <button
          className="dsh-studio-theme-button"
          type="button"
          aria-label={state.theme === 'dark' ? '切换为浅色界面' : '切换为深色界面'}
          title={state.theme === 'dark' ? '浅色界面' : '深色界面'}
          onClick={event => {
            event.stopPropagation()
            setTheme(state.theme === 'dark' ? 'light' : 'dark')
          }}
          onContextMenu={event => { event.stopPropagation() }}
        >
          {state.theme === 'dark' ? <IconLightOutline16 size={15} /> : <IconDarkOutline16 size={15} />}
        </button>
      </div>
      {open && (
        <div className="dsh-studio-projects">
          {state.projects.length === 0 && <div className="dsh-studio-empty">这里暂时是空的<br />在“我的项目”上右键新建</div>}
          {state.projects.map(project => (
            <button
              key={project.id}
              type="button"
              className={`dsh-studio-project-row${state.activeId === project.id ? ' active' : ''}`}
              onClick={() => { studio.setActive(project.id); void openProjectMode(project, project.aiMode) }}
              onContextMenu={event => { showContext(event, project) }}
            >
              <IconSparkle16 size={14} />
              <span>{project.name}</span>
              <small>{project.layout}</small>
            </button>
          ))}
        </div>
      )}
      {menu !== null && (
        <div className="dsh-studio-menu" style={{ left: menu.x, top: menu.y }} onPointerDown={event => { event.stopPropagation() }}>
          {menu.project === undefined ? (
            <button type="button" onClick={() => { setMenu(null); setEditing(undefined) }}><IconPlusOutline16 />新建项目</button>
          ) : (
            <>
              <button type="button" onClick={() => { setMenu(null); setEditing(menu.project) }}><IconEditOutline16 />编辑项目</button>
              <button className="danger" type="button" onClick={() => { studio.remove(menu.project!.id); setMenu(null) }}><IconTrashOutline16 />删除项目</button>
            </>
          )}
        </div>
      )}
      {editing !== false && <ProjectDialog project={editing} onClose={() => { setEditing(false) }} />}
    </div>
  )
}

function KineticGrid({ theme }: { theme: Theme }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (canvas === null) return
    const context = canvas.getContext('2d')
    if (context === null) return
    let frame = 0
    let raf = 0
    const draw = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2)
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      if (canvas.width !== width * scale || canvas.height !== height * scale) {
        canvas.width = width * scale
        canvas.height = height * scale
      }
      context.setTransform(scale, 0, 0, scale, 0, 0)
      context.clearRect(0, 0, width, height)
      context.lineWidth = 1
      const drift = Math.sin(frame / 180) * 14
      for (let x = -80; x < width + 120; x += 48) {
        context.beginPath()
        context.moveTo(x, 0)
        context.bezierCurveTo(x + 12 + drift, height * .28, x - 22 - drift, height * .72, x + 8, height)
        context.strokeStyle = theme === 'light'
          ? (x % 192 === 0 ? 'rgba(35,117,176,.11)' : 'rgba(52,105,143,.045)')
          : (x % 192 === 0 ? 'rgba(53,151,226,.13)' : 'rgba(45,118,174,.055)')
        context.stroke()
      }
      for (let y = 10; y < height + 60; y += 48) {
        context.beginPath()
        context.moveTo(0, y)
        context.bezierCurveTo(width * .3, y - 10 - drift, width * .72, y + 18 + drift, width, y - 4)
        context.strokeStyle = theme === 'light'
          ? (y % 192 === 10 ? 'rgba(35,117,176,.1)' : 'rgba(52,105,143,.04)')
          : (y % 192 === 10 ? 'rgba(53,151,226,.12)' : 'rgba(45,118,174,.05)')
        context.stroke()
      }
      frame += 1
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf) }
  }, [theme])
  return <canvas ref={ref} className="dsh-studio-grid" aria-hidden="true" />
}

const paneLabels: Record<PaneKind, { title: string; description: string }> = {
  overview: { title: '项目概览', description: '项目路径、状态与 AI 工作入口' },
  files: { title: '文件与代码', description: '由项目 AI 读取、检索或修改当前工作区文件' },
  data: { title: '数据与产物', description: '分析项目生成的数据、日志、表格和其他产物' },
  report: { title: '总结与报告', description: '把项目数据整理为结论、风险与下一步行动' },
}

function Pane({ project, index, onMode }: { project: Project; index: number; onMode: (mode: AiMode, prompt?: string) => void }) {
  const kind = project.panes[index] ?? 'overview'
  const setKind = (nextKind: PaneKind) => {
    const panes = panesFor(project.layout, project.panes)
    panes[index] = nextKind
    studio.update({ ...project, panes })
  }
  const details = paneLabels[kind]
  return (
    <section className="dsh-studio-pane">
      <div className="dsh-studio-pane-bar">
        <span>区域 {index + 1}</span>
        <select aria-label={`区域 ${index + 1} 内容`} value={kind} onChange={event => { setKind(event.target.value as PaneKind) }}>
          {Object.entries(paneLabels).map(([value, label]) => <option key={value} value={value}>{label.title}</option>)}
        </select>
      </div>
      <div className="dsh-studio-project-pane">
        <span className="glyph"><IconSparkle16 size={18} /></span>
        <div className="eyebrow">{project.kind === 'generated' ? 'AI 生成项目' : '本地项目'}</div>
        <strong>{details.title}</strong>
        <p>{details.description}</p>
        <code>{project.path}</code>
        <div className="dsh-studio-pane-actions">
          <button type="button" onClick={() => { onMode('analyze', kind === 'report' ? '请基于当前项目已有数据和产物形成一份总结报告。' : '请读取当前项目，先给我一份结构、现状和关键数据的分析。') }}>交给 AI 分析</button>
          <button type="button" className="secondary" onClick={() => { onMode('build') }}>{project.kind === 'generated' ? '开始生成项目' : '修改这个项目'}</button>
        </div>
      </div>
    </section>
  )
}

function SplitSurface({ project, onMode }: { project: Project; onMode: (mode: AiMode, prompt?: string) => void }) {
  const [sizes, setSizes] = useState(() => Array.from({ length: paneCount(project.layout) }, () => 1 / paneCount(project.layout)))
  const surface = useRef<HTMLDivElement>(null)
  const vertical = project.layout === 'vertical'
  useEffect(() => {
    const count = paneCount(project.layout)
    setSizes(Array.from({ length: count }, () => 1 / count))
  }, [project.layout])

  const startResize = (event: React.PointerEvent, dividerIndex: number) => {
    event.preventDefault()
    const rect = surface.current?.getBoundingClientRect()
    if (rect === undefined) return
    const initial = vertical ? event.clientY : event.clientX
    const extent = vertical ? rect.height : rect.width
    const before = sizes[dividerIndex]
    const after = sizes[dividerIndex + 1]
    const onMove = (move: PointerEvent) => {
      const delta = ((vertical ? move.clientY : move.clientX) - initial) / extent
      const nextBefore = Math.max(.16, Math.min(before + after - .16, before + delta))
      const next = [...sizes]
      next[dividerIndex] = nextBefore
      next[dividerIndex + 1] = before + after - nextBefore
      setSizes(next)
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  return (
    <div ref={surface} className={`dsh-studio-surface${vertical ? ' vertical' : ''}`}>
      {sizes.map((size, index) => (
        <div key={index} style={{ display: 'contents' }}>
          <div style={{ flexGrow: 0, flexShrink: 0, flexBasis: `${size * 100}%`, minWidth: 0, minHeight: 0 }}><Pane project={project} index={index} onMode={onMode} /></div>
          {index < sizes.length - 1 && <div className={`dsh-studio-divider${vertical ? ' row' : ''}`} onPointerDown={event => { startResize(event, index) }} />}
        </div>
      ))}
    </div>
  )
}

function findConversationRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-conversation-scroll]')?.parentElement ?? null
}

function StudioOverlay() {
  const state = useStudio()
  const project = state.projects.find(item => item.id === state.activeId)
  const [sidebarRight, setSidebarRight] = useState(0)
  const [chatMinimized, setChatMinimized] = useState(false)
  const [chatPosition, setChatPosition] = useState<{ x: number; y: number } | null>(null)

  useLayoutEffect(() => {
    if (project === undefined) return
    const update = () => {
      const sidebar = document.querySelector<HTMLElement>('[data-dsh-studio-sidebar-root]')
      setSidebarRight(sidebar?.getBoundingClientRect().right ?? 0)
    }
    update()
    const observer = new ResizeObserver(update)
    const sidebar = document.querySelector<HTMLElement>('[data-dsh-studio-sidebar-root]')
    if (sidebar !== null) observer.observe(sidebar)
    window.addEventListener('resize', update)
    return () => { observer.disconnect(); window.removeEventListener('resize', update) }
  }, [project?.id])

  useLayoutEffect(() => {
    if (project === undefined) return
    const root = findConversationRoot()
    if (root === null) return
    root.setAttribute('data-dsh-studio-conversation', '')
    root.setAttribute('data-studio-minimized', String(chatMinimized))
    if (chatPosition !== null && !chatMinimized) {
      root.style.setProperty('left', `${chatPosition.x}px`, 'important')
      root.style.setProperty('top', `${chatPosition.y + 52}px`, 'important')
      root.style.setProperty('right', 'auto', 'important')
      root.style.setProperty('bottom', '18px', 'important')
    } else {
      root.style.removeProperty('left')
      root.style.removeProperty('top')
      root.style.removeProperty('right')
      root.style.removeProperty('bottom')
    }
    return () => {
      root.removeAttribute('data-dsh-studio-conversation')
      root.removeAttribute('data-studio-minimized')
      for (const property of ['left', 'top', 'right', 'bottom']) root.style.removeProperty(property)
    }
  }, [project?.id, chatMinimized, chatPosition])

  if (project === undefined) return null

  const changeLayout = (layout: Layout) => {
    studio.update({ ...project, layout, panes: panesFor(layout, project.panes) })
  }
  const handleMode = async (mode: AiMode, prompt?: string) => {
    try {
      const next = await openProjectMode(project, mode)
      setChatMinimized(false)
      const sessionId = next.sessions[mode]
      if (prompt && sessionId) await promptIntoSession(sessionId, prompt)
    } catch (reason) {
      window.alert(reason instanceof Error ? reason.message : String(reason))
    }
  }
  const dragChat = (event: React.PointerEvent) => {
    if ((event.target as HTMLElement).closest('button') !== null) return
    event.preventDefault()
    const toolbar = event.currentTarget.getBoundingClientRect()
    const offsetX = event.clientX - toolbar.left
    const offsetY = event.clientY - toolbar.top
    const onMove = (move: PointerEvent) => {
      setChatPosition({
        x: Math.max(sidebarRight + 18, Math.min(window.innerWidth - toolbar.width - 18, move.clientX - offsetX)),
        y: Math.max(12, Math.min(window.innerHeight - 180, move.clientY - offsetY)),
      })
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }
  const toolbarStyle = chatPosition === null ? undefined : { left: chatPosition.x, top: chatPosition.y, right: 'auto' }

  return (
    <>
      <main className="dsh-studio-overlay" style={{ left: sidebarRight }}>
        <KineticGrid theme={state.theme} />
        <header className="dsh-studio-topbar">
          <span className="project-mark"><IconSparkle16 size={15} /></span>
          <div>
            <h1>{project.name}</h1>
            <span className="path">{project.path}</span>
          </div>
          <div className={`dsh-studio-layouts${chatMinimized ? ' chat-minimized' : ''}`} aria-label="项目布局">
            <button
              type="button"
              className="dsh-studio-theme-button"
              aria-label={state.theme === 'dark' ? '切换为浅色界面' : '切换为深色界面'}
              title={state.theme === 'dark' ? '浅色界面' : '深色界面'}
              onClick={() => { setTheme(state.theme === 'dark' ? 'light' : 'dark') }}
            >
              {state.theme === 'dark' ? <IconLightOutline16 size={15} /> : <IconDarkOutline16 size={15} />}
            </button>
            {([
              ['single', '单画布'], ['dual', '双区'], ['triple', '三栏'], ['vertical', '上下'],
            ] as const).map(([layout, label]) => (
              <button key={layout} type="button" className={`dsh-studio-layout-button${project.layout === layout ? ' active' : ''}`} onClick={() => { changeLayout(layout) }}>{label}</button>
            ))}
          </div>
        </header>
        <div className={`dsh-studio-stage${chatMinimized ? ' chat-minimized' : ''}`}>
          <SplitSurface project={project} onMode={(mode, prompt) => { void handleMode(mode, prompt) }} />
        </div>
      </main>
      {!chatMinimized ? (
        <div className="dsh-studio-chat-toolbar" style={toolbarStyle} onPointerDown={dragChat}>
          <span className="status" />
          <strong>{project.name}</strong>
          <div className="dsh-studio-ai-modes" aria-label="AI 工作模式">
            <button type="button" className={project.aiMode === 'analyze' ? 'active' : ''} onClick={() => { void handleMode('analyze') }}>分析</button>
            <button type="button" className={project.aiMode === 'build' ? 'active' : ''} onClick={() => { void handleMode('build') }}>构建</button>
          </div>
          {chatPosition !== null && <button type="button" aria-label="停靠右侧" title="停靠右侧" onClick={() => { setChatPosition(null) }}><IconPanelLeftOutline16 size={14} /></button>}
          <button type="button" aria-label="最小化 AI" title="最小化" onClick={() => { setChatMinimized(true) }}><IconChevronDownOutline14 /></button>
        </div>
      ) : (
        <button className="dsh-studio-chat-chip" type="button" onClick={() => { setChatMinimized(false) }}><IconSparkle16 size={15} />AI 协作</button>
      )}
    </>
  )
}

export const inject = ['slots', 'theme', 'sessions', 'conversation', 'workspaces']

export function apply(ctx: any): void {
  dshBridge = { sessions: ctx.sessions, conversation: ctx.conversation, workspaces: ctx.workspaces }
  nativeTheme = ctx.theme
  const syncTheme = (themeSnapshot = ctx.theme.getTheme()) => {
    const theme = themeSnapshot.active.colorScheme as Theme
    if (studio.getSnapshot().theme !== theme) studio.setTheme(theme)
  }
  syncTheme()
  ctx.on('theme/change', syncTheme)
  ctx.effect(() => () => { nativeTheme = null; dshBridge = null }, 'dsh-personal-studio: native bridges')
  ctx.effect(() => {
    const style = document.createElement('style')
    style.setAttribute('data-dsh-plugin', 'dsh-personal-studio')
    style.textContent = styles
    document.head.appendChild(style)
    return () => {
      style.remove()
      document.documentElement.removeAttribute('data-dsh-studio-active')
      document.documentElement.removeAttribute('data-dsh-studio-theme')
    }
  }, 'dsh-personal-studio: styles')

  ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
    name: 'sidebar.footer.action',
    id: 'dsh-personal-studio-sidebar',
    order: 20,
  }, SidebarSection), 'dsh-personal-studio: sidebar')

  ctx.slots.inject('shell.overlay', () => ctx.slots.register({
    name: 'shell.overlay',
    id: 'dsh-personal-studio-overlay',
    order: 100,
  }, StudioOverlay), 'dsh-personal-studio: overlay')
}
