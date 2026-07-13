---
title: 魔方
date:
keywords:
description:
comments:
top_img:
aside:
---

<style>
.container {
  width: calc(100% + 60px);
  max-width: 150%;
  margin: -30px -10px -80px -50px;
  border-radius: 8px;
  overflow: hidden;
  height: 500px;
}

.container iframe {
  transform: scale(0.6);
  transform-origin: 0 0;
  width: calc(100% / 0.6);
}

@media (max-width: 768px) {
  .container {
    width: calc(100% + 120px);
    max-width: 120%;
    margin: -20px -100px -80px -20px;
    border-radius: 8px;
    overflow: hidden;
    height: 350px;
  }

  .container iframe {
    transform: scale(0.4);
    transform-origin: 0 0;
    width: calc(100% * 2);
  }
}
</style>

<div class="container">
  <iframe src="/html/cube"
    width="100%"
    height="1000px"
    style="border: none;
           overflow: hidden;
           max-width: none;
           display: block;
           margin: 0 auto;
           ">
  </iframe>
</div>