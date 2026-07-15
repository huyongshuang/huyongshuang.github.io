---
title: Hexo 实现彩色字体
date: 2024-12-13 19:36:43
updated:
tags:
categories:
keywords:
description: Hexo 实现彩色字体方法：1、CSS style 属性；2、利用 JavaScript 脚本实现。
top_img:
cover:
---

# 方法一：CSS style 属性

```markdown
<!-- 基础用法：设置字体颜色 -->
<p style="color: red;">这段文字是红色的</p>

<!-- 使用十六进制颜色码（更精准） -->
<p style="color: #1E90FF;">这段文字是深蓝色的（道奇蓝）</p>

<!-- 使用 RGB/RGBA（支持透明度） -->
<p style="color: rgb(255, 165, 0);">这段文字是橙色的</p>
<p style="color: rgba(0, 128, 0, 0.7);">这段文字是半透明的绿色</p>

<!-- 结合加粗等样式 -->
<p style="color: purple; font-weight: bold;">这段紫色文字是加粗的</p>
```

效果：
<p style="color: red;">这段文字是红色的</p>
<p style="color: #1E90FF;">这段文字是深蓝色的（道奇蓝）</p>
<p style="color: rgb(255, 165, 0);">这段文字是橙色的</p>
<p style="color: rgba(0, 128, 0, 0.7);">这段文字是半透明的绿色</p>
<p style="color: purple; font-weight: bold;">这段紫色文字是加粗的</p>

{% color blue 25px %}屏幕颜色拾取器{% endcolor %}
如果你需要某一颜色的 `HEX`、`RGB`、`RGBA`、`HSL`、`HSLA`、`HSV`、`HSVA`、`CMYK`、`CMYKA` 格式颜色码，可以使用下方工具来提取。
{% btn '/2024/12/10-color-picker/',屏幕颜色拾取器,fas fa-eye-dropper,blue outline block center larger %}

# 方法二：JavaScript 脚本

在 Hexo 根目录创建一个 `scripts` 文件夹，在文件夹里创建一个名为 `color-text.js` 的 JavaScript 文件，并将下面的代码写入。或者点击 <a href="{% asset_path color-text.js %}" download="color-text.js">**下载**</a> `color-text.js` 文件。

```javascript
hexo.extend.tag.register('color', function (args, content) {
    const color = args[0] || 'black';
    return `<span style="color: ${color};">${content}</span>`;
}, { ends: true });
```

之后在 Markdown 中就可以这样用：
```markdown
{% color red %}这段文字是红色的{% endcolor %}
{% color #FF69B4 %}这段文字是粉色的{% endcolor %}
{% color green %}这段文字是绿色的{% endcolor %}
```

效果：
{% color red %}这段文字是红色的{% endcolor %}<br>
{% color #FF69B4 %}这段文字是粉色的{% endcolor %}<br>
{% color green %}这段文字是绿色的{% endcolor %}

**扩展**：支持颜色 + 字号双参数（<a href="{% asset_path color-text-extension.js %}" download="color-text-extension.js">**下载**</a> `color-text-extension.js` 文件）

```javascript
hexo.extend.tag.register('color', function (args, content) {
    const color = args[0] || 'black';
    const size = args[1] || '';
    let style = `color: ${color};`;
    if (size) style += `font-size:${size};`
    return `<span style="${style}">${content}</span>`;
}, { ends: true });
```

使用格式：
```markdown
{% color red 27px %}这段文字是红色的 27 号字{% endcolor %}
```

效果：
{% color red 27px %}这段文字是红色的 27 号字{% endcolor %}