import OBR from "@owlbear-rodeo/sdk";
import { createRoot } from "react-dom/client";
import StatsMenuApp from "./StatsMenuApp";
import {
  getSelectedItems,
  parseItems,
} from "../metadataHelpers/itemMetadataHelpers";
import { addThemeToBody } from "@/colorHelpers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getName } from "@/metadataHelpers/nameHelpers";
import getGlobalSettings from "@/background/getGlobalSettings";

// 极简骨架组件：
// 目的：在数据尚未就绪时先渲染一个可见占位，提升“可见首帧”，
// 避免用户误以为点击无响应；仅包含最小样式，避免额外开销。
function LoadingSkeleton() {
  return (
    <div
      className="flex h-full w-full items-center justify-center text-sm text-text-secondary dark:text-text-secondary-dark"
      aria-live="polite"
      aria-busy="true"
    >
      正在加载编辑面板…
    </div>
  );
}

// 极简错误提示组件：
// 目的：在异常情况下向用户呈现可理解的中文错误信息，
// 同时不暴露实现细节；便于后续埋点与问题定位。
function ErrorFallback({ message }: { message: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-2 text-center text-sm text-red-600 dark:text-red-300">
      打开“编辑属性”失败：{message}
    </div>
  );
}

OBR.onReady(async () => {
  // 1) 主题尽早应用，避免“闪白/闪暗”；
  addThemeToBody();

  // 2) 立即渲染骨架占位，减少首帧空白时间；
  const root = createRoot(document.getElementById("app") as HTMLDivElement);
  root.render(<LoadingSkeleton />);

  try {
    // 3) 并发获取必要数据；保持最小集，避免不必要的等待：
    const [selectedItems, role, sceneMetadata, roomMetadata] = await Promise.all([
      getSelectedItems(),
      OBR.player.getRole(),
      OBR.scene.getMetadata(),
      OBR.room.getMetadata(),
    ]);

    // 4) 基础校验（只允许单选），失败则友好提示：
    if (selectedItems.length !== 1) {
      root.render(<ErrorFallback message="仅支持选中 1 个棋子" />);
      return;
    }

    // 5) 解析初始渲染所需的最小数据集；其余逻辑在组件内部异步更新。
    const initialTokens = parseItems(selectedItems);
    const initialName = getName(selectedItems[0]);
    const initialNameTagsEnabled = (
      await getGlobalSettings(undefined, sceneMetadata, roomMetadata)
    ).settings.nameTags;

    root.render(
      <TooltipProvider>
        <StatsMenuApp
          initialToken={initialTokens[0]}
          initialTokenName={initialName}
          initialNameTagsEnabled={
            typeof initialNameTagsEnabled === "boolean"
              ? initialNameTagsEnabled
              : false
          }
          role={role}
        />
      </TooltipProvider>,
    );
  } catch (e) {
    // 6) 统一错误兜底（教学向说明）：
    //    - 将异常转为可读中文信息，保持 UI 不空白；
    //    - 不直接抛出到顶层，避免宿主侧误报。
    const msg = e instanceof Error ? e.message : String(e);
    root.render(<ErrorFallback message={msg} />);
  }
});
