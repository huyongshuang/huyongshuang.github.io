---
title: 2×2 Rubik's Cube formula
date: 2025-02-01 13:36:13
updated:
tags:
  - Tutorial
  - Rubik's Cube formula
  - 2×2 Rubik's Cube
categories:
  - Tutorial
  - Rubik's Cube formula
keywords: Tutorial, Rubik's Cube formula, 2×2 Rubik's Cube
description: "This article mainly covers the basic solving method for the 2×2 Rubik's Cube, which includes two main stages: solving the bottom layer and solving the top layer."
top_img: 0.png
cover: 0.png
series: cube
---

<style>
.prompt-box {
    text-align: center;
    margin: 10px 0;
    padding: 10px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    font-size: 18px;
    font-weight: bold;
}

.formula-box {
    display: flex;
    justify-content: center;
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

.formula-1-12-box {
    display: flex;
    margin: 0 auto;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    width: fit-content;
    gap: 0;
    font-size: 18px;
    font-weight: bold;
}

.formula-1-12-box .left {
    text-align: center;
}

.formula-1-12-box .center {
    text-align: center;
    margin: 0 5px;
}

.formula-1-12-box .right {
    text-align: left;
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

* A 2x2 Rubik’s Cube is essentially a 3x3 Rubik’s Cube with all edge pieces removed, so it can be solved by following part of the solving steps for a 3x3 cube.

# 1. Solve the Bottom Layer

<div class="formula-box"><div class="box">
Formula 2-1: F D F' (Right side) / F' D' F (Left side)<br>
Formula 2-2: F D2 F' D' (Right side) / F' D2 F D (Left side)
</div></div>

1. Find a corner piece with white, set the white face as the top face, and memorize the other two colors of this corner.
2. Case 1: White corner is on the bottom layer of a side face
  1. Method 1: Match bottom color
Locate the white corner on the bottom side layer. If the corner is on the left (right) bottom, align its bottom color with the top-right (top-left) corner color of the front face.
When solving the 2nd or 3rd white corner, simply turn L' or R to place it; for the final white corner, apply **Formula 2-1**.
  2. Method 2: Match side color
Locate the white corner on the bottom side layer. If the corner is on the left (right) bottom, align its side color with the top-left (top-right) corner color of the left (right) face, then apply **Formula 2-1** to solve it.
  * Choose either method when the matching condition is met; there is no need to strictly follow only one method.
{% asset_img 1.png Figure 1 %}
3. Case 2: White corner is on the top layer of a side face
Just like the 3x3 cube, use **Formula 2-1** to move the white top-layer corner down to the bottom side layer, then solve it following the steps in Case 1.
You may directly rotate the layer containing the white corner as long as already aligned corners stay undisturbed.
  * Case 3 below follows the same rule.
  * In the figure below, only two white top corners are solved, so you may directly rotate the right layer for adjustment.
{% asset_img 2.png Figure 2 %}
  * In the figure below, three white top corners are already solved. You must first use **Formula 2-1** to shift the white top corner to the bottom side layer, then solve it with **Formula 2-1** as instructed in Case 1.
{% asset_img 3.png Figure 3 %}
4. Case 3: White corner is on the bottom face
Just like the 3x3 cube, use **Formula 2-2** to move the white bottom-face corner to the bottom side layer, then solve it following the steps in Case 1.
You may directly rotate the layer containing the white corner as long as already aligned corners stay undisturbed.

# 2. Solve the Top Layer
## 2.1 Solve the Top Face

<div class="formula-box"><div class="box">
Formula 2-3: R U R' U R U2 R'<br>
Formula 2-4: R U2 R' U' R U' R'
</div></div>

The figure below shows 7 possible top-face configurations after completing the bottom layer.
{% asset_img 4.png Figure 4 %}
The corresponding solving formulas for these seven states are listed below:

<div class="formula-1-12-box">
<div class="left">Ⅰ<br>Ⅱ<br>Ⅲ<br>Ⅳ<br>Ⅴ<br>Ⅵ<br>Ⅶ</div>
<div class="center">:</br>:</br>:</br>:</br>:</br>:</br>:</div>
<div class="right">Formula 2-3<br>Formula 2-4<br>Formula 2-3 + Formula 2-3<br>Formula 2-3 + U + Formula 2-3<br>Formula 2-4 + U + Formula 2-3<br>Formula 2-4 + U' + Formula 2-3<br>Formula 2-3 + U2 + Formula 2-4</div>
</div>

## 2.2 Solve the Four Top Corner Pieces

<div class="formula-box"><div class="box">
Formula 2-5: R' U L' U2 R U' R' U2 L R
</div></div>

1. First check whether there are corner pieces with matching colors on the lateral sides of the top layer. If such a side exists, take that face with matching corners as the front face, then apply **Formula 2-5** to align the colors of the left and right top corners of all four lateral faces.
2. If no lateral face of the top layer has matching colored corners, set any random face as the front face and run **Formula 2-5**. After execution, one side will appear with matching corner colors. Take that face as the new front face and apply **Formula 2-5** again to finish this step.
{% asset_img 5.png Figure 5 %}
3. Lastly, rotate the entire top layer to align the side colors of the top and bottom layers.