---
title: 心形函数
date: 2026-01-11 16:28:13
updated:
tags:
categories:
keywords:
description:
top_img: 0.png
cover: 0.png
---

# 1. 函数公式

**心形函数公式**
$$
y = \left(x^2\right)^{\frac{1}{3}} + 0.9 \cdot \left(3.3 - x^2\right)^{\frac{1}{2}} \cdot \sin(\mathbf{n} \pi x)
$$

其中，n 是参数，函数图像随着 n 值的变化而变化。函数定义域为：[-1.81,1.81]

# 2. 图像在线演示

<style>
.heart-func-wrap {
    margin-top: -60px;
    padding: 50px;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: inherit;
    color: #333333;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.heart-func-wrap .header {
    text-align: center;
    margin-bottom: 25px;
    padding: 15px;
    width: 100%;
    max-width: 900px;
    border-bottom: 2px solid rgba(0, 100, 200, 0.2);
}

.heart-func-wrap .title-main {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #2c3e50;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    font-weight: bold;
}

.heart-func-wrap .function-display {
    font-size: 1.5rem;
    background-color: inherit;
    padding: 15px;
    border-radius: 10px;
    margin-top: 10px;
    border-left: 4px solid #3498db;
    text-align: center;
    color: #2c3e50;
}

.heart-func-wrap .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 900px;
    gap: 25px;
}

.heart-func-wrap .canvas-container {
    background-color: inherit;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    width: 100%;
    position: relative;
    border: 1px solid #eaeaea;
}

.heart-func-wrap #graphCanvas {
    width: 100%;
    max-width: 100%;
    height: 400px;
    margin: 0 auto;
    background: transparent;
    border-radius: 8px;
    display: block;
    border: 1px solid #ddd;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
}

.heart-func-wrap .controls {
    background-color: inherit;
    border-radius: 15px;
    padding: 25px;
    width: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    border: 1px solid #eaeaea;
}

.heart-func-wrap .parameter-control {
    margin-bottom: 25px;
}

.heart-func-wrap .slider-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.heart-func-wrap .slider-label {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    color: #2c3e50;
}

.heart-func-wrap .slider-label span {
    font-weight: bold;
    color: #2980b9;
}

.heart-func-wrap input[type="range"] {
    width: 100%;
    height: 20px;
    -webkit-appearance: none;
    background: linear-gradient(90deg, #ecf0f1, #bdc3c7);
    border-radius: 10px;
    outline: none;
    border: 1px solid #95a5a6;
}

.heart-func-wrap input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #3498db;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
    border: 2px solid #ffffff;
}

.heart-func-wrap .buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

