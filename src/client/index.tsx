import {
  useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore,
} from 'react'
import { createPortal } from 'react-dom'
import {
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
type ProjectLaunch = 'workspace' | 'web' | 'worktable'

type ProjectSection = {
  id: string
  name: string
  workspaceId: string
  path: string
}

type DataConnection = {
  kind: 'project-files' | 'sqlite' | 'http'
  location: string
  readOnly: boolean
}

type Brand = {
  name: string
  tagline: string
  logo: string
}

type Project = {
  id: string
  name: string
  layout: Layout
  kind: ProjectKind
  workspaceId: string
  path: string
  panes: PaneKind[]
  paneSources: string[]
  sections: ProjectSection[]
  launch: ProjectLaunch
  data: DataConnection
  aiMode: AiMode
  sessions: Partial<Record<AiMode, string>>
}

type StudioState = {
  projects: Project[]
  activeId: string | null
  theme: Theme
  brand: Brand
}

const STORAGE_KEY = 'dsh.personal-studio.projects.v1'
const THEME_KEY = 'dsh.personal-studio.theme.v1'
const BRAND_KEY = 'dsh.personal-studio.brand.v1'
const DEFAULT_BRAND: Brand = { name: 'DSH Personal Studio', tagline: '个人智能工作空间', logo: '' }

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
      paneSources: Array.isArray(item.paneSources) ? item.paneSources.map(String) : [],
      sections: Array.isArray(item.sections) && item.sections.length > 0
        ? item.sections.map((section: any) => ({
          id: String(section.id ?? projectId()),
          name: String(section.name ?? '项目分区'),
          workspaceId: String(section.workspaceId ?? item.workspaceId ?? ''),
          path: String(section.path ?? item.path ?? ''),
        })).filter((section: ProjectSection) => section.workspaceId !== '' && section.path !== '')
        : [{ id: projectId(), name: '主项目', workspaceId: String(item.workspaceId ?? ''), path: String(item.path ?? '') }],
      launch: (['workspace', 'web', 'worktable'].includes(item.launch) ? item.launch : 'workspace') as ProjectLaunch,
      data: {
        kind: (['project-files', 'sqlite', 'http'].includes(item.data?.kind) ? item.data.kind : 'project-files') as DataConnection['kind'],
        location: String(item.data?.location ?? ''),
        readOnly: item.data?.readOnly !== false,
      },
      aiMode: item.aiMode === 'build' ? 'build' : 'analyze',
      sessions: item.sessions && typeof item.sessions === 'object' ? item.sessions : {},
    })).filter((item: Project) => item.workspaceId !== '' && item.path !== '')
  } catch {
    return []
  }
}

function loadBrand(): Brand {
  try {
    const value = JSON.parse(localStorage.getItem(BRAND_KEY) ?? 'null')
    if (value === null || typeof value !== 'object') return DEFAULT_BRAND
    return {
      name: String(value.name ?? DEFAULT_BRAND.name),
      tagline: String(value.tagline ?? DEFAULT_BRAND.tagline),
      logo: typeof value.logo === 'string' ? value.logo : '',
    }
  } catch { return DEFAULT_BRAND }
}

function loadTheme(): Theme {
  if (document.body.hasAttribute('data-ds-dark-theme')) return 'dark'
  return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'
}

let snapshot: StudioState = { projects: loadProjects(), activeId: null, theme: loadTheme(), brand: loadBrand() }
const listeners = new Set<() => void>()

function commit(next: StudioState): void {
  snapshot = next
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next.projects))
  localStorage.setItem(THEME_KEY, next.theme)
  localStorage.setItem(BRAND_KEY, JSON.stringify(next.brand))
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
  setBrand(brand: Brand) { commit({ ...snapshot, brand }) },
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

