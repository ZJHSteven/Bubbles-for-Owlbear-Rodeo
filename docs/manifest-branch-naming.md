# 按分支/环境区分插件名称（manifest.name）

> 目标：不改动源码 `public/manifest.json` 的前提下，在构建产物 `dist/manifest.json` 中按环境注入不同的 `name`，用于区分 dev（测试）与 master（线上）。

## 背景与原则
- OBR 扩展显示名称来源于发布站点根部的 `manifest.json`，本仓库打包后文件位于 `dist/manifest.json`。
- 直接修改 `public/manifest.json` 容易在分支合并时把“test 名称”带到 `master`。
- 因此我们采用“构建期改写产物”的方式：源码保持不变，按环境变量覆盖输出。

## 使用方法
1) 已内置 Vite 插件：`scripts/manifestNamePlugin.ts`。
2) 构建时设置环境变量 `VITE_PLUGIN_NAME`：

```bash
# 示例一：本地测试（dev 分支）
VITE_PLUGIN_NAME="test" pnpm build

# 示例二：线上构建（master 分支）
VITE_PLUGIN_NAME="DnD 状态气泡" pnpm build
```

3) 结果：
- 打包阶段插件会在 Rollup `generateBundle` 钩子里查找 `manifest.json`，重写 `name` 字段为 `VITE_PLUGIN_NAME`，并输出提示日志：`manifest.json.name 已重写为: ...`。

## GitHub Actions（可选示例）
若使用 GitHub Actions 部署 Pages，可在不同分支的 Job 中注入不同变量：

```yaml
name: Build and Deploy
on:
  push:
    branches: [ master, dev ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: corepack enable && corepack prepare pnpm@9.0.6 --activate
      - run: pnpm install
      - name: Build
        run: pnpm build
        env:
          VITE_PLUGIN_NAME: ${{ github.ref_name == 'dev' && 'test' || 'DnD 状态气泡' }}
      # 后续部署到 Pages/gh-pages ...
```

## 常见问题
- 未设置 `VITE_PLUGIN_NAME` 会怎样？
  - 插件保持沉默，不做任何改动；最终名称即 `public/manifest.json` 原值。
- 这会影响本地开发 `pnpm dev` 吗？
  - 不会。插件只在 `build` 过程中生效（`apply: 'build'`）。

## 变更记录
- 2025-09-13：引入构建期改写插件与文档，避免因分支合并误带测试名称到 `master`。

