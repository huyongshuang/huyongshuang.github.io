---
title: All States, Transformations and Solving Steps for the Top Face of a 3×3 Rubik’s Cube
date: 2025-01-30 11:45:15
updated:
tags:
  - Tutorial
  - Rubik's Cube formula
categories:
  - Tutorial
  - Rubik's Cube formula
keywords: Tutorial, Rubik's Cube formula
description: This article mainly focuses on all possible states that may appear during the top-face solving stage of a 3×3 Rubik's Cube, along with their transformations and corresponding solving procedures.
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
    font-size: 16px;
    font-weight: bold;
    line-height: 2;
    letter-spacing: 1px;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}
</style>

{% note blue 'fas fa-cubes' modern %}
Table of Contents
{% post_link 3×3-cube-formula "3×3 Rubik's Cube formula" %}
{% post_link cube-top "All States, Transformations and Solving Steps for the Top Face of a 3×3 Rubik’s Cube" %}
{% post_link 2×2-cube-formula "2×2 Rubik's Cube formula" %}
{% post_link 4×4-cube-formula "4×4 Rubik's Cube formula" %}
{% post_link 5×5-cube-formula "5×5 Rubik's Cube formula" %}
{% post_link rubiks-cube-formula "Rubik's Cube formula" %}
{% endnote %}

* Below are all possible states of the top face of a 3×3 Rubik's Cube:

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

* The transformations and solving methods for all states are listed below:

<div class="formula-box"><div class="box">
Formula 1：R U R' U R U2 R'<br>
Formula 2：R U2 R' U' R U' R'
</div></div>

| State | Result after Formula 1 | Result after Formula 2 | Solving Operation |
| :---: | :---: | :---: | :---: |
| Target State | Ⅱ-1 | Ⅰ-1 | — |
| Ⅰ-1 | Target State | Ⅲ-1 | Formula 1 |
| Ⅰ-2 | Ⅵ-1 | Ⅳ-4 | U' + Formula 1 |
| Ⅰ-3 | Ⅶ-1 | Ⅱ-3 | U2 + Formula 1 |
| Ⅰ-4 | Ⅴ-1 | Ⅳ-1 | U + Formula 1 |
| Ⅱ-1 | Ⅲ-2 | Target State | Formula 2 |
| Ⅱ-2 | Ⅳ-4 | Ⅴ-4 | U' + Formula 2 |
| Ⅱ-3 | Ⅰ-3 | Ⅶ-1 | U2 + Formula 2 |
| Ⅱ-4 | Ⅳ-1 | Ⅵ-2 | U + Formula 2 |
| Ⅲ-1 | Ⅰ-1 | Ⅶ-3 | Formula 1 + Formula 1 |
| Ⅲ-2 | Ⅶ-3 | Ⅱ-1 | Formula 2 + Formula 2 |
| Ⅳ-1 | Ⅰ-4 | Ⅱ-4 | Formula 1 + U + Formula 1 |
| Ⅳ-2 | Ⅵ-4 | Ⅴ-3 | U' + Formula 1 + U + Formula 1 |
| Ⅳ-3 | Ⅴ-2 | Ⅵ-3 | U + Formula 1 + U' + Formula 1 |
| Ⅳ-4 | Ⅰ-2 | Ⅱ-2 | Formula 1 + U' + Formula 1 |
| Ⅴ-1 | Ⅶ-2 | Ⅰ-4 | Formula 2 + U + Formula 1 |
| Ⅴ-2 | Ⅴ-3 | Ⅳ-3 | U' + Formula 2 + U + Formula 1 |
| Ⅴ-3 | Ⅳ-2 | Ⅴ-2 | U + Formula 1 + U' + Formula 2 |
| Ⅴ-4 | Ⅱ-2 | Ⅶ-4 | Formula 1 + U' + Formula 2 |
| Ⅵ-1 | Ⅶ-4 | Ⅰ-2 | Formula 2 + U' + Formula 1 |
| Ⅵ-2 | Ⅱ-4 | Ⅶ-2 | Formula 1 + U + Formula 2 |
| Ⅵ-3 | Ⅳ-3 | Ⅵ-4 | U' + Formula 1 + U + Formula 2 |
| Ⅵ-4 | Ⅵ-3 | Ⅳ-2 | U + Formula 2 + U' + Formula 1 |
| Ⅶ-1 | Ⅱ-3 | Ⅰ-3 | Formula 1 + U2 + Formula 2 |
| Ⅶ-2 | Ⅵ-2 | Ⅴ-1 | U' + Formula 1 + U2 + Formula 2 |
| Ⅶ-3 | Ⅲ-1 | Ⅲ-2 | U2 + Formula 1 + U2 + Formula 2 |
| Ⅶ-4 | Ⅴ-4 | Ⅵ-1 | U + Formula 1 + U2 + Formula 2 |