import { spawn, type ChildProcess } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { existsSync, promises as fs } from 'node:fs'
import { createServer } from 'node:net'
import { homedir } from 'node:os'
import { basename, join, resolve } from 'node:path'

export const name = 'dsh-personal-studio'
export const inject = ['webServer']

type RunningProject = { child: ChildProcess; url: string }
type EmbeddedTerminal = {
  id: string
  child: ChildProcess
  root: string
  shell: 'terminal' | 'powershell'
  output: string
  baseOffset: number
  status: 'running' | 'exited'
}
const running = new Map<string, RunningProject>()
const terminals = new Map<string, EmbeddedTerminal>()
const terminalByRoot = new Map<string, string>()
const TERMINAL_OUTPUT_LIMIT = 200_000
const WINDOWS_GEMINI_ENV = {
  HTTPS_PROXY: 'http://hkhkg01proxy02.lenovo.com:3128',
  HTTP_PROXY: 'http://hkhkg01proxy02.lenovo.com:3128',
  grpc_proxy: 'http://hkhkg01proxy02.lenovo.com:3128',
  no_proxy: 'storage.googleapis.com,.ubuntu.com,.aliyun.com,.163.com,.mot.com,.lenovo.com,.motorola.com,10.0.0.0/8,100.64.0.0/11,127.0.0.1,127.0.1,1localhost',
  GOOGLE_CLOUD_PROJECT: 'moto-gemini-assist',
} as const
const WORK_LOG_DIRECTORY = process.env.DSH_PERSONAL_STUDIO_WORK_LOG_DIR
  ? resolve(process.env.DSH_PERSONAL_STUDIO_WORK_LOG_DIR)
  : join(homedir(), 'Documents', 'Obsidian Vault', '06 工作明细', '工作日志')
const WINDOWS_RESERVED_NAME = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/i

function json(res: any, status: number, value: unknown): void {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  res.end(JSON.stringify(value))
}

async function requestBody(req: any, maxBytes = 32_768): Promise<unknown> {
  const chunks: Buffer[] = []
  let size = 0
  for await (const chunk of req) {
    const part = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    size += part.length
    if (size > maxBytes) throw new Error('请求内容过大')
    chunks.push(part)
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

async function availablePort(): Promise<number> {
  return await new Promise((accept, reject) => {
    const server = createServer()
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      if (address === null || typeof address === 'string') {
        server.close()
        reject(new Error('无法分配项目预览端口'))
        return
      }
      server.close(error => { if (error) reject(error); else accept(address.port) })
    })
  })
}

function stopProject(child: ChildProcess): void {
  if (child.exitCode !== null || child.killed) return
  if (process.platform !== 'win32' || child.pid === undefined) {
    child.kill('SIGTERM')
    return
  }
  const killer = spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], {
    stdio: 'ignore',
    windowsHide: true,
  })
  killer.once('error', () => { if (child.exitCode === null) child.kill() })
  killer.once('exit', code => { if (code !== 0 && child.exitCode === null) child.kill() })
}

async function waitForPreview(url: string, child: ChildProcess): Promise<void> {
  const deadline = Date.now() + 15_000
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error('项目启动脚本提前退出')
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(1_000) })
      if (response.ok) return
    } catch { /* The local server is still starting. */ }
    await new Promise(accept => { setTimeout(accept, 250) })
  }
  stopProject(child)
  throw new Error('项目启动超过 15 秒，请检查项目的启动脚本')
}

async function launchProject(projectPath: string): Promise<{ kind: 'workspace' } | { kind: 'web'; url: string }> {
  const root = await fs.realpath(resolve(projectPath))
  const active = running.get(root)
  if (active !== undefined && active.child.exitCode === null) return { kind: 'web', url: active.url }

  const manifestPath = join(root, 'package.json')
  if (!existsSync(manifestPath)) return { kind: 'workspace' }
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8')) as { scripts?: Record<string, string> }
  const script = manifest.scripts?.start !== undefined ? 'start' : manifest.scripts?.dev !== undefined ? 'dev' : undefined
  if (script === undefined) return { kind: 'workspace' }

  const command = existsSync(join(root, 'pnpm-lock.yaml')) ? 'pnpm'
    : existsSync(join(root, 'yarn.lock')) ? 'yarn'
      : 'npm'
  const port = await availablePort()
  const url = `http://127.0.0.1:${port}/`
  const args = command === 'yarn' ? [script] : ['run', script]
  const child = spawn(command, args, {
    cwd: root,
    shell: process.platform === 'win32',
    windowsHide: true,
    env: { ...process.env, PORT: String(port), HOST: '127.0.0.1', NO_OPEN: '1', BROWSER: 'none' },
    stdio: 'ignore',
  })
  child.once('exit', () => { running.delete(root) })
  child.once('error', () => { running.delete(root) })
  running.set(root, { child, url })
  await waitForPreview(url, child)
  return { kind: 'web', url }
}

