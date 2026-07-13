---
title: 二进制的加减乘除运算
date: 2026-02-17 23:14:39
updated:
tags:
  - Minecraft
  - 红石数电
  - 逻辑门电路
categories:
  - Minecraft
  - 教程
  - 红石数电
keywords: Minecraft, 红石数电, 二进制, 逻辑门, 全加器, 加法器
description: Minecraft 二进制的加减乘除运算，包括逻辑门电路、半加器、全加器、加法器、加减法模块、乘法器、除法器等等。
top_img: 0.png
cover: 0.png
---

* 二进制的加减乘除运算
  1. [PDF在线文档](/2026/2/17-binary-arithmetic/二进制的加减乘除运算.pdf)
  2. <a href="{% asset_path 二进制的加减乘除运算.pdf %}" download="二进制的加减乘除运算.pdf">PDF文件下载</a>
  3. <a href="{% asset_path 二进制的加减乘除运算.wsd %}" download="二进制的加减乘除运算.wsd">EduEditer文件下载</a>
  4. [EduEditer官网](http://eduediter.com/)

* 往期视频（B站）
  1. [逻辑门电路](https://www.bilibili.com/video/BV1DaBpBVEe4)
  2. [加法器](https://www.bilibili.com/video/BV12EFZzxEBy)
  3. [二进制的减法](https://www.bilibili.com/video/BV1snfSBFE5p)
  4. [加减法模块](https://www.bilibili.com/video/BV17z9nBRE86)
  5. [乘法器](https://www.bilibili.com/video/BV1PKdwBpEQT)
  6. [除法器](https://www.bilibili.com/video/BV1Gj5r6CE21)
  7. [除法的小数运算](https://www.bilibili.com/video/BV1FWLq6jEJ3)

* 完整视频请前往：[**二进制的加减乘除运算视频合集**](/2026/5/20-binary-arithmetic-videos/)
<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=116582575508293&bvid=BV1Gj5r6CE21&cid=38370870158&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="320px" height="180px"></iframe>

* 若下方内容仍未加载，请点击<a href="/2026/2/17-binary-arithmetic/" onclick="event.preventDefault(); location.href=this.href + '?t=' + new Date().getTime(); return false;"> **此处** </a>重新加载。

<div id="pdf-container"></div>

<style>
#pdf-container {
  width: 100% !important;
  margin: 0 auto !important;
  padding: 0 !important;
  overflow: auto !important;
}

#pdf-container canvas {
  max-width: 100% !important;
  height: auto !important;
}
</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>

<script>
// 配置工作器
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
// 核心异步渲染函数
async function loadAndRenderPdf() {
  // 获取渲染容器 & 前置清空
  const container = document.getElementById('pdf-container');
  if (!container) return;
  container.innerHTML = '';
  // PDF 文件路径
  const pdfUrl = '二进制的加减乘除运算.pdf';

  try {
    // 请求 PDF 文件资源
    const response = await fetch(pdfUrl);
    if (!response.ok) throw new Error(`文件不存在或路径错误（HTTP状态：${response.status}）`);
    // 加载 PDF 文档对象
    const pdfDoc = await pdfjsLib.getDocument({
      url: pdfUrl,
      cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/cmaps/',
      cMapPacked: true,
      disableAutoFetch: false,
      disableFontFace: false
    }).promise;
    // 计算高清渲染缩放比例
    const dpr = window.devicePixelRatio || 1;
    const baseScale = 2.0;
    const renderScale = baseScale * dpr;
    // 循环遍历 PDF 所有页面
    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      // 获取单页 PDF 视图尺寸
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({
        scale: renderScale
      });
      // 创建画布 & 获取绘图上下文
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      // 设置画布原生像素尺寸
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      // 设置画布 CSS 显示尺寸
      canvas.style.width = `${viewport.width / dpr}px`;
      canvas.style.height = `${viewport.height / dpr}px`;
      // 将 PDF 页面绘制到 Canvas 画布
      await page.render({
        canvasContext: ctx,
        viewport: viewport
      }).promise;
      // 将渲染完成的画布放入页面容器
      container.appendChild(canvas);
    }
  } catch (error) {
    container.innerHTML = `
      <div style="text-align: center; color: #f03838; padding: 30px; font-size: 16px;">
        <p>❌ PDF加载失败：${error.message}</p>
        <p>请检查PDF文件路径是否正确</p>
      </div>
    `;
    console.log('PDF加载错误：', error);
  }
}

// 页面加载完成执行渲染
if (document.readyState === 'complete') {
  loadAndRenderPdf();
} else {
  window.addEventListener('load', loadAndRenderPdf);
}
</script>