.heart-func-wrap button {
    padding: 15px 30px;
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.heart-func-wrap #startResetBtn {
    background: linear-gradient(90deg, #3498db, #2980b9);
    color: white;
}

.heart-func-wrap #startResetBtn:hover {
    background: linear-gradient(90deg, #2980b9, #1f639e);
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(52, 152, 219, 0.3);
}

.heart-func-wrap #pauseContinueBtn {
    background: linear-gradient(90deg, #e67e22, #d35400);
    color: white;
}

.heart-func-wrap #pauseContinueBtn:hover {
    background: linear-gradient(90deg, #d35400, #b34700);
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(231, 126, 34, 0.3);
}

.heart-func-wrap .value-display {
    font-size: 1.4rem;
    text-align: center;
    margin-top: 10px;
    padding: 10px;
    background-color: inherit;
    border-radius: 8px;
    color: #2c3e50;
}

.heart-func-wrap .value-display span {
    color: #2980b9;
    font-weight: bold;
    font-size: 1.6rem;
}

[data-theme="dark"] .heart-func-wrap {
    color: #f1f1f1;
}
[data-theme="dark"] .heart-func-wrap .title-main {
    color: #e6edf3;
}
[data-theme="dark"] .heart-func-wrap .function-display {
    color: #e6edf3;
    border-left-color: #4dabf7;
}
[data-theme="dark"] .heart-func-wrap .slider-label {
    color: #e2e8f0;
}
[data-theme="dark"] .heart-func-wrap .value-display {
    color: #e2e8f0;
}
[data-theme="dark"] .heart-func-wrap .canvas-container,
[data-theme="dark"] .heart-func-wrap .controls {
    border-color: #333;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
[data-theme="dark"] .heart-func-wrap #graphCanvas {
    border-color: #444;
}
[data-theme="dark"] .heart-func-wrap .header {
    border-color: rgba(77, 171, 247, 0.2);
}
[data-theme="dark"] .heart-func-wrap input[type="range"] {
    background: linear-gradient(90deg, #2c3036, #444950);
    border-color: #555;
}

@media (max-width: 768px) {
    .heart-func-wrap .buttons {
        flex-direction: column;
        align-items: center;
    }
    .heart-func-wrap button {
        width: 100%;
    }
    .heart-func-wrap .title-main {
        font-size: 2rem;
    }
    .heart-func-wrap .function-display {
        font-size: 1.2rem;
    }
}
</style>

<div class="heart-func-wrap">
  <div class="header">
    <div class="title-main">心形函数图像</div>
    <div class="function-display"> y = (x²)^(1/3) + 0.9 · (3.3 - x²)^(1/2) · sin(nπx) </div>
  </div>
  <div class="container">
    <div class="canvas-container">
      <canvas id="graphCanvas"></canvas>
    </div>
    <div class="controls">
      <div class="parameter-control">
        <div class="slider-container">
          <div class="slider-label">
            <span>参数 n 值</span>
            <span id="currentN">0.0</span>
          </div>
          <input type="range" id="nSlider" min="0" max="100" value="0" step="0.1">
          <div class="value-display"> n = <span id="nValue">0.0</span>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button id="startResetBtn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg> 开始 </button>
        <button id="pauseContinueBtn" disabled>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg> 暂停 </button>
      </div>
    </div>
  </div>
</div>

<script>
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
const nSlider = document.getElementById('nSlider');
const currentN = document.getElementById('currentN');
const nValue = document.getElementById('nValue');
const startResetBtn = document.getElementById('startResetBtn');
const pauseContinueBtn = document.getElementById('pauseContinueBtn');

const dpr = window.devicePixelRatio || 1;
const canvasWidth = 800;
const canvasHeight = 400;

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
canvas.style.width = canvasWidth + 'px';
canvas.style.height = canvasHeight + 'px';
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

let n = 0;
let animationId = null;
let isAnimating = false;
let isPaused = false;
let lastTime = 0;
const targetSpeed = 3.0;

const xMin = -2, xMax = 2;
const yMin = -2, yMax = 4;

function toCanvasX(x) {
    return ((x - xMin) / (xMax - xMin)) * canvasWidth;
}

function toCanvasY(y) {
    return canvasHeight - ((y - yMin) / (yMax - yMin)) * canvasHeight;
}

function drawAxes() {
    ctx.save();
    const dark = document.documentElement.dataset.theme === 'dark';
    const lineColor = dark ? '#cccccc' : '#7f8c8d';
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, toCanvasY(0));
    ctx.lineTo(canvasWidth, toCanvasY(0));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toCanvasX(0), 0);
    ctx.lineTo(toCanvasX(0), canvasHeight);
    ctx.stroke();

    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
        if (x === 0) continue;
        const canvasX = toCanvasX(x);
        ctx.beginPath();
        ctx.moveTo(canvasX, toCanvasY(0) - 5);
        ctx.lineTo(canvasX, toCanvasY(0) + 5);
        ctx.stroke();
        ctx.fillText(x, canvasX, toCanvasY(0) + 8);
    }

    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
        if (y === 0) continue;
        const canvasY = toCanvasY(y);
        ctx.beginPath();
        ctx.moveTo(toCanvasX(0) - 5, canvasY);
        ctx.lineTo(toCanvasX(0) + 5, canvasY);
        ctx.stroke();
        ctx.textAlign = 'right';
        ctx.fillText(y, toCanvasX(0) - 8, canvasY - 6);
    }

    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText('0', toCanvasX(0) - 5, toCanvasY(0) + 5);
    ctx.restore();
}

function calculateFunction(x) {
    const part1 = Math.pow(x * x, 1/3);
    const sqrtArg = 3.3 - x * x;
    if (sqrtArg < 0) return NaN;
    const part2 = 0.9 * Math.sqrt(sqrtArg) * Math.sin(n * Math.PI * x);
    return part1 + part2;
}

function drawFunction() {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#2980b9';
    ctx.beginPath();
    let isFirstPoint = true;
    const step = (xMax - xMin) / 500;
    for (let x = xMin; x <= xMax; x += step) {
        const y = calculateFunction(x);
        if (isNaN(y)) {
            isFirstPoint = true;
            continue;
        }
        const canvasX = toCanvasX(x);
        const canvasY = toCanvasY(y);
        if (y < yMin || y > yMax) {
            isFirstPoint = true;
            continue;
        }
        if (isFirstPoint) {
            ctx.moveTo(canvasX, canvasY);
            isFirstPoint = false;
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    }
    ctx.stroke();

    ctx.strokeStyle = 'rgba(231, 76, 60, 0.7)';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    isFirstPoint = true;
    for (let x = xMin; x <= xMax; x += step) {
        const sqrtArg = 3.3 - x * x;
        if (sqrtArg < 0) {
            const canvasX = toCanvasX(x);
            if (isFirstPoint) {
                ctx.moveTo(canvasX, toCanvasY(yMin));
                isFirstPoint = false;
            }
            ctx.lineTo(canvasX, toCanvasY(yMax));
        } else {
            isFirstPoint = true;
        }
    }
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
}

function drawGrid() {
    ctx.save();
    const dark = document.documentElement.dataset.theme === 'dark';
    const gridColor = dark ? 'rgba(100,100,100,0.3)' : 'rgba(189, 195, 199, 0.3)';
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
        if (x === 0) continue;
        ctx.beginPath();
        ctx.moveTo(toCanvasX(x), 0);
        ctx.lineTo(toCanvasX(x), canvasHeight);
        ctx.stroke();
    }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
        if (y === 0) continue;
        ctx.beginPath();
        ctx.moveTo(0, toCanvasY(y));
        ctx.lineTo(canvasWidth, toCanvasY(y));
        ctx.stroke();
    }
    ctx.restore();
}

