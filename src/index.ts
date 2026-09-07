import { spawn, type ChildProcess } from 'node:child_process'
import { existsSync, promises as fs } from 'node:fs'
import { createServer } from 'node:net'
import { basename, join, resolve } from 'node:path'

export const name = 'dsh-personal-studio'
export const inject = ['webServer']

type RunningProject = { child: ChildProcess; url: string }
const running = new Map<string, RunningProject>()

function json(res: any, status: number, value: unknown): void {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  res.end(JSON.stringify(value))
}

async function requestBody(req: any): Promise<unknown> {
  const chunks: Buffer[] = []
  let size = 0
  for await (const chunk of req) {
    const part = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    size += part.length
    if (size > 32_768) throw new Error('请求内容过大')
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
  child.kill('SIGTERM')
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
    return async () => {
      unregisterLaunch()
      unregisterCreateDirectory()
      for (const { child } of running.values()) child.kill('SIGTERM')
      running.clear()
    }
  }, 'dsh-personal-studio: project preview launcher')
}
