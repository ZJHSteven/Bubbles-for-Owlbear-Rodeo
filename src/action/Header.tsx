import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Command from "./Command";
import { Action, BulkEditorState, Operation } from "./types";
import { Button } from "@/components/ui/button";
import { GearIcon } from "@radix-ui/react-icons";
import OBR from "@owlbear-rodeo/sdk";
import { getPluginId } from "@/getPluginId";
import LinkButton from "@/settings/LinkButton";
import { Patreon } from "@/components/icons/Patreon";
import { QuestionMark } from "@/components/icons/QuestionMark";
import { History } from "@/components/icons/History";
import { Bug } from "@/components/icons/bug";

export default function Header({
  appState,
  dispatch,
  playerRole,
  playerName,
}: {
  appState: BulkEditorState;
  dispatch: React.Dispatch<Action>;
  playerRole: "PLAYER" | "GM";
  playerName: string;
}): JSX.Element {
  return (
    <div className="flex gap-2 p-4 pb-2 pt-3">
      <Command
        dispatch={dispatch}
        playerRole={playerRole}
        playerName={playerName}
      ></Command>
      {playerRole === "GM" ? (
        <>
          <Select
            value={appState.operation}
            onValueChange={(value) => {
              dispatch({
                type: "set-operation",
                operation: value as Operation,
              });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="编辑模式" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>操作</SelectLabel>
                <SelectItem value="none">无</SelectItem>
                <SelectItem value="damage">伤害</SelectItem>
                <SelectItem value="healing">治疗</SelectItem>
                <SelectItem value="overwrite">批量覆盖</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            size={"icon"}
            variant={"outline"}
            className="shrink-0"
            onClick={async () => {
              const themeMode = (await OBR.theme.getTheme()).mode;
              OBR.popover.open({
                id: getPluginId("settings"),
                url: `/src/settings/settings.html?themeMode=${themeMode}`,
                height: 500,
                width: 400,
              });
            }}
          >
            <GearIcon className="size-5" />
          </Button>
        </>
      ) : (
        <div className="flex gap-2">
          <LinkButton
            name="赞助 Patreon"
            icon={<Patreon />}
            href={"https://www.patreon.com/SeamusFinlayson"}
          />
          <LinkButton
            name="更新日志"
            icon={<History />}
            href={"https://www.patreon.com/collection/306916?view=expanded"}
          />
          <LinkButton
            name="使用说明"
            icon={<QuestionMark />}
            href={
              "https://github.com/SeamusFinlayson/Bubbles-for-Owlbear-Rodeo?tab=readme-ov-file#how-it-works"
            }
          />
          <LinkButton
            name="反馈问题"
            icon={<Bug />}
            href="https://discord.gg/WMp9bky4be"
          />
        </div>
      )}
    </div>
  );
}
