---
title: 相册
date: 2025-06-24 00:56:16
keywords:
description: 分享生活，留住美好！
comments:
top_img:
aside:
---

<script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>

<style>
.page-header {
    text-align: center;
    margin-bottom: 40px;
}

.page-title {
    color: #222;
    font-weight: 500;
    font-size: 28px;
    margin-bottom: 10px;
}

.page-desc {
    color: #777;
    font-size: 15px;
    font-weight: bold;
}

/* 相册容器网格布局 */
.album-container {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}

/* 手机适配 每行3个 */
@media (max-width: 768px) {
    .album-container {
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
    }

    .page-title {
        font-size: 22px;
    }
}

/* 相册卡片 */
.album-card {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    aspect-ratio: 4 / 3;
}

.album-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.album-card:hover img {
    transform: scale(1.06);
}

/* 底部悬浮相册名称 */
.album-name {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
    color: #fff;
    font-size: 14px;
    text-align: center;
}

/* 密码弹窗遮罩 */
.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.mask.show {
    display: flex;
}

/* 白色密码弹窗 */
.pwd-box {
    background: #fff;
    padding: 30px 24px;
    border-radius: 12px;
    width: 320px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.pwd-box h3 {
    color: #333;
    margin-bottom: 20px;
    font-size: 16px;
    text-align: center;
}

.pwd-input {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    font-size: 15px;
    outline: none;
    margin-bottom: 16px;
}

.pwd-input:focus {
    border-color: #888;
}

.btn-group {
    display: flex;
    gap: 12px;
}

.btn-group button {
    flex: 1;
    padding: 11px;
    border-radius: 6px;
    border: none;
    font-size: 14px;
    cursor: pointer;
}

.confirm-btn {
    background: #333;
    color: #fff;
}

.cancel-btn {
    background: #f5f5f5;
    color: #333;
}

.tip-text {
    color: #f44336;
    font-size: 13px;
    text-align: center;
    margin-bottom: 10px;
    display: none;
}
</style>

<div class="page-header" id="headerWrap">
    <h2 class="page-title" id="pageTitle"></h2>
    <p class="page-desc" id="pageDesc"></p>
</div>
<div class="album-container" id="albumWrap"></div>
<div class="mask" id="mask">
    <div class="pwd-box">
        <h3>请输入相册访问密码</h3>
        <div class="tip-text" id="errTip">密码错误，请重新输入</div>
        <input type="password" class="pwd-input" id="pwdInput" placeholder="输入密码">
        <div class="btn-group">
            <button class="cancel-btn" id="cancelBtn">取消</button>
            <button class="confirm-btn" id="confirmBtn">确认</button>
        </div>
    </div>
</div>

<script>
// ========== 锁定封面图片路径 ==========
const LOCK_COVER = "./lock.png";

// 当前待访问相册缓存
let targetAlbum = null;

// DOM元素
const headerWrap = document.getElementById("headerWrap");
const pageTitle = document.getElementById("pageTitle");
const pageDesc = document.getElementById("pageDesc");
const wrap = document.getElementById("albumWrap");
const mask = document.getElementById("mask");
const pwdInput = document.getElementById("pwdInput");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");
const errTip = document.getElementById("errTip");

// 关闭弹窗
function closeMask() {
    mask.classList.remove("show");
    pwdInput.value = "";
    errTip.style.display = "none";
    targetAlbum = null;
}
cancelBtn.addEventListener("click", closeMask);
mask.addEventListener("click", e => {
    if (e.target === mask) closeMask();
});

// 密码确认跳转：当前页面跳转，不新开窗口
confirmBtn.addEventListener("click", () => {
    const inputPwd = pwdInput.value.trim();
    if (inputPwd === targetAlbum.password) {
        window.location.assign(targetAlbum.link);
    } else {
        errTip.style.display = "block";
    }
});
// 回车确认密码
pwdInput.addEventListener("keydown", e => {
    if (e.key === "Enter") confirmBtn.click();
});

// 加载并解析配置：优先 YML，失败降级 JSON
async function loadAlbumConfig() {
    try {
        const res = await fetch("./album.yml");
        if (!res.ok) throw new Error("YML 文件请求失败");
        const yamlText = await res.text();
        const config = jsyaml.load(yamlText);
        // 渲染全局标题与描述
        pageTitle.innerText = config.global.title;
        pageDesc.innerText = config.global.description;
        // 渲染相册列表
        renderAlbumList(config.album);
    } catch (ymlError) {
        // YML 加载失败，尝试加载 JSON 配置
        try {
            const res = await fetch("./album.json");
            const config = await res.json();
            pageTitle.innerText = config.global.title;
            pageDesc.innerText = config.global.description;
            renderAlbumList(config.album);
        } catch (jsonError) {
            wrap.innerHTML = "<p style='text-align:center;color:#666;grid-column:1/-1;'>相册配置文件加载失败，请检查album.yml或album.json路径！</p>";
            console.error("YML 加载失败：", ymlError);
            console.error("JSON 加载失败：", jsonError);
        }
    }
}

// 渲染相册卡片列表
function renderAlbumList(albumList) {
    wrap.innerHTML = "";
    albumList.forEach(album => {
        const card = document.createElement("div");
        card.className = "album-card";
        // 判断是否有密码，替换封面
        const showCover = album.password ? LOCK_COVER : album.cover;
        card.innerHTML = `
                <img src="${showCover}" alt="${album.name}">
                <div class="album-name">${album.name}</div>
            `;
        // 点击事件：当前页面跳转
        card.addEventListener("click", () => {
            if (!album.password) {
                // 无密码直接当前页跳转
                window.location.assign(album.link);
            } else {
                // 有密码弹出输入框
                targetAlbum = album;
                mask.classList.add("show");
                pwdInput.focus();
            }
        });
        wrap.appendChild(card);
    });
}

// 页面加载执行
window.addEventListener("DOMContentLoaded", loadAlbumConfig);
</script>