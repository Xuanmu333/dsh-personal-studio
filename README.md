# DSH Personal Studio

面向 [DeepSeek Harness](https://github.com/deepseek-ai/DeepSeek-Harness) 的个人项目工作台插件。

它不会修改 DSH 源代码，而是通过 DSH 的插件能力接入侧边栏、工作区、会话、主题与本地 Web 服务。

## 功能

- 在 DSH 侧边栏中提供“我的项目”。
- 通过系统文件夹选择器直接接入本机项目，并注册为 DSH 工作区；不使用 iframe 嵌入运行页面。
- 在现有工作区下创建空项目目录，并注册为新的 DSH 工作区。
- 为每个项目分别保留“分析”和“构建”两种 AI 会话。
- 项目默认使用简洁单画布。
- AI 面板使用右上角按钮展开为 VS Code 风格的右侧边栏。
- 右上角的日历、Terminal 与 AI 工具按钮支持拖拽排序，并在当前浏览器中记住顺序。
- 日历工作台可按日编辑 Markdown 便笺：临时保存保留在当前浏览器中，保存到 Obsidian 后写入 `06 工作明细/工作日志/YYYY-MM-DD.md` 并清除该日临时稿。
- 跟随 DSH 原生深色与浅色主题。

## AI 模式

### 分析

AI 默认只读取当前项目工作区中的文件、数据产物和版本状态，用于总结、分析、核对和生成报告。

### 构建

AI 可以在当前项目工作区中生成新项目，或检查并修改已经接入的项目。项目工作区路径是会话的数据与文件边界。

## 安装

要求：已经从源码安装并可以运行 DeepSeek Harness，并安装 Node.js、pnpm 和 Git。

### macOS / Linux

```bash
git clone https://github.com/Xuanmu333/dsh-personal-studio.git
cd ~/.dsh/profiles/web
pnpm add link:/absolute/path/to/dsh-personal-studio
```

### Windows

推荐直接从 GitHub 安装，避免手动处理 Windows 链接路径。在 PowerShell 中运行：

```powershell
Set-Location "$env:USERPROFILE\.dsh\profiles\web"
pnpm add github:Xuanmu333/dsh-personal-studio
```

然后在 macOS/Linux 的 `~/.dsh/profiles/web/package.json`，或 Windows 的
`%USERPROFILE%\.dsh\profiles\web\package.json` 中，将插件加入 `dsh.profile.bundles`：

```json
"dsh-personal-studio"
```

重启 DSH web profile：

```bash
cd /path/to/deepseek-harness
pnpm run dsh --profile web
```

Windows PowerShell：

```powershell
Set-Location "C:\path\to\deepseek-harness"
pnpm run dsh --profile web
```

Windows 版本会通过系统命令解释器启动 `npm`、`pnpm` 或 `yarn` 项目，并在插件关闭时清理对应的子进程树。

在 Windows 中打开内嵌 Terminal 时，插件会为该 PowerShell 会话加载预设的 Lenovo 代理、`moto-gemini-assist` Google Cloud 项目，并在当前项目根目录自动运行 `gemini`。该会话通过 `GEMINI_CLI_TRUST_WORKSPACE=true` 信任用户主动在 Personal Studio 中打开的项目，以支持 Gemini CLI 的无交互启动。这些环境变量只作用于该终端子进程，不修改 Windows 的全局环境变量；内嵌 PowerShell 自身会保持运行，因此不需要再执行 `cmd /k`。

选中项目后，顶部终端按钮会在 Personal Studio 内展开项目终端侧栏，并以项目目录为工作目录：macOS 使用当前 shell，Windows 使用 PowerShell。

工作日志默认保存到 `~/Documents/Obsidian Vault/06 工作明细/工作日志`。可通过 `DSH_PERSONAL_STUDIO_WORK_LOG_DIR` 环境变量覆盖该目录。

## 开发

```bash
npm install
npm run build
npm run check
```

主要代码：

- `src/client/index.tsx`：侧边栏、项目画布、布局、主题和项目 AI 会话。
- `src/index.ts`：插件服务端入口；本地文件夹选择和目录创建复用 DSH 原生 `uiWorkspace` 能力。

`lib/` 中包含已构建的插件入口，因此从 GitHub 获取后可以直接由 DSH profile 加载。

## 当前限制

- “接入本地项目”会打开本机文件夹选择器，并将所选目录注册为 DSH 工作区；不会自动执行 `git clone`。
- “AI 创建新项目”先创建空目录，再由构建模式 AI 根据用户要求生成项目。
- 数据库、业务 API 和实时数据源需要后续增加项目级适配器。

## License

No license has been granted yet. The source is public for inspection and collaboration; reuse rights remain reserved unless a license is added later.
