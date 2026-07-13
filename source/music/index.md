---
title: 音乐馆
date: 2024-05-20 13:14:00
keywords:
description: 歌单不定时更新，谢谢!
comments:
top_img:
aside:
---

{% raw %}
<!-- Butterfly主题已内置Fontawesome图标库 -->
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.2.0/css/all.min.css"> -->
<script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>

<style>
/* 全局样式重置，统一盒模型与内外边距 */
.music-player-wrapper * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 文本类元素字体继承父级，避免覆盖图标字体 */
.music-player-wrapper div,
.music-player-wrapper p,
.music-player-wrapper h1,
.music-player-wrapper h2,
.music-player-wrapper span,
.music-player-wrapper button,
.music-player-wrapper input {
    font-family: inherit;
}

/* 强制恢复FontAwesome图标字体属性，解决图标不显示问题 */
.music-player-wrapper .fa,
.music-player-wrapper .fas,
.music-player-wrapper .far,
.music-player-wrapper .fab {
    font-family: "Font Awesome 6 Free" !important;
    font-weight: 900 !important;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    line-height: 1;
    text-rendering: auto;
}

/* 播放器根容器，定义全局CSS变量与基础属性 */
.music-player-wrapper {
    width: 100%;
    position: relative;
    line-height: 1.5;
    color: inherit;
    --accent-color: #2a8bbd;
    --accent-light: rgba(42, 139, 189, 0.12);
    --accent-hover: rgba(42, 139, 189, 0.08);
    --border-color: rgba(128, 128, 128, 0.2);
    --scrollbar-track: rgba(128, 128, 128, 0.1);
    --progress-bg: rgba(128, 128, 128, 0.2);
    --button-bg: rgba(128, 128, 128, 0.1);
    --album-border: rgba(128, 128, 128, 0.2);
}

/* 播放器内部主容器，控制整体高度与纵向布局 */
.music-player-wrapper .player-inner {
    width: 100%;
    height: 650px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
}

/* 主内容区，控制歌单与右侧内容的横向布局 */
.music-player-wrapper .main-content {
    display: flex;
    flex: 1;
    gap: 15px;
    overflow: hidden;
}

/* 四大功能模块通用样式：背景、边框、过渡动画 */
.music-player-wrapper .music-list-container,
.music-player-wrapper .album-section,
.music-player-wrapper .lyrics-section,
.music-player-wrapper .player-controls {
    background-color: transparent;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
}

/* 左侧歌单容器，控制歌单整体尺寸与布局 */
.music-player-wrapper .music-list-container {
    flex: 0 0 320px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    max-height: 100%;
}

/* 歌单标题样式 */
.music-player-wrapper .music-list-container h2 {
    margin-bottom: 12px;
    color: var(--accent-color);
    font-size: 1.15rem;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    font-weight: 600;
}

/* 歌单滚动列表容器 */
.music-player-wrapper .music-list {
    flex: 1;
    overflow-y: auto;
    padding-right: 5px;
}

/* 歌单滚动条整体宽度 */
.music-player-wrapper .music-list::-webkit-scrollbar {
    width: 6px;
}

/* 歌单滚动条轨道样式 */
.music-player-wrapper .music-list::-webkit-scrollbar-track {
    background: var(--scrollbar-track);
    border-radius: 3px;
}

/* 歌单滚动条滑块样式 */
.music-player-wrapper .music-list::-webkit-scrollbar-thumb {
    background: var(--accent-color);
    border-radius: 3px;
}

/* 单首歌曲条目样式 */
.music-player-wrapper .music-item {
    padding: 8px;
    border-radius: 8px;
    margin-bottom: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
}

/* 歌曲条目悬浮态样式 */
.music-player-wrapper .music-item:hover {
    background-color: var(--accent-hover);
}

/* 当前播放歌曲条目高亮样式 */
.music-player-wrapper .music-item.active {
    background-color: var(--accent-light);
    border-left: 4px solid var(--accent-color);
}

/* 歌单内歌曲小封面图 */
.music-player-wrapper .music-cover-small {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    object-fit: cover;
    flex-shrink: 0;
}

/* 歌曲文字信息容器 */
.music-player-wrapper .music-info {
    flex: 1;
    min-width: 0;
}