let dshBridge: { sessions: any; conversation: any; workspaces: any; uiWorkspace: any } | null = null

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
  const sections = project.sections.map(section => `- ${section.name}: ${section.path}`).join('\n')
  const data = project.data.kind === 'project-files'
    ? '项目文件与产物目录'
    : `${project.data.kind.toUpperCase()}：${project.data.location || '尚未配置地址'}`
  const boundary = `项目名称：${project.name}\n项目根目录：${project.path}\n启动类型：${project.launch}\n项目分区：\n${sections}\n数据接口：${data}\n数据权限：${project.data.readOnly ? '只读' : '允许写入'}`
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
`

function StudioMark({ size = 24, className }: { size?: number; className?: string }) {
  const { brand } = useStudio()
  if (brand.logo !== '') {
    return <img className={`dsh-studio-brand-image${className ? ` ${className}` : ''}`} src={brand.logo} width={size} height={size} alt="" />
  }
  return (
    <span className={`dsh-studio-brand-fallback${className ? ` ${className}` : ''}`} style={{ width: size, height: size }} aria-hidden="true">
      <IconSparkle16 size={Math.max(16, size - 4)} />
    </span>
  )
}

function SidebarBrandName() {
  const { brand } = useStudio()
  return <span className="dsh-studio-brand-copy"><strong>{brand.name}</strong><small>{brand.tagline}</small></span>
}

function HeroBrandMark({ size = 34, className }: { size?: number; className?: string }) {
  const { brand } = useStudio()
  const ref = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const slot = ref.current?.closest('[data-slot="conversation.hero.brand.mark"]')
    const markSeat = slot?.parentElement
    const title = markSeat?.nextElementSibling
    const badge = title?.nextElementSibling
    if (!(title instanceof HTMLElement) || !(badge instanceof HTMLElement)) return
    const previousTitle = title.textContent
    const previousBadge = badge.textContent
    title.textContent = brand.name
    badge.textContent = brand.tagline
    return () => {
      title.textContent = previousTitle
      badge.textContent = previousBadge
    }
  }, [brand.name, brand.tagline])
  return <span ref={ref}><StudioMark size={size} className={className} /></span>
}

function BrandDialog({ onClose }: { onClose: () => void }) {
  const current = useStudio().brand
  const [name, setName] = useState(current.name)
  const [tagline, setTagline] = useState(current.tagline)
  const [logo, setLogo] = useState(current.logo)
  const upload = (file?: File) => {
    if (file === undefined) return
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => { if (typeof reader.result === 'string') setLogo(reader.result) }
    reader.readAsDataURL(file)
  }
  return createPortal(
    <div className="dsh-studio-dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
      <div className="dsh-studio-dialog dsh-studio-brand-dialog" role="dialog" aria-modal="true" aria-label="品牌与 Logo">
        <div className="dsh-studio-dialog-head"><h2>品牌与 Logo</h2><button className="dsh-studio-icon-button" type="button" aria-label="关闭" onClick={onClose}><IconCloseOutline16 /></button></div>
        <div className="dsh-studio-brand-preview"><StudioMark size={42} /><div><strong>{name || '未命名工作台'}</strong><span>{tagline || '个人智能工作空间'}</span></div></div>
        <div className="dsh-studio-field"><label htmlFor="studio-brand-name">主界面名称</label><input id="studio-brand-name" value={name} onChange={event => { setName(event.target.value) }} placeholder="例如：玄木工作台" /></div>
        <div className="dsh-studio-field"><label htmlFor="studio-brand-tagline">标识文字</label><input id="studio-brand-tagline" value={tagline} onChange={event => { setTagline(event.target.value) }} placeholder="例如：个人智能工作空间" /></div>
        <div className="dsh-studio-field"><label htmlFor="studio-brand-logo">Logo 图片</label><input id="studio-brand-logo" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={event => { upload(event.target.files?.[0]) }} /></div>
        <div className="dsh-studio-dialog-actions">
          {logo !== '' && <button className="dsh-studio-button" type="button" onClick={() => { setLogo('') }}>恢复默认图标</button>}
          <span className="dsh-studio-dialog-spacer" />
          <button className="dsh-studio-button" type="button" onClick={onClose}>取消</button>
          <button className="dsh-studio-button primary" type="button" disabled={name.trim() === ''} onClick={() => { studio.setBrand({ name: name.trim(), tagline: tagline.trim(), logo }); onClose() }}>保存</button>
        </div>
      </div>
    </div>,
    document.body,
  )
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
  const [workspaces, setWorkspaces] = useState(listWorkspaces)
  const [workspaceId, setWorkspaceId] = useState(project?.workspaceId ?? workspaces[0]?.id ?? '')
  const [folderName, setFolderName] = useState('')
  const [sectionWorkspaceIds, setSectionWorkspaceIds] = useState<string[]>(project?.sections.map(section => section.workspaceId) ?? [])
  const [launch, setLaunch] = useState<ProjectLaunch>(project?.launch ?? 'workspace')
  const [dataKind, setDataKind] = useState<DataConnection['kind']>(project?.data.kind ?? 'project-files')
  const [dataLocation, setDataLocation] = useState(project?.data.location ?? '')
  const [saving, setSaving] = useState(false)
  const [picking, setPicking] = useState(false)
  const [error, setError] = useState('')
  const pickLocalFolder = async () => {
    setPicking(true)
    setError('')
    try {
      const path = await dshBridge?.uiWorkspace?.pickDirectory?.()
      if (!path) return
      const workspace = await dshBridge?.workspaces?.create?.({ path })
      const id = String(workspace?.workspaceId ?? workspace?.id ?? '')
      if (!id) throw new Error('所选文件夹无法注册为 DSH 工作区')
      const title = String(workspace?.title ?? path.split(/[\\/]/).filter(Boolean).at(-1) ?? '本地项目')
      const option = { id, title, path: String(workspace?.path ?? path) }
      setWorkspaces(current => [...current.filter(item => item.id !== id), option])
      setWorkspaceId(id)
      if (name.trim() === '') setName(title)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason))
    } finally { setPicking(false) }
  }
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
        const path = await dshBridge?.uiWorkspace?.createDirectory?.(parent.path, folder)
        if (!path) throw new Error('无法创建项目目录')
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
        paneSources: project?.paneSources ?? [],
        sections: (() => {
          const ids = Array.from(new Set([binding.id, ...sectionWorkspaceIds].filter(Boolean)))
          return ids.map((id, index) => {
            if (id === binding.id) return { id: project?.sections.find(section => section.workspaceId === id)?.id ?? projectId(), name: index === 0 ? '主项目' : binding.title, workspaceId: id, path: binding.path }
            const workspace = workspaces.find(item => item.id === id)!
            return { id: project?.sections.find(section => section.workspaceId === id)?.id ?? projectId(), name: workspace.title, workspaceId: id, path: workspace.path }
          })
        })(),
        launch,
        data: { kind: dataKind, location: dataLocation.trim(), readOnly: true },
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
  return createPortal(
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
            <label htmlFor="studio-project-workspace">{kind === 'attached' ? '选择 DSH 工作区' : '选择新项目的父工作区'}</label>
            <select id="studio-project-workspace" value={workspaceId} onChange={event => { setWorkspaceId(event.target.value) }}>
              {workspaces.length === 0 && <option value="">暂无可用工作区</option>}
              {workspaces.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
            </select>
            <button className="dsh-studio-folder-button" type="button" disabled={picking} onClick={() => { void pickLocalFolder() }}>
              <IconFolderClose16 size={14} />{picking ? '正在打开…' : kind === 'attached' ? '从电脑选择项目文件夹' : '从电脑选择父文件夹'}
            </button>
          </div>
        )}
        {project === undefined && kind === 'generated' && (
          <div className="dsh-studio-field">
            <label htmlFor="studio-project-folder">新项目文件夹</label>
            <input id="studio-project-folder" value={folderName} onChange={event => { setFolderName(event.target.value) }} placeholder="例如：my-new-project" />
          </div>
        )}
        {project !== undefined && <div className="dsh-studio-project-binding"><span>工作区连接</span><strong>已连接到 DSH 工作区</strong></div>}
        <div className="dsh-studio-field">
          <label htmlFor="studio-project-launch">点击项目时启动</label>
          <select id="studio-project-launch" value={launch} onChange={event => { setLaunch(event.target.value as ProjectLaunch) }}>
            <option value="workspace">DSH 项目工作区</option>
            <option value="web">网页项目</option>
            <option value="worktable">工作台项目</option>
          </select>
        </div>
        <div className="dsh-studio-field">
          <label>挂载到分区的 DSH 项目</label>
          {sectionWorkspaceIds.map((id, index) => (
            <div className="dsh-studio-section-picker" key={`${id}-${index}`}>
              <select value={id} onChange={event => { setSectionWorkspaceIds(items => items.map((item, itemIndex) => itemIndex === index ? event.target.value : item)) }}>
                {workspaces.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
              </select>
              <button className="dsh-studio-icon-button" type="button" aria-label="移除分区" onClick={() => { setSectionWorkspaceIds(items => items.filter((_, itemIndex) => itemIndex !== index)) }}><IconCloseOutline16 size={13} /></button>
            </div>
          ))}
          <button className="dsh-studio-folder-button" type="button" disabled={workspaces.length === 0} onClick={() => { setSectionWorkspaceIds(items => [...items, workspaces[0]!.id]) }}><IconPlusOutline16 size={14} />添加项目分区</button>
        </div>
        <div className="dsh-studio-field">
          <label htmlFor="studio-project-data">AI 数据接口</label>
          <select id="studio-project-data" value={dataKind} onChange={event => { setDataKind(event.target.value as DataConnection['kind']) }}>
            <option value="project-files">项目文件与产物（默认）</option>
            <option value="sqlite">SQLite 数据库</option>
            <option value="http">HTTP 数据接口</option>
          </select>
          {dataKind !== 'project-files' && <input value={dataLocation} onChange={event => { setDataLocation(event.target.value) }} placeholder={dataKind === 'sqlite' ? '数据库相对路径，例如 data/app.db' : '接口地址，例如 http://127.0.0.1:4000/api'} />}
          <small className="dsh-studio-field-note">AI 默认只读访问；凭据不会保存在这个插件中。</small>
        </div>
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
          <button className="dsh-studio-button primary" type="button" disabled={saving || picking || name.trim() === '' || workspaceId === ''} onClick={() => { void save() }}>{saving ? '正在连接…' : '保存项目'}</button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function PersonalSidebar(props: any) {
  const { collapsed, width, renderSlot, startSession, toggleSidebar } = props
  const state = useStudio()
  const wide = !collapsed
  const [menu, setMenu] = useState<{ x: number; y: number; project?: Project; brand?: boolean } | null>(null)
  const [editing, setEditing] = useState<Project | undefined | false>(false)
  const [editingBrand, setEditingBrand] = useState(false)

  useEffect(() => {
    document.documentElement.toggleAttribute('data-dsh-studio-active', state.activeId !== null)
    document.documentElement.setAttribute('data-dsh-studio-theme', state.theme)
    return () => { document.documentElement.removeAttribute('data-dsh-studio-active') }
  }, [state.activeId, state.theme])

  useEffect(() => {
    if (menu === null) return
    const close = () => { setMenu(null) }
    window.addEventListener('pointerdown', close)
    return () => { window.removeEventListener('pointerdown', close) }
  }, [menu])

  const showContext = (event: React.MouseEvent, project?: Project, brand = false) => {
    event.preventDefault()
    event.stopPropagation()
    setMenu({ x: event.clientX, y: event.clientY, project, brand })
  }
  const openProject = (project: Project) => {
    studio.setActive(project.id)
    void openProjectMode(project, project.aiMode)
  }

  return (
    <aside
      className={`dsh-studio-shell${wide ? ' wide' : ' rail'}`}
      data-dsh-studio-sidebar-root=""
      style={wide ? { width } : undefined}
      onContextMenu={event => { if (event.target === event.currentTarget) showContext(event) }}
    >
      <header className="dsh-studio-shell-head">
        <button className="dsh-studio-brand" type="button" aria-label={wide ? '品牌设置' : '展开侧边栏'} onContextMenu={event => { showContext(event, undefined, true) }} onClick={() => { if (!wide) toggleSidebar(); else setEditingBrand(true) }}>
          <StudioMark size={wide ? 26 : 24} />
          {wide && <SidebarBrandName />}
        </button>
        {wide && <button className="dsh-studio-shell-icon" type="button" aria-label="收起侧边栏" onClick={toggleSidebar}><IconPanelLeftOutline16 size={16} /></button>}
      </header>
      <button className="dsh-studio-new-session" type="button" aria-label="新建会话" onClick={() => { studio.setActive(null); startSession() }}><IconPlusOutline16 size={wide ? 14 : 18} />{wide && <span>新建会话</span>}</button>
      <div className="dsh-studio-navigation" onContextMenu={event => { if ((event.target as HTMLElement).closest('button') === null) showContext(event) }}>
        <div className="dsh-studio-native-workspaces">{renderSlot('sidebar.workspaces', { wide, expandSidebar: () => { if (!wide) toggleSidebar() } })}</div>
        <div className="dsh-studio-project-list" role="tree" aria-label="项目">
          {state.projects.map(project => (
            <button key={project.id} type="button" role="treeitem" className={`dsh-studio-project-row${state.activeId === project.id ? ' active' : ''}`} onClick={() => { openProject(project) }} onContextMenu={event => { showContext(event, project) }}>
              <span className="dsh-studio-project-icon"><IconSparkle16 size={wide ? 14 : 18} /></span>
              {wide && <><span>{project.name}</span>{project.sections.length > 1 && <small>{project.sections.length}</small>}<IconChevronRightOutline14 className="dsh-studio-project-chevron" size={12} /></>}
            </button>
          ))}
          {wide && state.projects.length === 0 && <button className="dsh-studio-project-empty" type="button" onClick={() => { setEditing(undefined) }}><IconPlusOutline16 size={13} />右键或点击添加项目</button>}
        </div>
      </div>
      <footer className="dsh-studio-shell-foot">
        <button className="dsh-studio-theme-button" type="button" aria-label={state.theme === 'dark' ? '切换为浅色界面' : '切换为深色界面'} onClick={() => { setTheme(state.theme === 'dark' ? 'light' : 'dark') }}>{state.theme === 'dark' ? <IconLightOutline16 size={16} /> : <IconDarkOutline16 size={16} />}{wide && <span>{state.theme === 'dark' ? '浅色外观' : '深色外观'}</span>}</button>
        <div className="dsh-studio-native-settings">{renderSlot('sidebar.settings', { wide })}</div>
        {renderSlot('sidebar.footer.action', { wide })}
      </footer>
      {menu !== null && createPortal(<div className="dsh-studio-menu" style={{ left: menu.x, top: menu.y }} onPointerDown={event => { event.stopPropagation() }}>
        {menu.brand ? <button type="button" onClick={() => { setMenu(null); setEditingBrand(true) }}><IconEditOutline16 />修改品牌与 Logo</button>
          : menu.project === undefined ? <button type="button" onClick={() => { setMenu(null); setEditing(undefined) }}><IconPlusOutline16 />新建项目</button>
            : <><button type="button" onClick={() => { setMenu(null); setEditing(menu.project) }}><IconEditOutline16 />编辑项目</button><button className="danger" type="button" onClick={() => { studio.remove(menu.project!.id); setMenu(null) }}><IconTrashOutline16 />删除项目</button></>}
      </div>, document.body)}
      {editing !== false && <ProjectDialog project={editing} onClose={() => { setEditing(false) }} />}
      {editingBrand && <BrandDialog onClose={() => { setEditingBrand(false) }} />}
    </aside>
  )
}

const paneLabels: Record<PaneKind, { title: string; description: string }> = {
  overview: { title: '项目概览', description: '项目路径、状态与 AI 工作入口' },
  files: { title: '文件与代码', description: '由项目 AI 读取、检索或修改当前工作区文件' },
  data: { title: '数据与产物', description: '分析项目生成的数据、日志、表格和其他产物' },
  report: { title: '总结与报告', description: '把项目数据整理为结论、风险与下一步行动' },
}

function Pane({ project, index, onMode }: { project: Project; index: number; onMode: (mode: AiMode, prompt?: string) => void }) {
  const kind = project.panes[index] ?? 'overview'
  const section = project.sections.find(item => item.id === project.paneSources[index]) ?? project.sections[index] ?? project.sections[0]
  const setKind = (nextKind: PaneKind) => {
    const panes = panesFor(project.layout, project.panes)
    panes[index] = nextKind
    studio.update({ ...project, panes })
  }
  const setSection = (sectionId: string) => {
    const paneSources = [...project.paneSources]
    paneSources[index] = sectionId
    studio.update({ ...project, paneSources })
  }
  const details = paneLabels[kind]
  return (
    <section className="dsh-studio-pane">
      <div className="dsh-studio-pane-bar">
        <span>{section?.name ?? `区域 ${index + 1}`}</span>
        {project.sections.length > 1 && <select aria-label={`区域 ${index + 1} 项目来源`} value={section?.id} onChange={event => { setSection(event.target.value) }}>{project.sections.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select>}
        <select aria-label={`区域 ${index + 1} 内容`} value={kind} onChange={event => { setKind(event.target.value as PaneKind) }}>
          {Object.entries(paneLabels).map(([value, label]) => <option key={value} value={value}>{label.title}</option>)}
        </select>
      </div>
      <div className="dsh-studio-project-pane">
        <span className="glyph"><IconSparkle16 size={18} /></span>
        <div className="eyebrow">{project.kind === 'generated' ? 'AI 生成项目' : '本地项目'}</div>
        <strong>{details.title}</strong>
        <p>{details.description}{section !== undefined ? `，数据范围为“${section.name}”` : ''}。</p>
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
  const [aiOpen, setAiOpen] = useState(false)

  useEffect(() => { setAiOpen(false) }, [project?.id])

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
    root.setAttribute('data-studio-open', String(aiOpen))
    return () => {
      root.removeAttribute('data-dsh-studio-conversation')
      root.removeAttribute('data-studio-open')
    }
  }, [project?.id, aiOpen])

  if (project === undefined) return null

  const changeLayout = (layout: Layout) => {
    studio.update({ ...project, layout, panes: panesFor(layout, project.panes) })
  }
  const handleMode = async (mode: AiMode, prompt?: string) => {
    try {
      const next = await openProjectMode(project, mode)
      setAiOpen(true)
      const sessionId = next.sessions[mode]
      if (prompt && sessionId) await promptIntoSession(sessionId, prompt)
    } catch (reason) {
      window.alert(reason instanceof Error ? reason.message : String(reason))
    }
  }
  return (
    <>
      <main className="dsh-studio-overlay" style={{ left: sidebarRight }}>
        <header className="dsh-studio-topbar">
          <span className="project-mark"><IconSparkle16 size={15} /></span>
          <div>
            <h1>{project.name}</h1>
            <span className="path">{project.launch === 'web' ? '网页项目' : project.launch === 'worktable' ? '工作台项目' : project.kind === 'generated' ? 'AI 创建项目' : 'DSH 项目'}</span>
          </div>
          <div className="dsh-studio-topbar-actions">
            {project.aiMode === 'build' && <div className="dsh-studio-layouts" aria-label="项目布局">
              {([
                ['single', '单画布'], ['dual', '双区'], ['triple', '三栏'], ['vertical', '上下'],
              ] as const).map(([layout, label]) => (
                <button key={layout} type="button" className={`dsh-studio-layout-button${project.layout === layout ? ' active' : ''}`} onClick={() => { changeLayout(layout) }}>{label}</button>
              ))}
            </div>}
            <button className={`dsh-studio-ai-toggle${aiOpen ? ' active' : ''}`} type="button" aria-label={aiOpen ? '收起 AI 侧栏' : '展开 AI 侧栏'} title={aiOpen ? '收起 AI 侧栏' : '展开 AI 侧栏'} onClick={() => {
              if (aiOpen) setAiOpen(false)
              else void handleMode(project.aiMode)
            }}><IconPanelLeftOutline16 size={17} /></button>
          </div>
        </header>
        <div className={`dsh-studio-stage${aiOpen ? ' ai-open' : ''}`}>
          <SplitSurface project={project} onMode={(mode, prompt) => { void handleMode(mode, prompt) }} />
        </div>
      </main>
      {aiOpen && <aside className="dsh-studio-ai-sidebar">
        <div className="dsh-studio-ai-sidebar-head">
          <span className="status" />
          <div className="title"><strong>AI 助手</strong><span>{project.name}</span></div>
          <div className="dsh-studio-ai-modes" aria-label="AI 工作模式">
            <button type="button" className={project.aiMode === 'analyze' ? 'active' : ''} onClick={() => { void handleMode('analyze') }}>分析</button>
            <button type="button" className={project.aiMode === 'build' ? 'active' : ''} onClick={() => { void handleMode('build') }}>构建</button>
          </div>
          <button className="close" type="button" aria-label="收起 AI 侧栏" title="收起 AI 侧栏" onClick={() => { setAiOpen(false) }}><IconCloseOutline16 size={14} /></button>
        </div>
      </aside>}
    </>
  )
}

export const inject = ['slots', 'theme', 'sessions', 'conversation', 'workspaces', 'uiWorkspace', 'layout']

export function apply(ctx: any): void {
  dshBridge = { sessions: ctx.sessions, conversation: ctx.conversation, workspaces: ctx.workspaces, uiWorkspace: ctx.uiWorkspace }
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

  ctx.slots.inject('sidebar', () => ctx.slots.register({
    name: 'sidebar',
    priority: -10,
    children: {
      'sidebar.brand.mark': { kind: 'single', scope: 'root' },
      'sidebar.brand.name': { kind: 'single', scope: 'root' },
      'sidebar.workspaces': { kind: 'single', scope: 'root' },
      'sidebar.settings': { kind: 'single', scope: 'root' },
      'sidebar.footer.action': { kind: 'list', scope: 'root' },
    },
    inject: () => ({
      startSession: (workspaceId?: string) => { ctx.uiWorkspace.startSession(workspaceId) },
      toggleSidebar: () => { ctx.layout.toggleSidebar() },
    }),
  }, PersonalSidebar), 'dsh-personal-studio: sidebar shell')

  ctx.slots.inject('sidebar.brand.mark', () => ctx.slots.register({ name: 'sidebar.brand.mark', priority: -10 }, StudioMark), 'dsh-personal-studio: sidebar brand mark')
  ctx.slots.inject('sidebar.brand.name', () => ctx.slots.register({ name: 'sidebar.brand.name', priority: -10 }, SidebarBrandName), 'dsh-personal-studio: sidebar brand name')
  ctx.slots.inject('conversation.hero.brand.mark', () => ctx.slots.register({ name: 'conversation.hero.brand.mark', priority: -10 }, HeroBrandMark), 'dsh-personal-studio: hero brand mark')

  ctx.slots.inject('shell.overlay', () => ctx.slots.register({
    name: 'shell.overlay',
    id: 'dsh-personal-studio-overlay',
    order: 100,
  }, StudioOverlay), 'dsh-personal-studio: overlay')
}
