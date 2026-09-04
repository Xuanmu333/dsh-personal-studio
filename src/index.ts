import { access, mkdir } from 'node:fs/promises'
import { dirname, resolve, sep } from 'node:path'

export const name = 'dsh-personal-studio'
export const inject = ['webServer']

function json(response: any, status: number, value: unknown): void {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
  response.end(JSON.stringify(value))
}

async function bodyOf(request: any): Promise<any> {
  const chunks: Buffer[] = []
  for await (const chunk of request) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}') } catch { return {} }
}

export function apply(ctx: any): void {
  ctx.webServer.register({
    kind: 'exact',
    path: '/api/personal-studio/projects/create',
    handler: async (request: any, response: any) => {
      if (request.method !== 'POST') { response.writeHead(405); response.end(); return }
      try {
        const body = await bodyOf(request)
        const parent = typeof body.parent === 'string' ? resolve(body.parent) : ''
        const name = typeof body.name === 'string' ? body.name.trim() : ''
        if (!parent || !name || name === '.' || name === '..' || name.includes('/') || name.includes('\\')) {
          json(response, 400, { error: 'invalid project folder' })
          return
        }
        await access(parent)
        const path = resolve(parent, name)
        if (dirname(path) !== parent || !path.startsWith(parent + sep)) {
          json(response, 400, { error: 'project folder must be a direct child of the selected workspace' })
          return
        }
        await mkdir(path)
        json(response, 200, { ok: true, path })
      } catch (error: any) {
        if (error?.code === 'EEXIST') json(response, 409, { error: '同名项目文件夹已存在' })
        else json(response, 500, { error: '创建项目目录失败' })
      }
    },
  })
}
