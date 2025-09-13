# Repository Guidelines（贡献者指南）

> 本文是 Bubbles for Owlbear Rodeo 的贡献者快速上手指南；请在提交代码前通读。内容以本仓库实际结构与工具链为准，保持简洁、可执行。

## 项目结构与模块组织
- 入口与静态资源：`index.html`、`public/`。
- 源码：`src/`（TypeScript + React）。按功能域分层：`action/`、`background/`、`contextMenu/`、`settings/`、`components/`、`metadataHelpers/`，通用工具在根级 `src/*.ts(x)`。
- 构建与配置：`vite.config.ts`、`tsconfig*.json`、`tailwind.config.js`、`postcss.config.js`。
- 文档：`docs/`、本文件 `AGENTS.md`。

## Git 远端与 Fork 策略
- 远端命名（已配置）：
  - `origin` 指向你的个人 fork（示例：`https://github.com/<你的用户名>/Bubbles-for-Owlbear-Rodeo.git`）。
  - `upstream` 指向上游原仓库（`https://github.com/SeamusFinlayson/Bubbles-for-Owlbear-Rodeo.git`）。
- 常用命令：
  - 查看远端：`git remote -v`
  - 同步上游默认分支：`git fetch upstream && git checkout master && git merge upstream/master`
  - 推送到自己仓库：`git push origin master`（或推送你自己的特性分支）。
  - 通过 GitHub 发起 PR：从 `origin/<branch>` 向 `upstream/master` 提 PR。
- 若本地是直接克隆上游，可用 `gh repo fork --remote` 一键创建 fork 并自动重定向 `origin` 与添加 `upstream`。

## 构建、开发与本地运行
- Node 版本：`>= 20`（项目 `package.json` 的 `engines.node` 指定 `^20.11.0`）。
- 包管理器：使用 `pnpm`，并遵循 `packageManager` 钉死的版本（示例：`pnpm@9.0.6`）。
- 一次性初始化：
  - 启用 Corepack：`corepack enable`
  - 激活固定 pnpm 版本：`corepack prepare pnpm@<版本> --activate`
- 开发与构建：
  - 安装依赖：`pnpm install`
  - 开发调试：`pnpm dev`（Vite 开发服务器，热更新）
  - 产物构建：`pnpm build`（先 `tsc` 类型检查，再打包到 `dist/`）
  - 本地预览：`pnpm preview`
- 常见提示：
  - Browserslist 过期提示可选运行：`npx update-browserslist-db@latest`（不影响构建）。

## 代码风格与命名
- 语言：TypeScript、React 18 函数组件；避免任何隐式 `any`。
- 格式：统一使用 Prettier（含 tailwind 插件），两空格缩进；提交前请确保已格式化。
- 命名：
  - 文件：组件用 `PascalCase.tsx`（如 `StatInput.tsx`）；工具/常量用 `camelCase.ts`。
  - 目录：按功能域划分，避免超长文件；单一职责、可复用 UI 拆分至 `src/components/`。

## 提交与 Pull Request
- 提交信息：采用 Conventional Commits，例如：
  - `feat(action): 新增批量编辑面板`
  - `fix(background): 修复全局设置读取异常`
  - `docs: 补充使用文档与截图`
- PR 要求：
  - 明确意图与影响范围，链接相关 issue；
  - 附关键运行/构建输出或截图；
  - 自检清单：本地构建通过、无 `eslint/prettier` 警告（若启用）、无多余文件与调试代码。

## 安全与配置提示
- 插件 ID 与集成：相关逻辑集中在 `src/getPluginId.ts` 与各 `*/*.html` 入口，请勿硬编码敏感标识。
- 资源体积：关注 `public/` 与组件依赖，避免引入过大包体。

## 本次环境与操作记录（自动更新）
- 远端已规范化：`origin` → 你的 fork；`upstream` → 上游仓库。
- 已安装依赖并完成构建验证：`pnpm install`、`pnpm build` 成功。
- 若锁文件更新，请执行：`git add pnpm-lock.yaml && git commit -m "chore(deps): 更新锁文件"` 并 `git push`。
 - 2025-09-13：
   - 删除 `README.zh-CN.md`，统一以 `README.md` 提供中文说明。
   - 重写 `README.md`：添加汉化声明与上游链接，正文为上游 README 全量中文翻译。
   - 翻译 `docs/store.md`：保留 Front Matter 不变，仅翻译正文并添加汉化声明。

## i18n（简体中文汉化）
- 已将前端所有用户可见文案替换为简体中文，包括：设置页、动作面板、批量编辑、右键菜单、掷骰命令提示、HTML 标题、manifest 名称与描述等。
- 采用“直接替换静态文案”的最简方案，避免过度抽象；如后续需要多语言切换，可在 `src/` 引入极简 `i18n` 映射，并逐步用 `t('key')` 过渡。
- 文档：统一以中文 `README.md` 提供说明；不再维护 `README.zh-CN.md`，确保单一来源。
- 提交规范：已按 Conventional Commits 拆分多次提交，便于 Review。
