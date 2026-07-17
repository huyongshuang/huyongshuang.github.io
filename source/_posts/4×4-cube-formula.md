---
title: 四阶魔方公式
date: 2025-02-03 14:47:45
updated:
tags:
  - 教程
  - 魔方公式
  - 四阶魔方
categories:
  - 教程
  - 魔方公式
keywords: 教程, 魔方公式, 四阶魔方
description: 本文主要内容是四阶魔方的基础还原方法，包括还原中心块和还原棱块两大步骤，之后就可以按照还原三阶魔方的步骤进行还原，在还原过程中，可能会出现两种特殊情况需要处理。
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
文档目录
{% post_link 3×3-cube-formula 三阶魔方公式 %}
{% post_link cube-top 三阶魔方顶面还原的所有状态及其变换和还原步骤 %}
{% post_link 2×2-cube-formula 二阶魔方公式 %}
{% post_link 4×4-cube-formula 四阶魔方公式 %}
{% post_link 5×5-cube-formula 五阶魔方公式 %}
{% post_link rubiks-cube-formula 魔方公式 %}
{% endnote %}

* 由于四阶魔方没有固定的中心块，所以在还原之前必须记住六个面颜色的相对位置，国际标准配色为顶黄、底白、前蓝、后绿、左橙、右红。

# 1. 还原中心块
## 1.1 还原顺序

为了方便还原，避免打乱已经还原了的中心块，推荐六个中心块的还原顺序为：先还原与魔方某一个角相邻的三个面的中心块，然后还原剩余三个面的中心块。
{% asset_img 1.png 图1 %}

## 1.2 还原步骤

<div class="formula-box"><div class="box">
公式3-1：T₂R U T₂R'<br>
公式3-2：T₂R U2 T₂R'
</div></div>

1. 还原第一个中心块的前三个块
这一步没有具体的公式，通过旋转各个面和各层，还原第一个中心块的前三个块。
2. 还原第一个中心块的最后一个块
  1. 若最后一个块位于与第一个面相邻的面上，则将这两个面旋转为下图所示的位置，使用 **公式3-1** 还原。
{% asset_img 2.png 图2 %}
  2. 若最后一个块位于第一个面的背面，则按照上述方法，使用两次 **公式3-1**，把最后一个块先从背面移动到相邻的侧面，再移动到上述第一个面还原第一个中心块。
3. 还原其余面的中心块
按照上述还原第一个中心块的方法还原其余面的中心块。但需注意：如果通过旋转各个面和各层来还原某个中心块的前三个块，要保证不能打乱已经还原了的中心块。
* 长条快捷还原
在还原中心块的时候，可以先拼两个小长条，然后将两个面旋转为下图所示的位置，使用 **公式3-2** 把两个小长条还原成一个中心块。
{% asset_img 3.png 图3 %}

# 2. 还原棱块

<div class="formula-box"><div class="box">
公式3-3：T₂U' R F' U R' F T₂U<br>
公式3-4：R F' U R' F
</div></div>

1. 先将两个颜色一样的棱块移动到同一个面上（下图以红蓝块为例）。
2. 情况一：两个棱块位于同一层
直接使用 **公式3-3**，即可将两个红蓝棱块拼到一起（两个棱块在上层或下层都可以）。
{% asset_img 4.png 图4 %}
3. 情况二：两个棱块不在同一层
使用 **公式3-4** 后，两个棱块就位于同一层了，然后按照情况一进行还原即可。
{% asset_img 5.png 图5 %}

# 3. 还原三阶魔方

还原中心块和棱块之后，就可以按照还原三阶魔方的步骤进行还原了。
1. [**还原底层**](/2025/1/27-3×3-cube-formula/#2-还原底层)
2. [**还原中层**](/2025/1/27-3×3-cube-formula/#3-还原中层)
3. [**还原顶层**](/2025/1/27-3×3-cube-formula/#4-还原顶层)

# 4. 处理特殊情况

<div class="formula-box"><div class="box">
公式3-5：M₂R2 B2&#12288;U2 M₂L U2 M₂R'&#12288;U2 M₂R U2&#12288;F2 M₂R F2 M₂L'&#12288;B2 M₂R2<br>
公式3-6：M₂R2 U2 M₂R2 T₂U2 M₂R2 M₂U2
</div></div>

1. 情况一：翻棱
  * 出现时期：还原顶面十字
  * 如下图，在还原顶面十字时，可能会出现顶面拼不出十字的情况，使用 **公式3-5** 把带黄色的棱块翻上去即可。
{% asset_img 6.png 图6 %}
2. 情况二：对棱互换
  * 出现时期：还原顶层中棱
  * 如下图，在还原顶层中棱时，可能会出现顶层侧边四个面有两个面颜色已经对齐了的情况，使用 **公式3-6** 进行对棱互换即可。
{% asset_img 7.png 图7 %}