async function createProjectDirectory(parentPath: string, name: string): Promise<string> {
  const folder = name.trim()
  if (folder === '' || folder === '.' || folder === '..' || /[\\/]/.test(folder)) {
    throw new Error('项目文件夹名称只能是一个有效的文件夹名称')
  }
  if (/[<>:"|?*\u0000-\u001f]/.test(folder) || /[. ]$/.test(folder) || WINDOWS_RESERVED_NAME.test(folder)) {
    throw new Error('项目文件夹名称不符合 Windows 命名规则')
  }
  const parent = await fs.realpath(resolve(parentPath))
  if (!(await fs.stat(parent)).isDirectory()) throw new Error('所选父工作区不是文件夹')
  const path = join(parent, folder)
  try {
    await fs.mkdir(path)
  } catch (reason) {
    if ((reason as NodeJS.ErrnoException).code === 'EEXIST') throw new Error(`文件夹“${folder}”已经存在`)
    throw reason
  }
  return await fs.realpath(path)
}

function appendTerminalOutput(terminal: EmbeddedTerminal, value: string): void {
  terminal.output += value.replace(/\u001B\[[0-?]*[ -/]*[@-~]/gu, '').replace(/\r\n?/gu, '\n')
  if (terminal.output.length <= TERMINAL_OUTPUT_LIMIT) return
  const remove = terminal.output.length - TERMINAL_OUTPUT_LIMIT
  terminal.output = terminal.output.slice(remove)
  terminal.baseOffset += remove
}

function windowsGeminiEnvironment(): NodeJS.ProcessEnv {
  const environment = { ...process.env }
  const configuredNames = new Set(Object.keys(WINDOWS_GEMINI_ENV).map(name => name.toLowerCase()))
  for (const name of Object.keys(environment)) {
    if (configuredNames.has(name.toLowerCase())) delete environment[name]
  }
  return { ...environment, ...WINDOWS_GEMINI_ENV }
}

function terminalSnapshot(terminal: EmbeddedTerminal, offset = terminal.baseOffset): {
  sessionId: string
  shell: EmbeddedTerminal['shell']
  output: string
  offset: number
  status: EmbeddedTerminal['status']
} {
  const begin = Math.max(0, offset - terminal.baseOffset)
  return {
    sessionId: terminal.id,
    shell: terminal.shell,
    output: terminal.output.slice(begin),
    offset: terminal.baseOffset + terminal.output.length,
    status: terminal.status,
  }
}

async function openProjectTerminal(projectPath: string): Promise<EmbeddedTerminal> {
  const root = await fs.realpath(resolve(projectPath))
  if (!(await fs.stat(root)).isDirectory()) throw new Error('项目路径不是文件夹')

  const activeId = terminalByRoot.get(root)
  const active = activeId === undefined ? undefined : terminals.get(activeId)
  if (active?.status === 'running') return active

  const command = process.platform === 'darwin' ? process.env.SHELL || '/bin/zsh'
    : process.platform === 'win32' ? 'powershell.exe'
      : undefined
  if (command === undefined) throw new Error('当前系统暂不支持项目终端')
  const args = process.platform === 'darwin'
    ? ['-l']
    : ['-NoLogo', '-NoExit', '-Command', '-']
  const child = spawn(command, args, {
    cwd: root,
    shell: false,
    windowsHide: true,
    env: process.platform === 'win32' ? windowsGeminiEnvironment() : process.env,
    stdio: ['pipe', 'pipe', 'pipe'],
  })
  const terminal: EmbeddedTerminal = {
    id: randomUUID(),
    child,
    root,
    shell: process.platform === 'darwin' ? 'terminal' : 'powershell',
    output: '',
    baseOffset: 0,
    status: 'running',
  }
  child.stdout?.setEncoding('utf8')
  child.stderr?.setEncoding('utf8')
  child.stdout?.on('data', value => { appendTerminalOutput(terminal, String(value)) })
  child.stderr?.on('data', value => { appendTerminalOutput(terminal, String(value)) })
  child.once('exit', code => {
    terminal.status = 'exited'
    appendTerminalOutput(terminal, `\n[终端已退出${code === null ? '' : `，代码 ${code}`} ]\n`)
    terminalByRoot.delete(root)
  })
  await new Promise<void>((accept, reject) => {
    child.once('error', reject)
    child.once('spawn', accept)
  })
  terminals.set(terminal.id, terminal)
  terminalByRoot.set(root, terminal.id)
  if (process.platform === 'win32') {
    child.stdin?.write('[Console]::InputEncoding = [System.Text.UTF8Encoding]::new($false); [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false); $OutputEncoding = [Console]::OutputEncoding\n')
    child.stdin?.write('gemini\n')
  }
  return terminal
}

function requireTerminal(sessionId: unknown): EmbeddedTerminal {
  if (typeof sessionId !== 'string' || sessionId === '') throw new Error('缺少终端会话')
  const terminal = terminals.get(sessionId)
  if (terminal === undefined) throw new Error('终端会话不存在，请重新打开')
  return terminal
}

function requireLogDate(value: unknown): string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/u.test(value)) throw new Error('日期格式无效')
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year!, month! - 1, day))
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month! - 1 || date.getUTCDate() !== day) {
    throw new Error('日期不存在')
  }
  return value
}

