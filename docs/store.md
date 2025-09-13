---
title: Stat Bubbles for D&D
description: Health Bars and Armor Class for your D&D adventures!
author: Seamus Finlayson
image: https://github.com/SeamusFinlayson/Bubbles-for-Owlbear-Rodeo/assets/77430559/6e2bcd42-d59e-4482-8fc9-c514bfd3a1c5
icon: https://owlbear-rodeo-bubbles-extension.onrender.com/logo.png
tags:
  - combat
manifest: https://owlbear-rodeo-bubbles-extension.onrender.com/manifest.json
learn-more: https://github.com/SeamusFinlayson/Bubbles-for-Owkbear-Rodeo
---

# Stat Bubbles for D&D（扩展商店页面文案）

> 汉化声明：本文件为扩展商店展示页面的中文文案。内容基于上游仓库的英文原文翻译，仅做本地化，不改变文件头部 Front Matter。上游项目：https://github.com/SeamusFinlayson/Bubbles-for-Owlbear-Rodeo

_为你的 D&D 冒险提供生命条与护甲等级展示！_

## 工作原理（How it works）

此扩展可便捷地追踪：

- 当前生命值（Current HP）
- 生命值上限（Hit Point Maximum）
- 临时生命值（Temporary HP）
- 护甲等级（Armor Class, AC）

其他特性：

- 针对单个棋子的“对玩家隐藏属性”开关
- 永不与生命条重叠的名称标签
- 应用范围效果（AOE）法术的便捷工具
- 配置生命条位置的设置项
- 可选向玩家展示“分段式敌人生命条”

### 基础（The Basics）

在棋子上点击**右键**打开**上下文菜单**，即可编辑属性。

<img name="Player Context Menu" src="https://github.com/user-attachments/assets/476d0377-19ff-4f3c-a50f-df62c38adaa7" width=300>

**行内运算更省心！** 在输入框中键入 `+6` 回车即可为 HP 加 6；输入 `-6` 回车即可减 6。对所有属性均适用。

<img name="Inline Math Demo" src="https://github.com/user-attachments/assets/440423a0-3ee7-4f2e-9a36-c65da92b354e" width=600>

赶时间？按 **Tab** 在各个气泡输入框间循环切换。

扩展支持 **Prop**、**Mount**、**Character** 三个图层上的棋子。

当“生命值上限”大于 0 时会**自动创建**生命条；临时 HP 与 AC 气泡同理。

### 游戏主持人（GM / DM）

GM 可使用更多配置选项。

在上下文菜单底部点击按钮，GM 可禁止玩家查看棋子的属性。

<img name="GM Context Menu" src="https://github.com/user-attachments/assets/fbdc127d-41cc-4023-90fd-575909ad5569" width=300>

### 动作菜单（Action Menu）

动作菜单集中展示房间内的所有棋子。

可快速应用 AOE 效果，或用内置操作批量修改多个棋子。

通过命令行可以公开或私密地掷骰；掷骰结果会记录在场景掷骰日志中。支持的掷骰语法参见 [RPG Dice Roller](https://dice-roller.github.io/documentation/guide/notation/)。

![Action Menu](https://github.com/user-attachments/assets/86d39c02-219d-47b6-986d-6f5785e71d07)

### 名称标签（Name tags）

可在设置菜单启用名称标签。启用后，玩家与 GM 均可在上下文菜单中为棋子设置名称。自动填充图标会将标签设为无障碍设置里的棋子名称。设置的名称也会出现在先攻追踪类扩展中。

<img name="Name tag context menu" src="https://github.com/user-attachments/assets/9f349b52-4918-464c-99ff-7db63550e31d" width=300>

### 设置（Settings）

设置菜单允许 GM 自定义扩展以更贴合自身需求。包含房间级设置（对该房间打开的所有场景生效）与场景级设置（覆盖房间设置，在查看该场景时始终生效）。

![Settings Menu](https://github.com/user-attachments/assets/a8758eca-e727-4509-933d-456c57210fc9)

### 卸载（Uninstalling）

卸载扩展后请刷新页面以清理场景内的生命条与属性气泡。卸载**不会**删除棋子数据。

## 功能请求（Feature Requests）

作者可能会接受功能请求，但由于时间有限且有既定计划，如需提高实现优先级，可考虑成为其 [Patreon](https://www.patreon.com/SeamusFinlayson) 的付费成员。

## 支持（Support）

如需支持，可在 [Owlbear Rodeo Discord](https://discord.gg/yWSErB6Qaj) 联系 @Seamus，或在 [GitHub](https://github.com/SeamusFinlayson/Bubbles-for-Owkbear-Rodeo) 提交 Issue。

如果你喜欢该扩展，也欢迎在 [Patreon](https://www.patreon.com/SeamusFinlayson) 支持作者；免费关注也可以获得更新。