/* 歌曲标题文字样式 */
.music-player-wrapper .music-title {
    font-weight: 600;
    margin-bottom: 3px;
    color: inherit;
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 歌手名称文字样式 */
.music-player-wrapper .music-artist {
    font-size: 0.8rem;
    color: inherit;
    opacity: 0.7;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 歌曲时长文字样式 */
.music-player-wrapper .music-duration {
    font-size: 0.75rem;
    color: var(--accent-color);
    flex-shrink: 0;
    margin-left: auto;
}

/* 右侧内容区容器，控制封面与歌词纵向布局 */
.music-player-wrapper .right-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
}

/* 专辑信息区容器，控制封面与文字布局 */
.music-player-wrapper .album-section {
    flex: 0 0 auto;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

/* 专辑封面容器，控制封面尺寸 */
.music-player-wrapper .album-cover-container {
    position: relative;
    width: 110px;
    height: 110px;
    flex-shrink: 0;
}

/* 专辑封面图样式与阴影 */
.music-player-wrapper .album-cover {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    border: 6px solid var(--album-border);
    transition: transform 0.1s linear;
}

/* 播放中封面动画运行状态 */
.music-player-wrapper .album-cover.playing {
    animation-play-state: running;
}

/* 暂停时封面动画暂停状态 */
.music-player-wrapper .album-cover.paused {
    animation-play-state: paused;
}

/* 封面旋转关键帧动画 */
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* 专辑文字信息容器 */
.music-player-wrapper .album-info {
    flex: 1;
    text-align: left;
    min-width: 0;
}

/* 当前播放歌曲大标题 */
.music-player-wrapper .now-playing-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 6px;
    color: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 当前播放歌手名称 */
.music-player-wrapper .now-playing-artist {
    font-size: 0.95rem;
    color: var(--accent-color);
    margin-bottom: 8px;
}

/* 播放状态文字（正在播放/已暂停） */
.music-player-wrapper .album-status {
    font-size: 0.8rem;
    color: inherit;
    opacity: 0.7;
}

/* 歌词区域外层容器 */
.music-player-wrapper .lyrics-section {
    flex: 1;
    padding: 12px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* 歌词可视窗口容器 */
.music-player-wrapper .lyrics-container {
    flex: 1;
    overflow: hidden;
    position: relative;
}

/* 歌词滚动内层容器 */
.music-player-wrapper .lyrics-wrapper {
    position: absolute;
    width: 100%;
    transition: transform 0.4s ease-out;
}

/* 单行歌词默认样式 */
.music-player-wrapper .lyric-line {
    padding: 6px 0;
    font-size: 0.95rem;
    line-height: 1.5;
    text-align: center;
    color: inherit;
    opacity: 0.4;
    transition: all 0.3s ease;
}

/* 当前播放歌词行高亮样式 */
.music-player-wrapper .lyric-line.active {
    color: var(--accent-color);
    opacity: 1;
    font-size: 1.05rem;
    font-weight: 600;
}

/* 底部控制栏整体容器 */
.music-player-wrapper .player-controls {
    padding: 12px 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-shrink: 0;
}

/* 进度条整体容器 */
.music-player-wrapper .progress-container {
    width: 100%;
}

/* 进度条背景轨道 */
.music-player-wrapper .progress-bar {
    width: 100%;
    height: 4px;
    background-color: var(--progress-bg);
    border-radius: 2px;
    cursor: pointer;
    position: relative;
}

/* 进度条已播放填充部分 */
.music-player-wrapper .progress {
    height: 100%;
    background-color: var(--accent-color);
    border-radius: 2px;
    width: 0%;
    transition: width 0.1s linear;
}

/* 进度条两侧时间文字 */
.music-player-wrapper .progress-time {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: inherit;
    opacity: 0.7;
    margin-top: 4px;
}

/* 控制按钮主区域，横向分布布局 */
.music-player-wrapper .controls-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

/* 时间显示文字样式 */
.music-player-wrapper .time-display {
    font-size: 0.85rem;
    color: inherit;
    min-width: 90px;
}

/* 播放控制按钮组（上一首/播放/下一首） */
.music-player-wrapper .playback-controls {
    display: flex;
    align-items: center;
    gap: 16px;
}

/* 通用控制按钮基础样式 */
.music-player-wrapper .control-btn {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

/* 控制按钮悬浮态样式 */
.music-player-wrapper .control-btn:hover {
    background-color: var(--accent-hover);
    color: var(--accent-color);
}

/* 播放/暂停主按钮样式 */
.music-player-wrapper .play-pause-btn {
    background-color: var(--accent-color);
    color: #fff;
    font-size: 1.2rem;
}

/* 播放/暂停按钮悬浮态 */
.music-player-wrapper .play-pause-btn:hover {
    background-color: var(--accent-color);
    opacity: 0.9;
    color: #fff;
}

/* 右侧功能按钮组容器 */
.music-player-wrapper .right-controls {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 180px;
    justify-content: flex-end;
    position: relative;
}

/* 音量控制整体容器 */
.music-player-wrapper .volume-container {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 90px;
}

/* 音量图标样式 */
.music-player-wrapper .volume-container i {
    color: inherit;
    font-size: 0.9rem;
}

/* 音量滑块轨道样式 */
.music-player-wrapper .volume-slider {
    width: 60px;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    height: 4px;
    border-radius: 2px;
    background: var(--progress-bg);
}

/* 音量滑块把手样式 */
.music-player-wrapper .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--accent-color);
    cursor: pointer;
}

/* 功能圆形按钮通用样式（循环/倍速/主题） */
.music-player-wrapper .loop-btn,
.music-player-wrapper .speed-btn,
.music-player-wrapper .theme-btn {
    background: var(--button-bg);
    border: none;
    color: inherit;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: relative;
}

/* 功能按钮悬浮态样式 */
.music-player-wrapper .loop-btn:hover,
.music-player-wrapper .speed-btn:hover,
.music-player-wrapper .theme-btn:hover {
    background-color: var(--accent-hover);
    color: var(--accent-color);
}

/* 循环按钮激活态样式 */
.music-player-wrapper .loop-btn.active {
    background-color: var(--accent-color);
    color: #ffffff;
}

/* 倍速按钮激活态样式 */
.music-player-wrapper .speed-btn.active {
    background-color: var(--accent-light);
    color: var(--accent-color);
}

/* 倍速选择下拉面板 */
.music-player-wrapper .speed-selector {
    position: absolute;
    top: -190px;
    right: 0;
    background-color: var(--button-bg);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    padding: 6px 0;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    z-index: 100;
    display: none;
    flex-direction: column;
    min-width: 85px;
    border: 1px solid var(--border-color);
}

/* 倍速面板显示状态 */
.music-player-wrapper .speed-selector.show {
    display: flex;
}

/* 倍速单选项样式 */
.music-player-wrapper .speed-option {
    padding: 8px 12px;
    color: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    font-size: 0.85rem;
    min-height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 倍速选项悬浮态 */
.music-player-wrapper .speed-option:hover {
    background-color: var(--accent-hover);
    color: var(--accent-color);
}

/* 当前选中倍速选项 */
.music-player-wrapper .speed-option.active {
    background-color: var(--accent-light);
    color: var(--accent-color);
    font-weight: 600;
}

/* 移动端歌单打开按钮 */
.music-player-wrapper .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    color: var(--accent-color);
    font-size: 1.1rem;
    cursor: pointer;
    margin-right: 8px;
}

/* 移动端遮罩层 */
.music-player-wrapper .mobile-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
}

/* 移动端歌单关闭按钮 */
.music-player-wrapper .music-list-close-btn {
    display: none;
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    color: var(--accent-color);
    font-size: 1.3rem;
    cursor: pointer;
    z-index: 1001;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
}

/* 关闭按钮悬浮态 */
.music-player-wrapper .music-list-close-btn:hover {
    background-color: var(--accent-hover);
}

/* 强制亮色模式：CSS变量定义 */
.music-player-wrapper.force-light {
    --text-secondary: #1a1a1a;
    --accent-color: #2a8bbd;
    --accent-light: rgba(42, 139, 189, 0.12);
    --accent-hover: rgba(42, 139, 189, 0.08);
    --bg-primary: #ffffff;
    --bg-secondary: #f8f8f8;
    --border-color: rgba(0, 0, 0, 0.08);
    --shadow-color: rgba(0, 0, 0, 0.06);
    --scrollbar-track: rgba(0, 0, 0, 0.05);
    --progress-bg: rgba(0, 0, 0, 0.1);
    --button-bg: rgba(0, 0, 0, 0.04);
    --album-border: rgba(0, 0, 0, 0.08);
    color: var(--text-secondary);
}

/* 强制亮色模式：模块背景与阴影 */
.music-player-wrapper.force-light .music-list-container,
.music-player-wrapper.force-light .album-section,
.music-player-wrapper.force-light .lyrics-section,
.music-player-wrapper.force-light .player-controls {
    background-color: var(--bg-primary);
    box-shadow: 0 4px 20px var(--shadow-color);
    border: 1px solid var(--border-color);
}

/* 强制暗色模式：CSS变量定义 */
.music-player-wrapper.force-dark {
    --text-secondary: #f0f0f0;
    --accent-color: #7bd3f7;
    --accent-light: rgba(123, 211, 247, 0.18);
    --accent-hover: rgba(123, 211, 247, 0.1);
    --bg-primary: #000000;
    --bg-secondary: #141414;
    --border-color: rgba(255, 255, 255, 0.1);
    --shadow-color: rgba(0, 0, 0, 0.3);
    --scrollbar-track: rgba(255, 255, 255, 0.08);
    --progress-bg: rgba(255, 255, 255, 0.12);
    --button-bg: rgba(255, 255, 255, 0.06);
    --album-border: rgba(255, 255, 255, 0.1);
    color: var(--text-secondary);
}

/* 强制暗色模式：模块背景与阴影 */
.music-player-wrapper.force-dark .music-list-container,
.music-player-wrapper.force-dark .album-section,
.music-player-wrapper.force-dark .lyrics-section,
.music-player-wrapper.force-dark .player-controls {
    background-color: var(--bg-primary);
    box-shadow: 0 4px 20px var(--shadow-color);
    border: 1px solid var(--border-color);
}

/* 平板端响应式适配（768px以下） */
@media (max-width: 768px) {

    /* 播放器主容器高度自适应 */
    .music-player-wrapper .player-inner {
        height: auto;
        min-height: 600px;
    }

    /* 主内容区改为纵向布局 */
    .music-player-wrapper .main-content {
        flex-direction: column;
        position: relative;
    }

    /* 歌单改为侧边抽屉式弹出 */
    .music-player-wrapper .music-list-container {
        position: fixed;
        top: 0;
        left: -100%;
        width: 75%;
        height: 100%;
        z-index: 1000;
        transition: left 0.3s ease;
        border-radius: 0;
        padding-top: 50px;
        padding-left: 15px;
        padding-right: 15px;
        background-color: var(--bg-primary, var(--mobile-menu-bg)) !important;
        color: var(--mobile-text-color, inherit);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-right: 1px solid var(--border-color);
    }

    /* 歌单抽屉弹出状态 */
    .music-player-wrapper .music-list-container.active {
        left: 0;
    }

    /* 显示移动端菜单按钮 */
    .music-player-wrapper .mobile-menu-btn {
        display: block;
    }

    /* 显示移动端遮罩层 */
    .music-player-wrapper .mobile-overlay.active {
        display: block;
    }

    /* 显示歌单关闭按钮 */
    .music-player-wrapper .music-list-close-btn {
        display: flex;
    }

    /* 专辑区内边距缩小 */
    .music-player-wrapper .album-section {
        padding: 12px;
    }

    /* 专辑封面尺寸缩小 */
    .music-player-wrapper .album-cover-container {
        width: 100px;
        height: 100px;
    }

    /* 右侧控制组最小宽度取消 */
    .music-player-wrapper .right-controls {
        min-width: auto;
    }

    /* 倍速面板位置微调 */
    .music-player-wrapper .speed-selector {
        top: -180px;
        right: -10px;
    }
}

/* 手机端响应式适配（480px以下） */
@media (max-width: 480px) {

    /* 播放器高度自适应 */
    .music-player-wrapper .player-inner {
        height: auto;
    }

    /* 控制栏改为纵向布局 */
    .music-player-wrapper .controls-main {
        flex-direction: column;
        gap: 10px;
        align-items: stretch;
    }

    /* 播放按钮组居中显示 */
    .music-player-wrapper .playback-controls {
        order: 2;
        width: 100%;
        justify-content: center;
    }

    /* 右侧控制组两端分布 */
    .music-player-wrapper .right-controls {
        justify-content: space-between;
        min-width: auto;
    }

    /* 专辑封面进一步缩小 */
    .music-player-wrapper .album-cover-container {
        width: 90px;
        height: 90px;
    }

    /* 歌曲标题字号缩小 */
    .music-player-wrapper .now-playing-title {
        font-size: 1.1rem;
    }

    /* 歌单抽屉宽度加宽 */
    .music-player-wrapper .music-list-container {
        width: 85%;
    }
}
</style>

<div class="music-player-wrapper">
    <div class="player-inner">
        <div class="main-content">
            <div class="music-list-container" id="musicListContainer">
                <button class="music-list-close-btn" id="musicListCloseBtn">
                    <i class="fa-solid fa-x"></i>
                </button>
                <h2><i class="fa-solid fa-music"></i> 音乐列表</h2>
                <div class="music-list" id="musicList"></div>
            </div>
            <div class="right-content">
                <div class="album-section">
                    <div class="album-cover-container">
                        <img src="" alt="专辑封面" class="album-cover" id="albumCover">
                    </div>
                    <div class="album-info">
                        <h1 class="now-playing-title" id="nowPlayingTitle">选择一首歌曲</h1>
                        <p class="now-playing-artist" id="nowPlayingArtist">-</p>
                        <p class="album-status" id="albumStatus">点击播放按钮开始播放</p>
                    </div>
                </div>
                <div class="lyrics-section">
                    <div class="lyrics-container" id="lyricsContainer">
                        <div class="lyrics-wrapper" id="lyricsWrapper"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="player-controls">
            <div class="progress-container">
                <div class="progress-bar" id="progressBar">
                    <div class="progress" id="progress"></div>
                </div>
                <div class="progress-time">
                    <span id="currentTime">0:00</span>
                    <span id="totalTime">0:00</span>
                </div>
            </div>
            <div class="controls-main">
                <div style="display: flex; align-items: center;">
                    <button class="mobile-menu-btn" id="mobileMenuBtn">
                        <i class="fa-solid fa-list-ul"></i>
                    </button>
                    <div class="time-display">
                        <span id="currentTimeDisplay">0:00</span> / <span id="totalTimeDisplay">0:00</span>
                    </div>
                </div>
                <div class="playback-controls">
                    <button class="control-btn" id="prevBtn">
                        <i class="fa-solid fa-backward-step"></i>
                    </button>
                    <button class="control-btn play-pause-btn" id="playPauseBtn">
                        <i class="fa-solid fa-play"></i>
                    </button>
                    <button class="control-btn" id="nextBtn">
                        <i class="fa-solid fa-forward-step"></i>
                    </button>
                </div>
                <div class="right-controls">
                    <div class="volume-container">
                        <i class="fa-solid fa-volume"></i>
                        <input type="range" min="0" max="100" value="70" class="volume-slider" id="volumeSlider">
                    </div>
                    <button class="loop-btn" id="loopBtn" title="循环播放">
                        <i class="fa-solid fa-arrow-rotate-right"></i>
                    </button>
                    <button class="speed-btn" id="speedBtn" title="播放速度">
                        <span>1.0x</span>
                    </button>
                    <button class="theme-btn" id="themeBtn" title="自动背景">
                        <i class="fa-solid fa-arrows-rotate"></i>
                    </button>
                    <div class="speed-selector" id="speedSelector">
                        <div class="speed-option" data-speed="0.5">0.5x</div>
                        <div class="speed-option" data-speed="0.75">0.75x</div>
                        <div class="speed-option active" data-speed="1.0">1.0x</div>
                        <div class="speed-option" data-speed="1.25">1.25x</div>
                        <div class="speed-option" data-speed="1.5">1.5x</div>
                        <div class="speed-option" data-speed="2.0">2.0x</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mobile-overlay" id="mobileOverlay"></div>
</div>

<script>
// 立即执行函数，隔离作用域避免全局污染
(function() {
    // 全局状态变量定义
    let musicData = [];
    let currentMusicIndex = 0;
    let isPlaying = false;
    let isLooping = false;
    let playbackRate = 1.0;
    let lyrics = [];
    let currentLyricIndex = -1;
    let themeMode = 'auto';
    let musicDurations = {};

    // DOM元素缓存
    const playerWrapper = document.querySelector('.music-player-wrapper');
    const audioPlayer = new Audio();
    const musicList = document.getElementById('musicList');
    const albumCover = document.getElementById('albumCover');
    const nowPlayingTitle = document.getElementById('nowPlayingTitle');
    const nowPlayingArtist = document.getElementById('nowPlayingArtist');
    const albumStatus = document.getElementById('albumStatus');
    const lyricsWrapper = document.getElementById('lyricsWrapper');
    const lyricsContainer = document.getElementById('lyricsContainer');
    const progress = document.getElementById('progress');
    const progressBar = document.getElementById('progressBar');
    const currentTimeDisplay = document.getElementById('currentTimeDisplay');
    const totalTimeDisplay = document.getElementById('totalTimeDisplay');
    const currentTime = document.getElementById('currentTime');
    const totalTime = document.getElementById('totalTime');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const loopBtn = document.getElementById('loopBtn');
    const speedBtn = document.getElementById('speedBtn');
    const themeBtn = document.getElementById('themeBtn');
    const speedSelector = document.getElementById('speedSelector');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const musicListContainer = document.getElementById('musicListContainer');
    const musicListCloseBtn = document.getElementById('musicListCloseBtn');
    const mobileOverlay = document.getElementById('mobileOverlay');

    // 设置移动端歌单背景色与文字颜色，自动适配父容器
    function setMobileMenuBg() {
        const parent = playerWrapper.parentElement;
        const bgColor = getComputedStyle(parent).backgroundColor;
        const rgbMatch = bgColor.match(/\d+/g);
        
        if (rgbMatch && rgbMatch.length >= 3) {
            const r = parseInt(rgbMatch[0]);
            const g = parseInt(rgbMatch[1]);
            const b = parseInt(rgbMatch[2]);
            
            playerWrapper.style.setProperty('--mobile-menu-bg', `rgba(${r}, ${g}, ${b}, 0.3)`);
            
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            if (brightness > 128) {
                playerWrapper.style.setProperty('--mobile-text-color', '#1a1a1a');
            } else {
                playerWrapper.style.setProperty('--mobile-text-color', '#f0f0f0');
            }
        } else {
            playerWrapper.style.setProperty('--mobile-menu-bg', 'rgba(0, 0, 0, 0.3)');
            playerWrapper.style.setProperty('--mobile-text-color', '#f0f0f0');
        }
    }

    // 加载音乐配置，YML优先级高于JSON，均失败则使用默认数据
    async function loadMusicData() {
        try {
            const ymlRes = await fetch('/music/config.yml');
            if (ymlRes.ok) {
                const yamlText = await ymlRes.text();
                if (typeof jsyaml === 'undefined') throw new Error('js-yaml库未加载');
                const config = jsyaml.load(yamlText);
                if (config && config.songs && config.songs.length > 0) {
                    musicData = config.songs;
                    console.log('已加载 YAML 配置文件');
                    return;
                }
            }
            throw new Error('YAML配置无效或不存在');
        } catch (ymlError) {
            console.warn('YAML配置加载失败，尝试JSON配置:', ymlError.message);
        }

        try {
            const jsonRes = await fetch('/music/config.json');
            if (jsonRes.ok) {
                const jsonData = await jsonRes.json();
                if (jsonData && jsonData.songs && jsonData.songs.length > 0) {
                    musicData = jsonData.songs;
                    console.log('已加载 JSON 配置文件');
                    return;
                }
            }
            throw new Error('JSON配置无效或不存在');
        } catch (jsonError) {
            console.warn('JSON配置加载失败，使用默认数据:', jsonError.message);
        }

        musicData = [
            {
                id: 1,
                title: "梦与创造",
                artist: "胡永双",
                src: "https://huyongshuang.top/music/胡永双 - 梦与创造.mp3",
                cover: "https://huyongshuang.top/music/cover/根新.jpg",
                smallCover: "https://huyongshuang.top/music/cover/根新.jpg",
                lrcFile: "/music/lrc/胡永双 - 梦与创造.lrc"
            },
            {
                id: 2,
                title: "一个人想着一个人",
                artist: "Lone",
                src: "https://huyongshuang.top/music/Lone - 一个人想着一个人.mp3",
                cover: "https://huyongshuang.top/music/cover/Lone.jpg",
                smallCover: "https://huyongshuang.top/music/cover/Lone.jpg",
                lrcFile: "/music/lrc/Lone - 一个人想着一个人.lrc"
            }
        ];

        const errorTip = document.createElement('div');
        errorTip.style.cssText = `
            position: absolute; top: 10px; right: 10px;
            background: #ff6b6b; color: white;
            padding: 8px 12px; border-radius: 5px;
            z-index: 10000; font-size: 12px;
        `;
        errorTip.textContent = '配置加载失败，使用默认音乐';
        playerWrapper.appendChild(errorTip);
        setTimeout(() => errorTip.remove(), 4000);
    }

    // 初始化渲染歌单列表
    function initMusicList() {
        musicList.innerHTML = '';
        musicData.forEach((music, index) => {
            const item = document.createElement('div');
            item.className = `music-item ${index === currentMusicIndex ? 'active' : ''}`;
            item.dataset.index = index;
            item.innerHTML = `
                <img src="${music.smallCover}" alt="${music.title}" class="music-cover-small">
                <div class="music-info">
                    <div class="music-title">${music.title}</div>
                    <div class="music-artist">${music.artist}</div>
                </div>
                <div class="music-duration">${musicDurations[index] ? formatTime(musicDurations[index]) : '加载中...'}</div>
            `;
            item.addEventListener('click', () => {
                if (index === currentMusicIndex) {
                    togglePlayPause();
                } else {
                    selectMusic(index);
                    isPlaying = true;
                    audioPlayer.play().then(() => {
                        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                        albumStatus.textContent = '正在播放';
                        updateAlbumCoverRotation();
                    }).catch(e => console.error(e));
                }
                closeMusicList();
            });
            musicList.appendChild(item);
            if (!musicDurations[index]) preloadMusicDuration(index);
        });
    }

    // 预加载指定歌曲的时长
    function preloadMusicDuration(index) {
        const tempAudio = new Audio();
        tempAudio.addEventListener('loadedmetadata', () => {
            if (!isNaN(tempAudio.duration) && tempAudio.duration > 0) {
                musicDurations[index] = tempAudio.duration;
                const el = musicList.querySelector(`.music-item[data-index="${index}"] .music-duration`);
                if (el) el.textContent = formatTime(tempAudio.duration);
            }
            tempAudio.remove();
        });
        tempAudio.addEventListener('error', () => tempAudio.remove());
        tempAudio.src = musicData[index].src;
        tempAudio.load();
    }

    // 更新专辑封面旋转动画状态
    function updateAlbumCoverRotation() {
        if (!albumCover.style.animation) {
            albumCover.style.animation = 'rotate 20s linear infinite';
            albumCover.classList.add('playing');
        }
        if (isPlaying) {
            albumCover.classList.remove('paused');
            albumCover.classList.add('playing');
            albumCover.style.animationPlayState = 'running';
        } else {
            albumCover.classList.remove('playing');
            albumCover.classList.add('paused');
            albumCover.style.animationPlayState = 'paused';
        }
    }

    // 加载LRC歌词文件
    async function loadLrcFile(path) {
        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error('加载失败');
            return await res.text();
        } catch (e) {
            console.error('歌词加载失败:', e);
            return null;
        }
    }

    // 切换并加载指定歌曲
    async function selectMusic(index) {
        currentMusicIndex = index;
        document.querySelectorAll('.music-item').forEach((el, i) => {
            el.classList.toggle('active', i === index);
        });

        const music = musicData[index];
        audioPlayer.src = music.src;
        albumCover.src = music.cover;
        nowPlayingTitle.textContent = music.title;
        nowPlayingArtist.textContent = music.artist;
        albumStatus.textContent = isPlaying ? '正在播放' : '已暂停';

        albumCover.style.animation = 'none';
        setTimeout(() => {
            albumCover.style.animation = 'rotate 20s linear infinite';
            updateAlbumCoverRotation();
        }, 10);

        if (music.lrcFile) {
            const text = await loadLrcFile(music.lrcFile);
            parseLyrics(text || '');
        } else {
            parseLyrics('');
        }

        if (isPlaying) setTimeout(() => audioPlayer.play(), 100);
        else {
            audioPlayer.load();
            updateProgress();
        }
    }

    // 解析LRC格式歌词文本
    function parseLyrics(text) {
        lyrics = [];
        currentLyricIndex = -1;
        lyricsWrapper.innerHTML = '';

        if (!text) {
            const line = document.createElement('div');
            line.className = 'lyric-line active';
            line.textContent = '暂无歌词';
            lyricsWrapper.appendChild(line);
            return;
        }

        const lines = text.split('\n');
        lines.forEach(line => {
            const match = line.match(/\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/);
            if (match) {
                const time = parseInt(match[1])*60 + parseInt(match[2]) + (match[3] ? parseInt(match[3])/(match[3].length===2?100:1000) : 0);
                const content = line.replace(/\[\d{2}:\d{2}(?:\.\d{2,3})?\]/g, '').trim();
                if (content) lyrics.push({ time, text: content });
            }
        });
        lyrics.sort((a,b) => a.time - b.time);

        const frag = document.createDocumentFragment();
        lyrics.forEach(item => {
            const line = document.createElement('div');
            line.className = 'lyric-line';
            line.textContent = item.text;
            frag.appendChild(line);
        });
        lyricsWrapper.appendChild(frag);
        updateLyricsPosition(0);
    }

    // 更新歌词滚动位置与高亮
    function updateLyricsPosition(idx) {
        const allLines = lyricsWrapper.querySelectorAll('.lyric-line');
        if (!allLines.length) return;

        allLines.forEach(l => l.classList.remove('active'));
        if (allLines[idx]) allLines[idx].classList.add('active');

        const containerH = lyricsContainer.clientHeight;
        const lineH = allLines[0].clientHeight;
        const totalH = allLines.length * lineH;

        let offset = idx * lineH + lineH/2 - containerH/2;
        const maxOffset = totalH - containerH;
        if (offset < 0) offset = 0;
        if (offset > maxOffset) offset = maxOffset;

        lyricsWrapper.style.transform = `translateY(${-offset}px)`;
    }

    // 同步当前播放时间对应的歌词
    function updateLyrics() {
        if (!lyrics.length) return;
        const ct = audioPlayer.currentTime;
        let newIdx = 0;
        for (let i = lyrics.length-1; i >= 0; i--) {
            if (lyrics[i].time <= ct + 0.12) {
                newIdx = i;
                break;
            }
        }
        if (newIdx !== currentLyricIndex) {
            currentLyricIndex = newIdx;
            updateLyricsPosition(newIdx);
        }
    }

    // 更新进度条与时间显示
    function updateProgress() {
        if (!isNaN(audioPlayer.duration) && audioPlayer.duration > 0) {
            const pct = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progress.style.width = `${pct}%`;
            const t = formatTime(audioPlayer.currentTime);
            const total = formatTime(audioPlayer.duration);
            currentTimeDisplay.textContent = t;
            currentTime.textContent = t;
            totalTimeDisplay.textContent = total;
            totalTime.textContent = total;
        }
    }

    // 秒数格式化为分:秒
    function formatTime(sec) {
        const m = Math.floor(sec/60);
        const s = Math.floor(sec%60);
        return `${m}:${s<10?'0':''}${s}`;
    }

    // 切换播放与暂停状态
    function togglePlayPause() {
        if (isPlaying) {
            audioPlayer.pause();
        } else {
            if (!audioPlayer.src) { selectMusic(currentMusicIndex); return; }
            audioPlayer.play().then(() => {
                isPlaying = true;
                playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                albumStatus.textContent = '正在播放';
                updateAlbumCoverRotation();
            }).catch(e => console.error(e));
        }
    }

    // 切换上一首歌曲
    function playPrev() {
        currentMusicIndex = (currentMusicIndex - 1 + musicData.length) % musicData.length;
        selectMusic(currentMusicIndex);
    }

    // 切换下一首歌曲
    function playNext() {
        currentMusicIndex = (currentMusicIndex + 1) % musicData.length;
        selectMusic(currentMusicIndex);
    }

    // 切换循环播放开关
    function toggleLoop() {
        isLooping = !isLooping;
        audioPlayer.loop = isLooping;
        loopBtn.classList.toggle('active', isLooping);
    }

    // 切换倍速选择面板显示
    function toggleSpeedSelector() {
        speedSelector.classList.toggle('show');
    }

    // 设置播放倍速
    function selectSpeed(speed) {
        playbackRate = speed;
        audioPlayer.playbackRate = playbackRate;
        speedBtn.innerHTML = `<span>${playbackRate}x</span>`;
        speedBtn.classList.add('active');
        document.querySelectorAll('.speed-option').forEach(opt => {
            opt.classList.toggle('active', parseFloat(opt.dataset.speed) === speed);
        });
        speedSelector.classList.remove('show');
    }

    // 三态背景模式切换：自动→白色→黑色→自动
    function toggleTheme() {
        if (themeMode === 'auto') {
            themeMode = 'light';
            playerWrapper.classList.add('force-light');
            playerWrapper.classList.remove('force-dark');
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            themeBtn.title = '白色背景';
            playerWrapper.style.removeProperty('--mobile-text-color');
        } else if (themeMode === 'light') {
            themeMode = 'dark';
            playerWrapper.classList.add('force-dark');
            playerWrapper.classList.remove('force-light');
            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            themeBtn.title = '黑色背景';
            playerWrapper.style.removeProperty('--mobile-text-color');
        } else {
            themeMode = 'auto';
            playerWrapper.classList.remove('force-light', 'force-dark');
            themeBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i>';
            themeBtn.title = '自动背景';
            setMobileMenuBg();
        }
    }

    // 点击进度条跳转播放位置
    function seekTo(e) {
        if (!audioPlayer.duration || audioPlayer.duration <= 0) return;
        const rect = progressBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const p = Math.max(0, Math.min(1, x / rect.width));
        audioPlayer.currentTime = p * audioPlayer.duration;
        if (!isPlaying) {
            updateProgress();
            updateLyrics();
        }
    }

    // 打开移动端歌单抽屉
    function openMusicList() {
        musicListContainer.classList.add('active');
        mobileOverlay.classList.add('active');
    }

    // 关闭移动端歌单抽屉
    function closeMusicList() {
        musicListContainer.classList.remove('active');
        mobileOverlay.classList.remove('active');
    }

    // 初始化所有事件监听
    function initEvents() {
        playPauseBtn.addEventListener('click', togglePlayPause);
        prevBtn.addEventListener('click', playPrev);
        nextBtn.addEventListener('click', playNext);
        progressBar.addEventListener('click', seekTo);

        volumeSlider.addEventListener('input', () => {
            audioPlayer.volume = volumeSlider.value / 100;
        });

        loopBtn.addEventListener('click', toggleLoop);
        speedBtn.addEventListener('click', toggleSpeedSelector);
        themeBtn.addEventListener('click', toggleTheme);

        document.querySelectorAll('.speed-option').forEach(opt => {
            opt.addEventListener('click', () => selectSpeed(parseFloat(opt.dataset.speed)));
        });

        mobileMenuBtn.addEventListener('click', openMusicList);
        musicListCloseBtn.addEventListener('click', closeMusicList);
        mobileOverlay.addEventListener('click', closeMusicList);

        document.addEventListener('click', e => {
            if (!speedBtn.contains(e.target) && !speedSelector.contains(e.target)) {
                speedSelector.classList.remove('show');
            }
        });

        audioPlayer.addEventListener('timeupdate', () => {
            updateProgress();
            updateLyrics();
        });

        audioPlayer.addEventListener('ended', () => {
            if (!isLooping) {
                playNext();
                isPlaying = true;
                audioPlayer.play().then(() => {
                    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    albumStatus.textContent = '正在播放';
                    updateAlbumCoverRotation();
                }).catch(e => console.error(e));
            } else {
                audioPlayer.currentTime = 0;
                audioPlayer.play();
            }
        });

        audioPlayer.addEventListener('loadedmetadata', updateProgress);
        audioPlayer.addEventListener('pause', () => {
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            albumStatus.textContent = '已暂停';
            updateAlbumCoverRotation();
        });
        audioPlayer.addEventListener('play', () => {
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            albumStatus.textContent = '正在播放';
            updateAlbumCoverRotation();
        });
        audioPlayer.addEventListener('seeked', updateLyrics);

        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) closeMusicList();
        });
    }

    // 播放器初始化入口函数
    function initApp() {
        setMobileMenuBg();
        
        loadMusicData().then(() => {
            if (musicData.length > 0) {
                initMusicList();
                initEvents();
                selectMusic(0);
                audioPlayer.volume = volumeSlider.value / 100;
                selectSpeed(1.0);
            } else {
                nowPlayingTitle.textContent = '无法加载音乐';
                nowPlayingArtist.textContent = '请检查配置文件';
            }
        });
    }

    // 页面加载完成后启动播放器
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
})();
</script>
{% endraw %}