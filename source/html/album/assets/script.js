// ========== 锁定封面图片路径 ==========
const LOCK_COVER = "./assets/lock.png";

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