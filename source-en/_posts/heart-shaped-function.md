---
title: Heart-shaped Function
date: 2026-01-11 16:28:13
updated:
tags:
categories:
keywords:
description:
top_img: 0.png
cover: 0.png
---

# 1. Function Formula

**Heart-Shaped Function Formula**
$$
y = \left(x^2\right)^{\frac{1}{3}} + 0.9 \cdot \left(3.3 - x^2\right)^{\frac{1}{2}} \cdot \sin(\mathbf{n} \pi x)
$$

where n is a parameter, and the function graph changes as the value of n changes. The domain of the function is: [-1.81, 1.81]

# 2. Interactive Online Demo

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
    <div class="title-main">Heart-shaped function graph</div>
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
            <span>Parameter n value</span>
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
          </svg> Start </button>
        <button id="pauseContinueBtn" disabled>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg> Pause </button>
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
    startResetBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Start`;
    pauseContinueBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> Pause`;
    pauseContinueBtn.disabled = true;
}

function startButtonState() {
    startResetBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Reset`;
    pauseContinueBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> Pause`;
    pauseContinueBtn.disabled = false;
}

function pauseButtonState() {
    pauseContinueBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Continue`;
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
            pauseContinueBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> Pause`;
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

# 3. Implementation in Excel
## 3.1 Step-by-Step Guide

1. Variable x
   1. Create a new Excel spreadsheet, and enter `X` and `Y` in cells `A1` and `B1` respectively;
   2. Enter `-1.81` in cell `A2` (the left endpoint of the domain);
   3. Select cell `A2`, go to the `Home` tab, then find `Editing` → `Fill` → `Series`, open the dialog, select series in `Columns`, set step value to `0.01`, and stop value to `1.81` (the right endpoint of the domain);
   4. This generates all possible values of the variable x for the function in column A.
{% asset_img 1.png Figure 1 %}

2. Variable y
   1. Enter the formula in cell `B2`: `=(A2^2)^(1/3)+0.9*(3.3-A2^2)^(1/2)*SIN($D$2*PI()*A2)`, where cell `D2` is the parameter n, and `$D$2` is an absolute reference (F4 key);
   2. Select cell `B2`, move the mouse to the bottom-right corner of cell `B2` until the pointer changes to a black cross (fill handle), then double-click the left mouse button to auto-fill the formula downward and calculate the corresponding y values for column A.

```Excel Formula
=(A2^2)^(1/3)+0.9*(3.3-A2^2)^(1/2)*SIN($D$2*PI()*A2)
```
{% asset_img 2.png Figure 2 %}
{% asset_img 3.png Figure 3 %}

3. Create the Chart
   1. Select cell `A1`, press `Ctrl + Shift + →`, then press `Ctrl + Shift + ↓` to select all data in columns A and B;
   2. Go to the `Insert` tab, find `Charts` → `Insert Scatter (X, Y) or Bubble Chart` → `Scatter with Smooth Lines` to create a heart-shaped scatter chart;
   3. Click the X-axis in the chart and press `Delete` to remove it; click the Y-axis and press `Delete` to remove it; also delete the chart title and legend.

{% asset_img 4.png Figure 4 %}
{% asset_img 5.png Figure 5 %}

4. Iterative Calculation
   1. Enter the formula `=D2+0.1` in cell `D2` and press Enter;
   2. Select cell `D2`, click the `File` tab in the top-left corner of Excel, then select `More` → `Options` → `Formulas` at the bottom left;
   3. Under the `Calculation options` section on the right, check `Enable iterative calculation`, set `Maximum iterations` to `1`, and click `OK` to save the settings;
   4. Hold down the `F9` key (or `Fn + F9` key) on the keyboard, and the heart-shaped function graph will begin a "beating" animation effect.

{% asset_img 6.png Figure 6 %}
{% asset_img 7.png Figure 7 %}
Result:
{% asset_img 8.gif Figure 8 %}

## 3.2 Excel Macro Code for Calculation Control

* Open your Excel file, click the `File` tab in the top-left corner, select `Save As`, and set the save type to: `Excel Macro-Enabled Workbook (*.xlsm)`.
* Click the `File` tab in the top-left corner, select `More` → `Options` → `Customize Ribbon` at the bottom left, check `Developer` under `Customize the Ribbon` on the right, and click `OK` to save.

### (1) Form Control: Button

Click `Developer`, then click `Visual Basic`, and enter the following code:
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

Insert a `Form Control: Button`, assign the macro `心形图` to it, click `OK`, and name the button `开关`.
{% asset_img 9.png Figure 9 %}

### (2) Form Control: Start Button and Continuous Toggle

Click `Developer`, then click `Visual Basic`, and enter the following code:
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

Insert a `Form Control: Button`, assign the macro `心形图` to it, click `OK`, and name the button `启动开关` for controlling start/stop;
Insert a `Form Control: Button`, assign the macro `连续开关` to it, click `OK`, and name the button `连续开关` for controlling whether parameter n runs continuously.
{% asset_img 10.png Figure 10 %}

### (3) ActiveX Control: Button

Insert an `ActiveX Control: Button`, enable `Design Mode` under the `Developer` tab, right-click the newly created button, select `View Code`, and enter the following code:
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
        CommandButton1.Caption = "Start"
    Else
        isLooping = False
        CommandButton1.Caption = "Start"
    End If
End Sub
```

{% asset_img 11.png Figure 11 %}

### (4) Form Control: Scroll Bar

Insert a `Form Control: Scroll Bar`, right-click the scroll bar, select `Format Control`, and under the `Control` tab, set `Minimum value: 0`, `Maximum value: 100`, `Incremental change: 1`, and `Cell link: $D$2`.
{% asset_img 12.png Figure 12 %}

### (5) ActiveX Control: Scroll Bar

Insert an `ActiveX Control: Scroll Bar`, enable `Design Mode` under the `Developer` tab, right-click the newly created scroll bar, select `View Code`, and enter the following code:
```vba
Private Sub ScrollBar1_Change()
Range("D2") = ScrollBar1.Value / 10
End Sub
```

{% asset_img 13.png Figure 13 %}

# 4. File Download
{% btn '/2026/1/11-heart-shaped-function/心形曲线.zip?download',Click to Download,fas fa-download,blue outline block center larger %}