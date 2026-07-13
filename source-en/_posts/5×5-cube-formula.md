---
title: 5×5 Rubik's Cube formula
date: 2025-02-04 17:24:48
updated:
tags:
  - Tutorial
  - Rubik's Cube formula
  - 5×5 Rubik's Cube
categories:
  - Tutorial
  - Rubik's Cube formula
keywords: Tutorial, Rubik's Cube formula, 5×5 Rubik's Cube
description: "This article mainly introduces the basic solving method for the 5×5 Rubik's Cube, which consists of two main steps: solving center pieces and solving edge pieces. After completing these steps, you can continue solving the cube following the procedures for a 3×3 Rubik's Cube."
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

# 1. Solve Center Blocks
## 1.1 Solving Order

1. The six center blocks of a 5×5 Rubik's Cube each consist of nine pieces. It is recommended to first form the cross of all six center blocks and then solve the corner pieces of each center block. Alternatively, you may first complete the cross on one face's center block, solve its center corner pieces, and then tackle the center blocks of the remaining faces.
{% asset_img 1.png Figure 1 %}
2. To simplify solving and prevent scrambling already solved center blocks, the suggested solving order for the six center blocks is as follows: start by solving the center blocks of the three faces adjacent to one cube corner, then finish the center blocks of the other three faces.
{% asset_img 2.png Figure 2 %}

## 1.2 Solving Steps

<div class="formula-box"><div class="box">
Formula 4-1: T₂R U T₂R'<br>
Formula 4-2: T₂R U T₂R' U T₂R U2 T₂R'
</div></div>

1. Solve the Center Cross
  1. Solve the first center cross: There is no dedicated formula for this step. Rotate all faces and layers to form the cross of the first center block.
  2. Solve the remaining center crosses: You can still rotate faces and layers to form each center cross. If this scrambles any completed crosses, position the cube as shown in Figure 34 and apply **Formula 4-1**.
{% asset_img 3.png Figure 3 %}
2. Solve the Corner Pieces of Center Blocks
Position the cube as shown in Figure 35 and apply **Formula 4-2** to solve them.
{% asset_img 4.png Figure 4 %}
* During the above solving process, if the target cross piece or target corner piece is on the back of the working face, use **Formula 4-1** to shift the target piece from the back to an adjacent face, then follow the steps above to complete the solve.

# 2. Solve Edge Pieces
## 2.1 Method One: Prioritize Interval Alignment

<div class="formula-box"><div class="box">
Formula 4-3: T₂U' R F' U R' F T₂U<br>
Formula 4-4: R F' U R' F<br>
Formula 4-5: T₂R2 B2&#12288;T₂R' U2 T₂R' U2&#12288;B2 T₂R' B2 T₂R B2 T₂R'&#12288;B2 T₂R2<br>
Formula 4-6: M₂R2 B2&#12288;U2 M₂L U2 M₂R'&#12288;U2 M₂R U2&#12288;F2 M₂R F2 M₂L'&#12288;B2 M₂R2<br>
Formula 4-7: M₃U' R U R' F R' F' R M₃U
</div></div>

1. Interval Alignment
This operation follows the same steps used to solve edge pieces on a 4×4 Rubik's Cube. First move two edge pieces of matching color onto the same face (the red-blue pieces are used as an example in the figure below).
  1. Case 1: The two edge pieces are on the same layer
Apply **Formula 4-3** to pair the two red-blue edge pieces into a complete side edge (this works whether the pieces are on the upper layer or lower layer).
{% asset_img 5.png Figure 5 %}
  2. Case 2: The two edge pieces are on different layers
Apply **Formula 4-4** to place the two edge pieces onto the same layer, then solve them following the procedure for Case 1.
{% asset_img 6.png Figure 6 %}
2. Solve Middle Edge Pieces
As shown below, shift the target middle edge piece and the unsolved edge piece onto the same face, then apply **Formula 4-5** to complete the solve.
{% asset_img 7.png Figure 7 %}
3. Resolve Edge Flips
  1. Single Edge Flip
After finishing the steps for solving middle edge pieces, the scenario shown below may occur. Apply **Formula 4-6** to fix it.
{% asset_img 8.png Figure 8 %}
  2. Paired Edge Flips
If multiple edges require flipping, position two unsolved edge pieces on opposite sides of one face, then apply **Formula 4-7** to solve both edges at once.
{% asset_img 9.png Figure 9 %}

## 2.2 Method Two: Prioritize Adjacent Alignment

<div class="formula-box"><div class="box">
Formula 4-8: T₂U' R F' U R' F T₂U<br>
Formula 4-9: T₂D R F' U R' F T₂D'<br>
Formula 4-10: T₂U R F' U R' F T₂U'<br>
Formula 4-11: T₂D' R F' U R' F T₂D<br>
Formula 4-12: R F' U R' F (Right Side) / L' F U' L F' (Left Side)
</div></div>

1. Adjacent Alignment
As shown in the figure, place the middle edge piece on the right and the edge piece to be paired with it on the left. If the target piece is on the second left layer, apply **Formula 4-8** to solve it; if it is on the fourth left layer, apply **Formula 4-9**.
{% asset_img 10.png Figure 10 %}
2. Solve the Third Edge Piece
  1. The third edge piece is near the lower layer
As shown below, position the two pre-paired edge pieces from the previous step at the lower right, and the edge piece to be combined with them at the lower left.
Refer to the relative color positions of all edge pieces in the figure. If the colors of the pre-paired edges are aligned, use **Formula 4-10** for solving; if their colors are misaligned, use **Formula 4-9**.
{% asset_img 11.png Figure 11 %}
  2. The third edge piece is near the upper layer
As shown below, position the two pre-paired edge pieces from the previous step at the upper right, and the edge piece to be combined with them at the upper left.
Refer to the relative color positions of all edge pieces in the figure. If the colors of the pre-paired edges are aligned, use **Formula 4-11** for solving; if their colors are misaligned, use **Formula 4-8**.
{% asset_img 12.png Figure 12 %}
* If you need to adjust the colors of edge pieces on the left and right sides, apply **Formula 4-12** to flip the two colors of the edge piece.
{% asset_img 13.png Figure 13 %}

# 3. Solve the 3×3 Rubik's Cube

After solving all center blocks and edge pieces, you may proceed to solve the cube following the standard steps for solving a 3×3 Rubik's Cube.
1. [**Solve the Bottom Layer**](/en/2025/1/27-3×3-cube-formula/#2-Solve-the-Bottom-Layer)
2. [**Solve the Middle Layer**](/en/2025/1/27-3×3-cube-formula/#3-Solve-the-Middle-Layer)
3. [**Solve the Top Layer**](/en/2025/1/27-3×3-cube-formula/#4-Solve-the-Top-Layer)