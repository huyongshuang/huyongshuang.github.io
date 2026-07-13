---
title: 二阶魔方公式
date: 2025-02-01 13:36:13
updated:
tags:
  - 教程
  - 魔方公式
  - 二阶魔方
categories:
  - 教程
  - 魔方公式
keywords: 教程, 魔方公式, 二阶魔方
description: 本文主要内容是二阶魔方的基础还原方法，包括还原底层和还原顶层两大步骤。
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

* 二阶魔方实质上就是去掉各边棱块的三阶魔方，因此可以按照还原三阶魔方的部分步骤来还原二阶魔方。

# 1. 还原底层

<div class="formula-box"><div class="box">
公式2-1：F D F'（右侧）/F' D' F（左侧）<br>
公式2-2：F D2 F' D'（右侧）/F' D2 F D（左侧）
</div></div>

1. 寻找一个带白色的角块，并将白色这一面作为顶面，同时记住这一角块另外两个面的颜色。
2. 情况一：侧面最底层存在带白色的角块
  1. 思路一：底面颜色对比
首先寻找侧面最底层带白色的角块，若角块位于底层左侧（右侧），保证这一角块底面颜色与右上角（左上角）颜色一致。
若是还原第二、第三个白色角块，直接使用 L' 或 R 还原；若是还原最后一个白色角块，使用 **公式2-1** 还原。
  2. 思路二：侧面颜色对比
首先寻找侧面最底层带白色的角块，若角块位于底层左侧（右侧），保证这一角块侧面颜色与左侧面（右侧面）的左上角（右上角）颜色一致，使用 **公式2-1** 还原。
  * 上面两种思路在遇到适合的条件时选择其一即可，不需要强行按照某一思路进行还原。
{% asset_img 1.png 图1 %}
3. 情况二：侧面最上层存在带白色的角块
和三阶魔方一样，使用 **公式2-1** 将最上层带白色的角块移动到侧面最底层，然后按照情况一的步骤还原。
在不打乱已经把颜色对齐的角块的前提下，可直接旋转带白色角块的那一层进行还原。
  * 下面情况三同理。
  * 在下图中，顶面白色块只还原了两个，因此可直接旋转右层还原。
{% asset_img 2.png 图2 %}
  * 在下图中，顶面白色块已经还原了三个，就必须使用 **公式2-1** 将最上层带白色的角块移动到侧面最底层，再按照情况一的步骤使用 **公式2-1** 还原。
{% asset_img 3.png 图3 %}
4. 情况三：底面存在带白色的角块
和三阶魔方一样，使用 **公式2-2** 将底面带白色的角块移动到侧面最底层，然后按照情况一的步骤还原。
在不打乱已经把颜色对齐的角块的前提下，可直接旋转带白色角块的那一层进行还原。

# 2. 还原顶层
## 2.1 还原顶面

<div class="formula-box"><div class="box">
公式2-3：R U R' U R U2 R'<br>
公式2-4：R U2 R' U' R U' R'
</div></div>

下图是完成底层还原之后顶面可能会出现的7种状态。
{% asset_img 4.png 图4 %}
下面是7种状态所对应的还原公式：

<div class="formula-1-12-box">
<div class="left">Ⅰ<br>Ⅱ<br>Ⅲ<br>Ⅳ<br>Ⅴ<br>Ⅵ<br>Ⅶ</div>
<div class="center">：<br>：<br>：<br>：<br>：<br>：<br>：</div>
<div class="right">公式2-3<br>公式2-4<br>公式2-3 + 公式2-3<br>公式2-3 + U + 公式2-3<br>公式2-4 + U + 公式2-3<br>公式2-4 + U' + 公式2-3<br>公式2-3 + U2 + 公式2-4</div>
</div>

## 2.2 还原顶层四角块

<div class="formula-box"><div class="box">
公式2-5：R' U L' U2 R U' R' U2 L R
</div></div>

1. 首先寻找顶层侧边是否存在颜色相同的角块，如果存在，把有相同颜色角块的一面作为正面，使用 **公式2-5** 即可还原顶层侧边四个面左右两角块的颜色。
2. 如果顶层侧边不存在颜色相同的角块，就将任意一个面作为正面，使用 **公式2-5** 后，会在某一面出现颜色相同的角块，然后把这一面作为正面，再次使用 **公式2-5** 即可还原。
{% asset_img 5.png 图5 %}
3. 最后旋转顶层，将上下两层侧面颜色对齐。