function drawGraph() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawGrid();
    drawAxes();
    drawFunction();
}

function updateDisplay() {
    currentN.textContent = n.toFixed(1);
    nValue.textContent = n.toFixed(1);
}

function animate(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const elapsed = timestamp - lastTime;
    if (!isPaused && elapsed > 33) {
        n += targetSpeed * (elapsed / 1000);
        if (n > 100) n = 0;
        nSlider.value = n;
        updateDisplay();
        drawGraph();
        lastTime = timestamp;
    }
    if (isAnimating) animationId = requestAnimationFrame(animate);
}

function resetButtonState() {
    startResetBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> 开始`;
    pauseContinueBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> 暂停`;
    pauseContinueBtn.disabled = true;
}

function startButtonState() {
    startResetBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> 重置`;
    pauseContinueBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> 暂停`;
    pauseContinueBtn.disabled = false;
}

function pauseButtonState() {
    pauseContinueBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> 继续`;
}

nSlider.addEventListener('input', function() {
    n = parseFloat(this.value);
    updateDisplay();
    drawGraph();
    if (isAnimating) {
        isAnimating = false;
        isPaused = true;
        resetButtonState();
        if (animationId) cancelAnimationFrame(animationId);
    }
});

startResetBtn.addEventListener('click', function() {
    if (isAnimating) {
        n = 0;
        nSlider.value = 0;
        updateDisplay();
        drawGraph();
        isAnimating = false;
        isPaused = false;
        resetButtonState();
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    } else {
        isAnimating = true;
        isPaused = false;
        lastTime = 0;
        startButtonState();
        animate(0);
    }
});

pauseContinueBtn.addEventListener('click', function() {
    if (isAnimating) {
        isPaused = !isPaused;
        if (isPaused) {
            pauseButtonState();
        } else {
            pauseContinueBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> 暂停`;
            lastTime = 0;
            animate(0);
        }
    }
});

drawGraph();
updateDisplay();
resetButtonState();

window.addEventListener('resize', drawGraph);

const themeObserver = new MutationObserver(() => drawGraph());
themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
});
</script>

# 3. Excel 中实现
## 3.1 制作步骤

1. 变量 x
   1. 新建一个 Excel 表格，在 `A1` 和 `B1` 单元格内分别写上 `X`、`Y`；
   2. 在 `A2` 单元格内写上 `-1.81`（定义域左端点）；
   3. 选中 `A2` 单元格，在 `开始` 选项卡下找到 `编辑` → `填充` → `序列`，打开该选项，选择序列产生在 `列`，步长值填 `0.01`，终止值填 `1.81`（定义域右端点）；
   4. 这样，就在第 A 列生成了函数所有可能的变量 x 的值。
{% asset_img 1.png 图1 %}

2. 变量 y
   1. 在 `B2` 单元格内写入公式：`=(A2^2)^(1/3)+0.9*(3.3-A2^2)^(1/2)*SIN($D$2*PI()*A2)`，其中，`D2` 单元格为参数 n，`$D$2` 为绝对引用（F4键）；
   2. 选中 `B2` 单元格，把鼠标移动到 `B2` 单元格的右下角，鼠标指针变为黑色十字（填充柄），双击左键，自动向下填充公式，并计算出 A 列对应的 y 值。

```Excel公式
=(A2^2)^(1/3)+0.9*(3.3-A2^2)^(1/2)*SIN($D$2*PI()*A2)
```
{% asset_img 2.png 图2 %}
{% asset_img 3.png 图3 %}

3. 创建图形
   1. 选中 `A1` 单元格，按 `Ctrl + Shift + →` 键，再按 `Ctrl + Shift + ↓` 键，选中第 A 列和第 B 列的所有数据；
   2. 在 `插入` 选项卡下找到 `图表` → `插入散点图(X、Y)或气泡图` → `带平滑线的散点图`，创建心形散点图；
   3. 点击图表中的 X 轴，按 `Delete` 键删除，点击图表中的 Y 轴，按 `Delete` 键删除，删除图表标题和图例。