async function readWorkLog(date: string): Promise<{ date: string; content: string; exists: boolean }> {
  const path = join(WORK_LOG_DIRECTORY, `${date}.md`)
  try {
    return { date, content: await fs.readFile(path, 'utf8'), exists: true }
  } catch (reason) {
    if ((reason as NodeJS.ErrnoException).code !== 'ENOENT') throw reason
    return { date, content: '', exists: false }
  }
}

async function saveWorkLog(date: string, content: string): Promise<void> {
  await fs.mkdir(WORK_LOG_DIRECTORY, { recursive: true })
  await fs.writeFile(join(WORK_LOG_DIRECTORY, `${date}.md`), content, 'utf8')
}

async function listWorkLogs(month: string): Promise<string[]> {
  if (!/^\d{4}-\d{2}$/u.test(month)) throw new Error('月份格式无效')
  try {
    const names = await fs.readdir(WORK_LOG_DIRECTORY)
    return names.filter(name => name.startsWith(`${month}-`) && /^\d{4}-\d{2}-\d{2}\.md$/u.test(name)).map(name => name.slice(0, -3)).sort()
  } catch (reason) {
    if ((reason as NodeJS.ErrnoException).code === 'ENOENT') return []
    throw reason
  }
}

export function apply(ctx: any): void {
  ctx.effect(() => {
    const unregisterLaunch = ctx.webServer.register({
      kind: 'exact',
      path: '/api/personal-studio/launch',
      handler: async (req: any, res: any) => {
        if (req.method !== 'POST') {
          json(res, 405, { error: '只支持 POST 请求' })
          return
        }
        try {
          const body = await requestBody(req) as { path?: unknown }
          if (typeof body.path !== 'string' || body.path.trim() === '') throw new Error('缺少项目路径')
          const result = await launchProject(body.path)
          json(res, 200, { ...result, name: basename(body.path) })
        } catch (reason) {
          json(res, 422, { error: reason instanceof Error ? reason.message : String(reason) })
        }
      },
    })
    const unregisterCreateDirectory = ctx.webServer.register({
      kind: 'exact',
      path: '/api/personal-studio/create-directory',
      handler: async (req: any, res: any) => {
        if (req.method !== 'POST') {
          json(res, 405, { error: '只支持 POST 请求' })
          return
        }
        try {
          const body = await requestBody(req) as { parentPath?: unknown; name?: unknown }
          if (typeof body.parentPath !== 'string' || body.parentPath.trim() === '') throw new Error('缺少父工作区路径')
          if (typeof body.name !== 'string') throw new Error('缺少项目文件夹名称')
          const path = await createProjectDirectory(body.parentPath, body.name)
          json(res, 201, { path })
        } catch (reason) {
          json(res, 422, { error: reason instanceof Error ? reason.message : String(reason) })
        }
      },
    })
    const unregisterOpenTerminal = ctx.webServer.register({
      kind: 'exact',
      path: '/api/personal-studio/open-terminal',
      handler: async (req: any, res: any) => {
        if (req.method !== 'POST') {
          json(res, 405, { error: '只支持 POST 请求' })
          return
        }
        try {
          const body = await requestBody(req) as { path?: unknown }
          if (typeof body.path !== 'string' || body.path.trim() === '') throw new Error('缺少项目路径')
          const terminal = await openProjectTerminal(body.path)
          json(res, 200, terminalSnapshot(terminal))
        } catch (reason) {
          json(res, 422, { error: reason instanceof Error ? reason.message : String(reason) })
        }
      },
    })
    const unregisterReadTerminal = ctx.webServer.register({
      kind: 'exact',
      path: '/api/personal-studio/read-terminal',
      handler: async (req: any, res: any) => {
        if (req.method !== 'POST') {
          json(res, 405, { error: '只支持 POST 请求' })
          return
        }
        try {
          const body = await requestBody(req) as { sessionId?: unknown; offset?: unknown }
          const terminal = requireTerminal(body.sessionId)
          const offset = typeof body.offset === 'number' && Number.isFinite(body.offset) ? body.offset : terminal.baseOffset
          json(res, 200, terminalSnapshot(terminal, offset))
        } catch (reason) {
          json(res, 422, { error: reason instanceof Error ? reason.message : String(reason) })
        }
      },
    })
    const unregisterSendTerminal = ctx.webServer.register({
      kind: 'exact',
      path: '/api/personal-studio/send-terminal',
      handler: async (req: any, res: any) => {
        if (req.method !== 'POST') {
          json(res, 405, { error: '只支持 POST 请求' })
          return
        }
        try {
          const body = await requestBody(req) as { sessionId?: unknown; command?: unknown; offset?: unknown }
          const terminal = requireTerminal(body.sessionId)
          if (terminal.status !== 'running' || terminal.child.stdin === null) throw new Error('终端已退出，请重新打开')
          if (typeof body.command !== 'string') throw new Error('缺少终端输入')
          appendTerminalOutput(terminal, `\n❯ ${body.command}\n`)
          terminal.child.stdin.write(`${body.command}\n`)
          const offset = typeof body.offset === 'number' && Number.isFinite(body.offset) ? body.offset : terminal.baseOffset
          json(res, 200, terminalSnapshot(terminal, offset))
        } catch (reason) {
          json(res, 422, { error: reason instanceof Error ? reason.message : String(reason) })
        }
      },
    })
    const unregisterReadWorkLog = ctx.webServer.register({
      kind: 'exact',
      path: '/api/personal-studio/read-work-log',
      handler: async (req: any, res: any) => {
        if (req.method !== 'POST') {
          json(res, 405, { error: '只支持 POST 请求' })
          return
        }
        try {
          const body = await requestBody(req) as { date?: unknown }
          json(res, 200, await readWorkLog(requireLogDate(body.date)))
        } catch (reason) {
          json(res, 422, { error: reason instanceof Error ? reason.message : String(reason) })
        }
      },
    })
    const unregisterSaveWorkLog = ctx.webServer.register({
      kind: 'exact',
      path: '/api/personal-studio/save-work-log',
      handler: async (req: any, res: any) => {
        if (req.method !== 'POST') {
          json(res, 405, { error: '只支持 POST 请求' })
          return
        }
        try {
          const body = await requestBody(req, 1_048_576) as { date?: unknown; content?: unknown }
          const date = requireLogDate(body.date)
          if (typeof body.content !== 'string') throw new Error('工作日志内容无效')
          await saveWorkLog(date, body.content)
          json(res, 200, { date, saved: true })
        } catch (reason) {
          json(res, 422, { error: reason instanceof Error ? reason.message : String(reason) })
        }
      },
    })
    const unregisterListWorkLogs = ctx.webServer.register({
      kind: 'exact',
      path: '/api/personal-studio/list-work-logs',
      handler: async (req: any, res: any) => {
        if (req.method !== 'POST') {
          json(res, 405, { error: '只支持 POST 请求' })
          return
        }
        try {
          const body = await requestBody(req) as { month?: unknown }
          if (typeof body.month !== 'string') throw new Error('缺少月份')
          json(res, 200, { dates: await listWorkLogs(body.month) })
        } catch (reason) {
          json(res, 422, { error: reason instanceof Error ? reason.message : String(reason) })
        }
      },
    })
    return async () => {
      unregisterLaunch()
      unregisterCreateDirectory()
      unregisterOpenTerminal()
      unregisterReadTerminal()
      unregisterSendTerminal()
      unregisterReadWorkLog()
      unregisterSaveWorkLog()
      unregisterListWorkLogs()
      for (const { child } of running.values()) stopProject(child)
      running.clear()
      for (const terminal of terminals.values()) stopProject(terminal.child)
      terminals.clear()
      terminalByRoot.clear()
    }
  }, 'dsh-personal-studio: project preview launcher')
}
