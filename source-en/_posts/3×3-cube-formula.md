---
title: 3×3 Rubik's Cube formula
date: 2025-01-27 10:27:15
updated:
tags:
  - Tutorial
  - Rubik's Cube formula
  - 3×3 Rubik's Cube
categories:
  - Tutorial
  - Rubik's Cube formula
keywords: Tutorial, Rubik's Cube formula, 3×3 Rubik's Cube
description: "This article mainly introduces the basic solving method for the 3×3 Rubik's Cube, consisting of three major stages: solving the bottom layer, solving the middle layer and solving the top layer."
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
    font-size: 16px;
    font-weight: bold;
}

.formula-box {
    display: flex;
    justify-content: center;
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

.formula-1-12-box {
    display: flex;
    margin: 0 auto;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    width: fit-content;
    gap: 0;
    font-size: 16px;
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

# 1. Basics of the Rubik's Cube
## 1.1 Rotating Surface

| Formula | Rotating Surface |
| :---: | :---: |
| U | Up |
| D | Down |
| L | Left |
| R | Right |
| F | Front |
| B | Back |

## 1.2 Rotation Direction and Angle

| Formula | Rotation direction and Angle |
| :---: | :---: |
| F | Rotate the Front face clockwise 90° |
| F' | Rotate the Front face counterclockwise 90° |
| F2 | Rotate the Front face clockwise 180° (F2 = F'2) |
| M₂R | Rotate **only the 2nd right inner layer** clockwise 90° |
| T₂R | Rotate **the front two right layers together** clockwise 90° |

## 1.3 International Color Scheme

<div class="formula-box"><div class="box" style="text-shadow: 0 0 1px #000;">
{% color yellow %}Top Yellow{% endcolor %}&#32;{% color white %}Bottom White{% endcolor %}&#12288;{% color blue %}Front Blue{% endcolor %}&#32;{% color green %}Back Green{% endcolor %}&#12288;{% color orange %}Left Orange{% endcolor %}&#32;{% color red %}Right Red{% endcolor %}</div></div>

* Note: Generally, we choose the front side as the front and the white surface as the bottom.
{% asset_img 1.png Figure 1 %}
* [**Original Link**](https://mp.weixin.qq.com/s/pUPRQ3AhG4UVm9OsWUjIrw)

# 2. Solve the Bottom Layer
## 2.1 Solve the Bottom Cross

<div class="prompt-box">
The left and right sides mentioned in the following formula refer to the formulas used when the target color block (white block) is on the far left or far right.
</div>

<div class="formula-box"><div class="box">
Formula 1-1: M₂U F M₂U'<br>
Formula 1-2: R' D R (Right side) / L D L' (Left side)
</div></div>

The process of solving the bottom layer cross involves two steps: solving the bottom layer cross itself and aligning the colors of the side edges. The situations for solving the bottom layer cross are diverse and the process is flexible. There is no unified formula. The general approach can be divided into two types:
1. Method 1: Solve the bottom cross and align side edge colors simultaneously (white center as the top face)
  1. First rotate one white edge piece to the white area of the top face, and align the other color of this edge piece with the color of the side center piece.
  2. Find the edge pieces with white and the same color as the side center piece. Only use Rubik's cube formulas R, F, B, D (and their inverses) to move them to the top face. Be careful not to mess up the edge pieces already aligned with the side center pieces.
  3. The next step is the same as the above operation, but only three faces can be rotated. Take care not to disturb the edge pieces that have been aligned with the side center pieces.
{% asset_img 2.png Figure 2 %}
  4. The last step follows the same rule, yet only two faces can be rotated. Do not disrupt the pre-aligned edge pieces.
  * If the following situation occurs, use **Formula 1-1** to solve it.
{% asset_img 3.png Figure 3 %}
  * If the target edge piece stays in the middle of the solved face, apply **Formula 1-2** to move the target edge piece down to the bottom layer before you continue to solve the cube.
{% asset_img 4.png Figure 4 %}
2. Method 2: Solve the bottom cross and align side edge colors in separate stages (yellow center as the top face)
  1. Ignore the other color of edge pieces, and flip all edge pieces containing white to the top face with the yellow center.
  2. Rotate the top layer to align the non-white color of each top edge piece with the corresponding side center color.
  3. After color alignment, directly rotate this side layer 180 degrees to flip the white edge piece down to the white bottom face.
  4. Repeat this step until all white edge pieces are flipped onto the white bottom face.
{% asset_img 5.png Figure 5 %}

## 2.2 Solve the Four Bottom Corner Pieces

<div class="formula-box"><div class="box">
Formula 1-3: F D F' (Right side) / F' D' F (Left side)<br>
Formula 1-4: F D2 F' D' (Right side) / F' D2 F D (Left side)
</div></div>

<div class="prompt-box">
The following three cases take the white center as the top face.
</div>

1. Case 1: There is a white-containing corner piece on the bottom layer of the side face
Rotate the bottom layer to turn the white side to the front face. Make the right (left) color of the corner piece match the center color of the right (left) face, and the bottom color of the corner piece match the center color of the front face. Use **Formula 1-3** to solve it.
{% asset_img 6.png Figure 6 %}
2. Case 2: There is a white-containing corner piece on the top layer of the side face
Use **Formula 1-3** to move the white corner piece on the top layer down to the bottom layer, then follow the steps of Case 1 to solve it. (Color alignment is unnecessary in Case 2, as it may disturb the already aligned side edge pieces.)
{% asset_img 7.png Figure 7 %}
3. Case 3: There is a white-containing corner piece on the bottom face
Rotate the bottom layer to align the other two colors of the white corner piece with the center colors of their adjacent faces respectively. Apply **Formula 1-4** to convert this case to Case 1, then use **Formula 1-3** to solve it. (The position of the white tile in Case 3 cannot distinguish left or right clearly; it only depends on the selected front face.)
{% asset_img 8.png Figure 8 %}
{% asset_img 9.png Figure 9 %}

<div class="prompt-box">
All the following steps take the yellow center as the top face and the white center as the bottom face by default.
</div>

# 3. Solve the Middle Layer

As shown in the figure below, solving the middle layer covers three scenarios: right shift, left shift and side edge flip. (There are many available formulas for solving the middle layer, and you can pick the ones that suit you for practice.)
{% asset_img 10.png Figure 10 %}
* Case 1 (Right shift): Use **Formula 1-5**, **Formula 1-8** or **Formula 1-10** to solve it.
* Case 2 (Left shift): Use **Formula 1-6**, **Formula 1-9** or **Formula 1-11** to solve it.
* Case 3 (Side edge flip): Use **Formula 1-7** to solve it.

① General Formulas (Refer to the above figure for the front face rotation reference of these formulas)

<div class="formula-box"><div class="box">
Formula 1-5: U R U R' U' F' U' F<br>
Formula 1-6: R' F' R U R U' R' F<br>
Formula 1-7: R U2 R' U R U2 R' U F' U' F
</div></div>

② Clockwise and Counterclockwise Formulas

<div class="formula-box"><div class="box">
Formula 1-8: R U R U R U' R' U' R' (Five clockwise and four counterclockwise)<br>
Formula 1-9: R' U' R' U' R' U R U R (Five counterclockwise and four clockwise)
</div></div>

Refer to the figure below for the front face reference of these formulas:
{% asset_img 11.png Figure 11 %}

③ Symmetric Formulas

<div class="formula-box"><div class="box">
Formula 1-10: U R U' R' U' F' U F<br>
Formula 1-11: U' L' U L U F U' F'
</div></div>

Refer to the figure below for the front face reference of these formulas:
{% asset_img 12.png Figure 12 %}

# 4. Solve the Top Layer
## 4.1 Solve the Top Cross

<div class="formula-box"><div class="box">
Formula 1-12: F R U R' U' F'
</div></div>

Solving the top cross covers four stages: dot stage, corner bend stage, horizontal line stage and cross stage (the final stage).
{% asset_img 13.png Figure 13 %}
**Formula 1-12** can convert one stage to another. However, if the position of the top face is not adjusted, you may get stuck in a loop and fail to reach the final cross stage.
The figure below shows 8 possible states of the top cross:
{% asset_img 14.png Figure 14 %}
The following illustrates the resulting top state after applying **Formula 1-12** once to a certain top cross state. Follow the rules below and your own top face state, and use **Formula 1-12** together with **U / U'** to solve the top face into the cross stage.

<div class="formula-1-12-box">
<div class="left">Ⅰ<br>Ⅱ<br>Ⅲ<br>Ⅳ<br>Ⅴ<br>Ⅵ<br>Ⅶ<br>Ⅷ</div>
<div class="center">→<br>→<br>→<br>→<br>→<br>→<br>→<br>→</div>
<div class="right">Ⅱ<br>Ⅵ<br>Ⅲ<br>Ⅶ<br>Ⅴ<br>Ⅰ<br>Ⅷ<br>Ⅳ</div>
</div>

## 4.2 Solve the Top Face

<div class="formula-box"><div class="box">
Formula 1-13: R U R' U R U2 R'<br>
Formula 1-14: R U2 R' U' R U' R'
</div></div>

The figure below shows 7 possible top-face states after finishing solving the top cross.
{% asset_img 15.png Figure 15 %}
Listed below are the corresponding formulas for solving each of the seven states:

<div class="formula-1-12-box">
<div class="left">Ⅰ<br>Ⅱ<br>Ⅲ<br>Ⅳ<br>Ⅴ<br>Ⅵ<br>Ⅶ</div>
<div class="center">:<br>:<br>:<br>:<br>:<br>:<br>:</div>
<div class="right">Formula 1-13<br>Formula 1-14<br>Formula 1-13 + Formula 1-13<br>Formula 1-13 + U + Formula 1-13<br>Formula 1-14 + U + Formula 1-13<br>Formula 1-14 + U' + Formula 1-13<br>Formula 1-13 + U2 + Formula 1-14</div>
</div>

For solving more states of the top face, please refer to: [**All States, Transformations and Solving Steps for the Top Face of a 3×3 Rubik’s Cube**](/en/2025/1/30-cube-top/)

## 4.3 Solve the Four Top Corner Pieces

<div class="formula-box"><div class="box">
Formula 1-15: R' U L' U2 R U' R' U2 L R
</div></div>

1. First check if there are corner pieces with identical colors on the side faces of the top layer. If such corners exist, set the face with matching colored corners as the front face, then use **Formula 1-15** to align the colors of the left and right top corner pieces on all four side faces.
{% asset_img 16.png Figure 16 %}
2. If no side face of the top layer has matching colored corners, pick any face as the front face and apply **Formula 1-15**. After this operation, one side face will get matching colored corners. Set that face as the new front face and run **Formula 1-15** again to finish this step.
{% asset_img 17.png Figure 17 %}
3. Finally rotate the entire top layer to match the colors of the top left and right corner pieces with the side colors of the two lower layers.

## 4.4 Solve the Top Layer Edge Pieces

<div class="formula-box"><div class="box">
Formula 1-16: R U' R U R U R U' R' U' R2
</div></div>

Each time **Formula 1-16** is applied, the cube transforms as shown in the figure below:
{% asset_img 18.png Figure 18 %}
1. First, check if there is a side face of the top layer whose middle edge shares the same color as its left and right corner pieces. If such a face exists, set the opposite face of this side as the front face and use **Formula 1-16** to solve it. If it is not solved after one run, apply **Formula 1-16** a second time to complete the alignment.
2. If no side face has a middle edge matching the colors of its two adjacent corners, pick any face as the front face and run **Formula 1-16**. Afterwards, one side face will have fully aligned side colors. Set the opposite side of this aligned face as the new front face, then use **Formula 1-16** to finish solving.
{% asset_img 19.png Figure 19 %}