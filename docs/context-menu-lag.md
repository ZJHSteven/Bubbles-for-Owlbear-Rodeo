# 上下文菜单“编辑属性”（Edit Stats）加载缓慢与渲染缺失分析

> 面向贡献者的排障与优化笔记（教学向）：解释现象、定位路径、成因与改法，便于后续在 dev 分支安全推进修复。

## 概览
- 插件技术栈：TypeScript + React 18 + TailwindCSS + Radix UI（shadcn/ui），构建器 Vite 5；宿主集成通过 `@owlbear-rodeo/sdk` v3。
- 右键菜单注册：后台脚本 `src/background/contextMenuItems.ts` 使用 `OBR.contextMenu.create({ embed: { url, height } })` 在上下文菜单里“嵌入”一个 iframe 页面。
- 菜单页面入口：`src/contextMenu/contextMenu.html` → `src/contextMenu/main.tsx` → 渲染 `StatsMenuApp.tsx`。
- 版本信息：`package.json` 显示当前插件版本 `1.9.3`。

## 用户可见症状
- 右键打开“编辑属性”面板首开需约 1–2 秒才出现完整 UI。
- 偶发“只渲染出裸输入框”，而周边文字/圆环/装饰未出现；随后短暂恢复或在交互后补齐。

## 复现步骤（最小）
1. 在地图中选中 1 个棋子，右键打开上下文菜单。
2. 点击“编辑属性”（或使用快捷键 `Shift + S`）。
3. 观察菜单弹出：首次常见明显延迟；偶发 UI 仅显示输入框，无提示文本与图形。

## 首屏渲染路径（Why 首开慢）
- 背景脚本仅“注册”菜单项，不预渲染页面。
- 用户点击后，宿主以 iframe 加载 `contextMenu.html`；HTML 通过 `type=module` 拉取若干打包后的模块与样式（详见 `dist/src/contextMenu/contextMenu.html` 的 `modulepreload` 列表）。
- JS 运行后在 `OBR.onReady` 中并发获取：当前选中项、玩家角色、场景与房间 metadata；待全部返回后再挂载 React 根组件并渲染。

## 已定位的代码层面问题（可确定）
1) 订阅泄漏（会叠加拖慢与造成异常重渲染）
- 文件：`src/contextMenu/StatsMenuApp.tsx`
- 问题：两处 `useEffect` 注册 `OBR.scene.onMetadataChange` 与 `OBR.room.onMetadataChange` 时未传依赖数组，也未返回清理函数；这会在每次渲染后重复注册监听且从不卸载。
- 影响：事件触发越多回调越多，导致重复状态更新、额外渲染与潜在 UI 同步异常（例如短时间仅见到基础输入框）。
- 规范修复（示意）：
  ```ts
  useEffect(() => {
    const un = OBR.scene.onMetadataChange(async (sceneMetadata) => { /* ... */ });
    return un;
  }, []);

  useEffect(() => {
    const un = OBR.room.onMetadataChange(async (roomMetadata) => { /* ... */ });
    return un;
  }, []);
  ```

2) 首帧阻塞（可见 UI 迟到）
- 文件：`src/contextMenu/main.tsx`
- 问题：在 `OBR.onReady` 内 `await Promise.all([...])` 拿齐数据后再 `createRoot(...).render(...)`。
- 影响：首帧被网络/IPC 往返延迟“推后”；即使资源加载完成，仍需等待这些异步返回才出现任何像素。
- 优化：先快速渲染骨架（Skeleton），随后异步注入真实数据并二次渲染，显著降低“感知延迟”。

3) 首屏体积偏大（非必要模块提前加载）
- 现象：contextMenu 首屏预加载 `tooltip-*`、`colorHelpers-*`、`getPluginId-*` 等多个模块，单看 JS 体积 300–400KB 左右（具体见 `dist/assets/*.js`）。
- 影响：在缓存未命中或网络波动时，1–2 秒延迟常见。
- 优化：将 `StatToolTip` 改为 `React.lazy` 懒加载，仅在输入框聚焦时加载；或提供设置项关闭 tooltip，避免进入首屏包。

4) 微因素
- `contextMenu.html` 中根容器使用 `will-change: contents` 并非最佳选择；可改用 `content-visibility: auto` 或移除，减少多余栅格化准备。

## 与 SDK/宿主关系的判断
- OBR v3 使用 iframe 嵌入上下文菜单是官方与社区通用模式；同类插件也普遍流畅，说明“宿主机制不是主要瓶颈”。
- 本仓库的延迟与偶发不完整渲染主要来源于：组件订阅泄漏 + 首帧阻塞 + 首屏体积无谓膨胀。

## 建议的修复路线（dev 分支推进）
阶段 A（安全、见效快）
- 修复订阅泄漏：为 `scene/room.onMetadataChange` 添加依赖数组与清理函数。
- 降低首帧阻塞：`main.tsx` 先渲染 Skeleton，再异步拉数据二次渲染。

阶段 B（体积优化）
- 懒加载 `StatToolTip`（Radix Tooltip 模块）；无焦点不加载。
- 评估移除或延后加载非首需模块；必要时拆分入口、开启更激进的 `manualChunks`。

阶段 C（体验打磨）
- 轻量骨架样式/占位，避免“空白窗口”。
- 统一输入组件的最小渲染保证（即使图形延迟，也给出文字标签与可编辑状态）。

## 风险与回滚
- A 阶段为逻辑性修复（清理订阅 + 渲染顺序），风险低；出问题可直接回滚对应提交。
- B 阶段为打包策略与懒加载，需回归测试：多次打开/关闭菜单、焦点切换、GM 与 PLAYER 视角。

## 验收标准（建议）
- 首次打开菜单在常规网络下 TTI < 500ms（缓存命中）/ < 1200ms（缓存未命中）。
- 连续打开 20 次，监听器数量不增长（无内存/订阅泄漏）。
- 不再出现“仅输入框，缺少文字与图形”的不完整渲染。

## 相关文件清单
- 右键菜单注册：`src/background/contextMenuItems.ts`
- 菜单入口：`src/contextMenu/contextMenu.html`、`src/contextMenu/main.tsx`
- 菜单主组件：`src/contextMenu/StatsMenuApp.tsx`
- 输入组件：`src/components/BarInput.tsx`、`src/components/BubbleInput.tsx`、`src/components/StatToolTip.tsx`
- 颜色与主题：`src/colorHelpers.tsx`
- 元数据与写入：`src/statInputHelpers.ts`、`src/metadataHelpers/*`

## 后续协作与分支策略
- pages 当前监听 master，不影响线上：所有修复在 `dev` 分支完成并验证。
- PR 模板：清晰描述意图与范围、附 Network 瀑布图/性能截图、勾选“构建通过/无多余文件”。

---
最后更新：由自动化代理在 dev 分支引入本文档；若内容过时，请在本文件顶部追加版本标记并在 AGENTS.md 记录变更。

