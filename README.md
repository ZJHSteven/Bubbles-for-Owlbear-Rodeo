# Stat Bubbles for D&D（Owlbear Rodeo 扩展）

> 汉化声明：本仓库为上游插件 “Stat Bubbles for D&D” 的简体中文本地化版本，仅对界面文案与文档进行汉化，不修改功能与逻辑。原项目与作者：Seamus Finlayson（上游仓库：https://github.com/SeamusFinlayson/Bubbles-for-Owlbear-Rodeo）。如需英文文档、提交 Issue 或功能请求，请前往上游仓库。

使用此 [Owlbear Rodeo](https://www.owlbear.rodeo/) 扩展在桌面上追踪并显示 D&D 的属性：生命值（当前/上限/临时）与护甲等级（AC）。

![Stat Bubbles GitHub Image](https://github.com/SeamusFinlayson/Bubbles-for-Owlbear-Rodeo/assets/77430559/6e2bcd42-d59e-4482-8fc9-c514bfd3a1c5)

## 安装

从 [Owlbear Rodeo 商店](https://extensions.owlbear.rodeo/bubble-tracker) 安装本扩展。

## 工作原理

此扩展提供一种简单方式来追踪：

- 当前生命值（HP）
- 生命值上限（Max HP）
- 临时生命值（Temp HP）
- 护甲等级（AC）

扩展还包括：

- 针对单个棋子的“对玩家隐藏属性”开关
- 永不与生命条重叠的名称标签
- 应用范围效果（AOE）法术的快捷工具
- 可配置生命条的位置与样式
- 可选向玩家展示“分段式敌人生命条”

### 基础操作

在棋子上点击鼠标右键打开“上下文菜单”，即可编辑其属性。

<img name="Player Context Menu" src="https://github.com/user-attachments/assets/476d0377-19ff-4f3c-a50f-df62c38adaa7" width=300>

**扩展支持行内运算（Inline Math）**：重复计算更轻松。在 HP 输入框中输入 `+6` 回车即加 6，输入 `-6` 回车即减 6。该能力适用于每一个属性输入框。

<img name="Inline Math Demo" src="https://github.com/user-attachments/assets/440423a0-3ee7-4f2e-9a36-c65da92b354e" width=600>

赶时间？按下 **Tab** 可在多个气泡输入框之间循环切换焦点。

扩展支持 **Prop**、**Mount**、**Character** 三个图层上的棋子。

当“生命值上限”输入框中存在大于 0 的数值时，将**自动创建**生命条；临时生命值与护甲等级的气泡亦同理。

### 游戏主持人（GM / DM）

GM 可使用更多配置选项。

点击上下文菜单底部的按钮，GM 可以禁止玩家查看棋子的属性。

<img name="GM Context Menu" src="https://github.com/user-attachments/assets/fbdc127d-41cc-4023-90fd-575909ad5569" width=300>

### 动作菜单（Action Menu）

动作菜单在同一处集中管理房间内的所有棋子。

可快速应用 AOE 效果，或使用内置操作批量修改多个棋子的属性。

你可以通过命令行公开或私密地掷骰；掷骰结果会记录在场景的掷骰日志中。支持的掷骰语法参考 [RPG Dice Roller 文档](https://dice-roller.github.io/documentation/guide/notation/)。

![Action Menu](https://github.com/user-attachments/assets/86d39c02-219d-47b6-986d-6f5785e71d07)

### 名称标签（Name Tags）

可在设置菜单中启用名称标签。启用后，玩家与 GM 都可以在上下文菜单内为棋子设置名称。自动填充图标会将名称设为“无障碍（Accessibility）设置”中的棋子名称。你为棋子设置的名称也会显示在先攻追踪类扩展中。

<img name="Name tag context menu" src="https://github.com/user-attachments/assets/9f349b52-4918-464c-99ff-7db63550e31d" width=300>

### 设置（Settings）

设置菜单允许 GM 根据自己的需求自定义扩展行为。包含“房间级（Room）设置”，对当前房间打开的所有场景生效；以及“场景级（Scene）设置”，可覆盖房间设置，并在查看该场景时始终生效。

![Settings Menu](https://github.com/user-attachments/assets/a8758eca-e727-4509-933d-456c57210fc9)

### 卸载

卸载扩展后请刷新页面，以清除场景中的生命条与属性气泡。卸载操作**不会**删除棋子数据。

## 功能请求（Feature Requests）

作者可能会接受功能请求，但由于个人时间有限且有自己的开发计划，如希望更高优先级实现，成为 [Patreon](https://www.patreon.com/SeamusFinlayson) 付费会员是最可行路径。

## 支持与反馈（Support）

如需支持，可在 [Owlbear Rodeo 官方 Discord](https://discord.gg/yWSErB6Qaj) 联系 @Seamus，或在 [GitHub](https://github.com/SeamusFinlayson/Bubbles-for-Owkbear-Rodeo) 提交 Issue。

如果你喜欢本扩展，也欢迎在 [Patreon](https://www.patreon.com/SeamusFinlayson) 支持作者；成为免费关注者也可以获取更新动态。

## 构建（Building）

本项目使用 [pnpm](https://pnpm.io/) 作为包管理器。

- 安装依赖：`pnpm install`
- 开发调试：`pnpm dev`
- 生产构建：`pnpm build`

## 许可证（License）

GNU GPLv3

## 贡献与再发布（Contributing）

Copyright (C) 2023 Owlbear Rodeo

Copyright (C) 2023 Seamus Finlayson

欢迎 Fork；但如果要将你的版本发布到商店，请不要使用本扩展的名称或 Logo。作者通常不接受 Pull Request。
