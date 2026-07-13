---
title: 4×4 Rubik's Cube formula
date: 2025-02-03 14:47:45
updated:
tags:
  - Tutorial
  - Rubik's Cube formula
  - 4×4 Rubik's Cube
categories:
  - Tutorial
  - Rubik's Cube formula
keywords: Tutorial, Rubik's Cube formula, 4×4 Rubik's Cube
description: "This article mainly introduces the basic solving method for the 4×4 Rubik's Cube, which consists of two main steps: solving center pieces and solving edge pieces. After completing these steps, you can continue solving the cube following the procedures for a 3×3 Rubik's Cube. Two special cases may occur during the solving process that need to be addressed."
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

* Unlike the 3x3 cube, the 4x4 Rubik’s Cube does not have fixed center pieces. Therefore, you need to memorize the relative color positions of the six faces before solving it. The international standard color scheme is: Top = Yellow, Bottom = White, Front = Blue, Back = Green, Left = Orange, Right = Red.

# 1. Solve the Center Pieces
## 1.1 Solving Order

To avoid disrupting already solved center blocks during assembly, the recommended solving sequence for the six center sections is as follows: First solve the center blocks of the three faces adjacent to a single corner of the cube, then finish the center blocks of the remaining three faces.
{% asset_img 1.png Figure 1 %}

## 1.2 Solving Steps

<div class="formula-box"><div class="box">
Formula 3-1: T₂R U T₂R'<br>
Formula 3-2: T₂R U2 T₂R'
</div></div>

1. Solve the first three pieces of the first center block
There is no specific formula for this step. Rotate all faces and layers to solve the first three pieces of the first center block.
2. Solve the last piece of the first center block
  1. If the last piece is on an adjacent face of the first face, align the two faces to the position shown in Figure 26, then apply **Formula 3-1** to complete the solve.
{% asset_img 2.png Figure 2 %}
  2. If the last piece is on the back face of the first face, follow the method above and execute **Formula 3-1** twice. First move the last piece from the back face to an adjacent side face, then shift it to the target first face to finish the first center block.
3. Solve center blocks of all remaining faces
Solve the center blocks of other faces using the same method for the first center block. Important note: when rotating faces and layers to set up the first three pieces of any center block, ensure solved center blocks are not scrambled.
* Quick Strip Solving Method
While assembling center blocks, construct two short strips first. Align the two faces to the layout shown in Figure 27, then use **Formula 3-2** to combine the two short strips into a complete center block.
{% asset_img 3.png Figure 3 %}

# 2. Solve Edge Pieces

<div class="formula-box"><div class="box">
Formula 3-3: T₂U' R F' U R' F T₂U<br>
Formula 3-4: R F' U R' F
</div></div>

1. First move two edge pieces of the same color to the same face (the red-blue pieces are taken as an example in the figure below).
2. Case 1: The two edge pieces are on the same layer
Directly apply **Formula 3-3** to join the two red-blue edge pieces together (it works no matter if the two pieces are on the upper layer or lower layer).
{% asset_img 4.png Figure 4 %}
3. Case 2: The two edge pieces are not on the same layer
After using **Formula 3-4**, the two edge pieces will be on the same layer, then solve them following the steps of Case 1.
{% asset_img 5.png Figure 5 %}

# 3. Solve the 3×3 Rubik's Cube

After solving all center blocks and edge pieces, you may proceed to solve the cube following the standard steps for solving a 3×3 Rubik's Cube.
1. [**Solve the Bottom Layer**](/en/2025/1/27-3×3-cube-formula/#2-Solve-the-Bottom-Layer)
2. [**Solve the Middle Layer**](/en/2025/1/27-3×3-cube-formula/#3-Solve-the-Middle-Layer)
3. [**Solve the Top Layer**](/en/2025/1/27-3×3-cube-formula/#4-Solve-the-Top-Layer)

# 4. Deal with Special Cases

<div class="formula-box"><div class="box">
Formula 3-5: M₂R2 B2&#12288;U2 M₂L U2 M₂R'&#12288;U2 M₂R U2&#12288;F2 M₂R F2 M₂L'&#12288;B2 M₂R2<br>
Formula 3-6: M₂R2 U2 M₂R2 T₂U2 M₂R2 M₂U2
</div></div>

1. Case 1: Edge Flip
  * Occurrence Stage: Forming the top cross
  * As shown below, you may fail to form the top cross while working on the top cross. Apply **Formula 3-5** to flip up all yellow edge pieces.
{% asset_img 6.png Figure 6 %}
2. Case 2: Opposite Edge Swap
  * Occurrence Stage: Solving top layer edges
  * As shown below, two side faces of the top layer may already have matching colors when solving top layer edges. Use **Formula 3-6** to swap the opposite edges.
{% asset_img 7.png Figure 7 %}