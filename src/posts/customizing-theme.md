---
title: Customizing the Theme
date: 2025-12-04
description: Explore the various customization options available in ShokaX theme configuration.
tags: [customization, config, styling]
categories: [Advanced, Tutorial]
draft: false
---

# remark 插件综合测试文档

本文件用于测试以下插件：

* remarkMath
* remarkRubyDirective
* remarkIns
* remarkDirective
* remarkGfm
* remarkEmoji
* remarkExtendedTable

---

## 1. remarkMath（数学公式）

行内公式示例：

当 $a^2 + b^2 = c^2$ 时，这是一个直角三角形。

块级公式示例：

$$
\int_0^\infty e^{-x^2} , dx = \frac{\sqrt{\pi}}{2}
$$

---

## 2. remarkRubyDirective（注音 / Ruby）

WIP

---

## 3. remarkIns（插入文本）

使用 ++ 语法表示插入内容：

这是一个 ++新增的内容++，用于测试 remark-ins。

---

## 4. remarkDirective（通用指令）

自定义容器指令示例：

自定义文本指令示例：

:badge

---

## 5. remarkGfm（GitHub Flavored Markdown）

### 任务列表

* [x] 已完成任务
* [ ] 未完成任务

### 删除线

~~这是一段被删除的文本~~

### 自动链接

[https://github.com](https://github.com)

---

## 6. remarkEmoji（Emoji）

常用表情示例：

:smile: :rocket: :thinking: :tada:

句子中使用 Emoji：

Markdown 真好用 :heart:，插件更多 :fire:

---

## 7. remarkExtendedTable（扩展表格）

支持对齐、合并等特性：

|  功能  | 插件                  | 说明       |
| :--: | :------------------ | :------- |
| 数学公式 | remarkMath          | 支持 LaTeX |
|  注音  | remarkRubyDirective | Ruby 标注  |
|  插入  | remarkIns           | ++插入文本++ |

带有合并单元格的示例（如果已启用）：

| 模块 | 描述   | 备注      |
| -- | ---- | ------- |
| A  | ^    | 单元格向上合并 |
| B  | 普通内容 | -       |

---

## 8. 综合示例

学习 ++Markdown++ 和 :ruby 插件可以显著提升文档表达能力。 :sparkles:
