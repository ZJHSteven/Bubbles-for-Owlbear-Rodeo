 # Repository Guidelines

 > 本文是 Bubbles for Owlbear Rodeo 的贡献者快速上手指南；请在提交代码前通读。内容以本仓库实际结构与工具链为准，保持简洁、可执行。

 ## 项目结构与模块组织
 - 入口与静态资源：`index.html`、`public/`。
 - 源码：`src/`（TypeScript + React）。按功能域分层：`action/`、`background/`、`contextMenu/`、`settings/`、`components/`、`metadataHelpers/`、通用工具在根级 `src/*.ts(x)`。
 - 构建与配置：`vite.config.ts`、`tsconfig*.json`、`tailwind.config.js`、`postcss.config.js`。
 - 文档：`docs/`。

 ## 构建、开发与本地运行
 - `pnpm dev`：启动 Vite 开发服务器（热更新）。
 - `pnpm build`：`tsc` 类型检查并产物打包到 `dist/`。
 - `pnpm preview`：本地预览打包产物。
 - 环境：Node >= 20，包管理器使用 `pnpm`（见 `package.json` 的 `packageManager` 字段）。

 ## 代码风格与命名
 - 语言：TypeScript、React 18 函数组件；避免任何隐式 `any`。
 - 格式：统一使用 Prettier（含 tailwind 插件），两空格缩进；提交前请确保已格式化。
 - 命名：
   - 文件：组件用 `PascalCase.tsx`（如 `StatInput.tsx`）；工具/常量用 `camelCase.ts`。
   - 目录：按功能域划分，避免超长文件；单一职责、拆分可复用 UI 至 `src/components/`。

 ## 测试指南
 - 当前未内置测试框架；推荐后续引入 Vitest + React Testing Library。
 - 约定位置：与源码同层 `__tests__/` 或 `*.test.ts(x)`；覆盖关键逻辑（如 `metadataHelpers/` 与 `healthCalculations.ts`）。

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