{% asset_img 4.png 图4 %}
{% asset_img 5.png 图5 %}

4. 迭代计算
   1. 在 `D2` 单元格中输入公式：`=D2+0.1`，回车；
   2. 选中 `D2` 单元格，点击 Excel 左上角的 `文件` 选项卡，选择左下角 `更多`、`选项`、`公式`；
   3. 右侧 `计算选项` 部分，勾选 `启用迭代计算`，设置 `最多迭代次数` 为 `1`，点击 `确定` 保存设置；
   4. 按住键盘上的 `F9` 键（或 `Fn + F9` 键）不放，心形函数图像开始 `跳动` 的动画效果。

{% asset_img 6.png 图6 %}
{% asset_img 7.png 图7 %}
效果图：
{% asset_img 8.gif 图8 %}

## 3.2 Excel 宏代码实现运算控制

* 打开你的 Excel 文件，点击 Excel 左上角的 `文件` 选项卡，选择 `另存为`，保存类型为：`Excel启用宏的工作簿(*.xlsm)`。
* 点击左上角 `文件` 选项卡，选择左下角 `更多`、`选项`、`自定义功能区`，右侧 `自定义功能区` 勾选 `开发工具`，点击 `确定` 保存。

### （1）表单控件：按钮

点击 `开发工具`，点击 `Visual Basic`，输入以下代码：
```vba
Public isLooping As Boolean
Public i As Double

Sub 心形图()
    isLooping = Not isLooping
    If isLooping Then
        i = 0
        Do While isLooping And i <= 1000
            Range("D2").Value = i / 10
            i = i + 1
            DoEvents
            If i Mod 1 = 0 Then
                DoEvents
            End If
        Loop
        isLooping = False
    End If
End Sub
```

插入一个 `表单控件：按钮`，指定宏为：`心形图`，点击 `确定`，将按钮命名为 `开关`。
{% asset_img 9.png 图9 %}

### （2）表单控件：启动开关和连续开关

点击 `开发工具`，点击 `Visual Basic`，输入以下代码：
```vba
Public isLooping As Boolean
Public i As Double
Public continue As Boolean

Sub 心形图()
    isLooping = Not isLooping
    If isLooping Then
        If Not continue Then
            i = 0
        End If
        Do While isLooping And i <= 1000
            Range("D2").Value = i / 10
            i = i + 1
            DoEvents
            If i Mod 1 = 0 Then
                DoEvents
            End If
        Loop
        isLooping = False
    End If
End Sub

Sub 连续开关()
    continue = Not continue
End Sub
```

插入一个 `表单控件：按钮`，指定宏为：`心形图`，点击 `确定`，将按钮命名为 `启动开关`，用于控制启停；
插入一个 `表单控件：按钮`，指定宏为：`连续开关`，点击 `确定`，将按钮命名为 `连续开关`，用于控制参数n是否连续。
{% asset_img 10.png 图10 %}

### （3）ActiveX控件：按钮

插入一个 `ActiveX控件：按钮`，在 `开发工具` 选项卡下打开 `设计模式`，右键刚创建的按钮，选择 `查看代码`，输入以下代码：
```vba
Public isLooping As Boolean
Public i As Double

Private Sub CommandButton1_Click()
    isLooping = Not isLooping
    If isLooping Then
        CommandButton1.Caption = "停止"
        i = 0
        Do While isLooping And i <= 1000
            Range("D2").Value = i / 10
            i = i + 1
            DoEvents
            If i Mod 1 = 0 Then
                DoEvents
            End If
        Loop
        isLooping = False
        CommandButton1.Caption = "开始"
    Else
        isLooping = False
        CommandButton1.Caption = "开始"
    End If
End Sub
```

{% asset_img 11.png 图11 %}

### （4）表单控件：滚动条

插入一个 `表单控件：滚动条`，右键滚动条，选择 `设置控件格式`，在 `控制` 选项下，设置 `最小值：0`、`最大值：100`、`步长：1`、`单元格链接：$D$2`。
{% asset_img 12.png 图12 %}

### （5）ActiveX 控件：滚动条

插入一个 `ActiveX 控件：滚动条`，在 `开发工具` 选项卡下打开 `设计模式`，右键刚创建的滚动条，选择 `查看代码`，输入以下代码：
```vba
Private Sub ScrollBar1_Change()
Range("D2") = ScrollBar1.Value / 10
End Sub
```

{% asset_img 13.png 图13 %}

# 4. 文件下载
{% btn '/2026/1/11-heart-shaped-function/心形曲线.zip?download',点击下载,fas fa-download,blue outline block center large %}