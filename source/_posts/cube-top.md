---
title: 三阶魔方顶面还原的所有状态及其变换和还原步骤
date: 2025-01-30 11:45:15
updated:
tags:
  - 教程
  - 魔方公式
categories:
  - 教程
  - 魔方公式
keywords: 教程, 魔方公式
description: 本文主要内容是关于在三阶魔方还原过程中，顶面还原可能会出现的所有状态及其变换和还原步骤。
top_img: 0.png
cover: 0.png
series: cube
---

<style>
.cube-top-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    margin-bottom: 20px;
}

.cube-top-box img {
    pointer-events: none;
    user-select: none;
    display: block;
    margin: 0;
}

.formula-box {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.formula-box .box {
    text-align: left;
    font-size: 18px;
    font-weight: bold;
    line-height: 2;
    letter-spacing: 2px;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}
</style>

{% note blue 'fas fa-cubes' modern %}
文档目录
{% post_link 3×3-cube-formula 三阶魔方公式 %}
{% post_link cube-top 三阶魔方顶面还原的所有状态及其变换和还原步骤 %}
{% post_link 2×2-cube-formula 二阶魔方公式 %}
{% post_link 4×4-cube-formula 四阶魔方公式 %}
{% post_link 5×5-cube-formula 五阶魔方公式 %}
{% post_link rubiks-cube-formula 魔方公式 %}
{% endnote %}

* 下面是三阶魔方顶面还原所有可能的状态：

<div class="cube-top-box">
<img src="{% asset_path 1.png %}" class="no-lightbox">
<img src="{% asset_path 2.png %}" class="no-lightbox">
<img src="{% asset_path 3.png %}" class="no-lightbox">
<img src="{% asset_path 4.png %}" class="no-lightbox">
<img src="{% asset_path 5.png %}" class="no-lightbox">
<img src="{% asset_path 6.png %}" class="no-lightbox">
<img src="{% asset_path 7.png %}" class="no-lightbox">
<img src="{% asset_path 8.png %}" class="no-lightbox">
</div>

* 下面是所有状态的变换和还原：

<div class="formula-box"><div class="box">
公式1：R U R' U R U2 R'<br>
公式2：R U2 R' U' R U' R'
</div></div>

| 状态 | 使用公式1后 | 使用公式2后 | 还原 |
| :---: | :---: | :---: | :---: |
| 目标状态 | Ⅱ-1 | Ⅰ-1 | \ |
| Ⅰ-1 | 目标状态 | Ⅲ-1 | 公式1 |
| Ⅰ-2 | Ⅵ-1 | Ⅳ-4 | U' + 公式1 |
| Ⅰ-3 | Ⅶ-1 | Ⅱ-3 | U2 + 公式1 |
| Ⅰ-4 | Ⅴ-1 | Ⅳ-1 | U + 公式1 |
| Ⅱ-1 | Ⅲ-2 | 目标状态 | 公式2 |
| Ⅱ-2 | Ⅳ-4 | Ⅴ-4 | U' + 公式2 |
| Ⅱ-3 | Ⅰ-3 | Ⅶ-1 | U2 + 公式2 |
| Ⅱ-4 | Ⅳ-1 | Ⅵ-2 | U + 公式2 |
| Ⅲ-1 | Ⅰ-1 | Ⅶ-3 | 公式1 + 公式1 |
| Ⅲ-2 | Ⅶ-3 | Ⅱ-1 | 公式2 + 公式2 |
| Ⅳ-1 | Ⅰ-4 | Ⅱ-4 | 公式1 + U + 公式1 |
| Ⅳ-2 | Ⅵ-4 | Ⅴ-3 | U' + 公式1 + U + 公式1 |
| Ⅳ-3 | Ⅴ-2 | Ⅵ-3 | U + 公式1 + U' + 公式1 |
| Ⅳ-4 | Ⅰ-2 | Ⅱ-2 | 公式1 + U' + 公式1 |
| Ⅴ-1 | Ⅶ-2 | Ⅰ-4 | 公式2 + U + 公式1 |
| Ⅴ-2 | Ⅴ-3 | Ⅳ-3 | U' + 公式2 + U + 公式1 |
| Ⅴ-3 | Ⅳ-2 | Ⅴ-2 | U + 公式1 + U' + 公式2 |
| Ⅴ-4 | Ⅱ-2 | Ⅶ-4 | 公式1 + U' + 公式2 |
| Ⅵ-1 | Ⅶ-4 | Ⅰ-2 | 公式2 + U' + 公式1 |
| Ⅵ-2 | Ⅱ-4 | Ⅶ-2 | 公式1 + U + 公式2 |
| Ⅵ-3 | Ⅳ-3 | Ⅵ-4 | U' + 公式1 + U + 公式2 |
| Ⅵ-4 | Ⅵ-3 | Ⅳ-2 | U + 公式2 + U' + 公式1 |
| Ⅶ-1 | Ⅱ-3 | Ⅰ-3 | 公式1 + U2 + 公式2 |
| Ⅶ-2 | Ⅵ-2 | Ⅴ-1 | U' + 公式1 + U2 + 公式2 |
| Ⅶ-3 | Ⅲ-1 | Ⅲ-2 | U2 + 公式1 + U2 + 公式2 |
| Ⅶ-4 | Ⅴ-4 | Ⅵ-1 | U + 公式1 + U2 + 公式2 |