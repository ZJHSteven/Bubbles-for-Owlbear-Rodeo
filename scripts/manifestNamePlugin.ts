/**
 * 构建期改写 dist/manifest.json 的 name 字段（不改动源码）。
 *
 * 使用方式：
 * - 设置环境变量 `VITE_PLUGIN_NAME` 指定最终名称；
 * - 若未设置，则保持 public/manifest.json 原值不变；
 * - 可在 CI 中按分支传入不同值，例如 dev 分支传入 "test"，master 传入 "DnD 状态气泡"。
 *
 * 设计取舍：
 * - 仅在打包产物阶段改写，避免源码来回切换导致误合并；
 * - 不依赖 Vite 的 public 复制阶段，直接在 Rollup `generateBundle` 钩子里修改输出文件。
 */
import type { Plugin, OutputAsset } from "vite";

export default function manifestNamePlugin(): Plugin {
  return {
    name: "manifest-name-plugin",
    apply: "build",
    generateBundle(_, bundle) {
      const desiredName = process.env.VITE_PLUGIN_NAME;
      if (!desiredName) return; // 未设置则不改动

      const file = bundle["manifest.json"] as OutputAsset | undefined;
      if (!file || typeof file.source !== "string") return;

      try {
        const json = JSON.parse(file.source);
        json.name = desiredName;
        file.source = JSON.stringify(json, null, 2);
        this.warn(`manifest.json.name 已重写为: ${desiredName}`);
      } catch (e) {
        this.error(`重写 manifest.json 失败: ${(e as Error).message}`);
      }
    },
  };
}

