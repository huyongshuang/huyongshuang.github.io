---
title: Implement Colored Text in Hexo
date: 2024-12-13 19:36:43
updated:
tags:
categories:
keywords:
description: "Methods to implement colored text in Hexo: 1. CSS style attribute; 2. JavaScript script implementation."
top_img:
cover:
---

# Method 1: CSS style Attribute

```markdown
<!-- Basic Usage: Set font color -->
<p style="color: red;">This text is red</p>

<!-- Use hexadecimal color codes (more accurate) -->
<p style="color: #1E90FF;">This text is dark blue (Dodger Blue)</p>

<!-- Use RGB/RGBA (supports transparency) -->
<p style="color: rgb(255, 165, 0);">This text is orange</p>
<p style="color: rgba(0, 128, 0, 0.7);">This text is semi-transparent green</p>

<!-- Combine with bold and other styles -->
<p style="color: purple; font-weight: bold;">This purple text is bold</p>
```

Preview:
<p style="color: red;">This text is red</p>
<p style="color: #1E90FF;">This text is dark blue (Dodger Blue)</p>
<p style="color: rgb(255, 165, 0);">This text is orange</p>
<p style="color: rgba(0, 128, 0, 0.7);">This text is semi-transparent green</p>
<p style="color: purple; font-weight: bold;">This purple text is bold</p>

{% color blue 25px %}Screen Color Picker{% endcolor %}
If you need color codes in `HEX`, `RGB`, `RGBA`, `HSL`, `HSLA`, `HSV`, `HSVA`, `CMYK`, `CMYKA` formats for a specific color, you can extract them using the tool below.
{% btn '/2024/12/10-color-picker/',Screen Color Picker,fas fa-eye-dropper,blue outline block center larger %}

# Method 2: JavaScript Script

Create a folder named `scripts` in the Hexo root directory, create a JavaScript file named `color-text.js` inside the folder, and paste the code below into it. Or click <a href="{% asset_path color-text.js %}" download="color-text.js">**Download**</a> the `color-text.js` file.

```javascript
hexo.extend.tag.register('color', function (args, content) {
    const color = args[0] || 'black';
    return `<span style="color: ${color};">${content}</span>`;
}, { ends: true });
```

You can use it in Markdown as follows:
```markdown
{% color red %}This text is red{% endcolor %}
{% color #FF69B4 %}This text is pink{% endcolor %}
{% color green %}This text is green{% endcolor %}
```

Preview:
{% color red %}This text is red{% endcolor %}  
{% color #FF69B4 %}This text is pink{% endcolor %}  
{% color green %}This text is green{% endcolor %}

**Extension**: Support dual parameters for color + font size (<a href="{% asset_path color-text-extension.js %}" download="color-text-extension.js">**Download**</a> the `color-text-extension.js` file.)

```javascript
hexo.extend.tag.register('color', function (args, content) {
    const color = args[0] || 'black';
    const size = args[1] || '';
    let style = `color: ${color};`;
    if (size) style += `font-size:${size};`
    return `<span style="${style}">${content}</span>`;
}, { ends: true });
```

Usage Format:
```markdown
{% color red 27px %}This text is red with font size 27px{% endcolor %}
```

Preview:
{% color red 27px %}This text is red with font size 27px{% endcolor %}