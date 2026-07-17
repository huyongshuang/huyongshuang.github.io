---
title: 壁纸
date:
keywords:
description:
comments:
top_img:
aside:
---

<script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>

<style>
/* PC头部布局 */
.album-header {
    display: flex;
    gap: 32px;
    align-items: center;
    margin-bottom: 42px;
}

/* 封面容器 */
.cover-box {
    width: 330px;
    height: 230px;
    flex-shrink: 0;
    border-radius: 10px;
    overflow: hidden;
    cursor: zoom-in;
    background-color: #f6f6f6;
}

/* 封面图片 */
.cover-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

/* 头部文字外层 */
.album-text {
    flex: 1;
}

/* 相册大标题 */
.album-title {
    font-size: 44px;
    font-weight: 700;
    margin-bottom: 14px;
}

/* 相册描述文字 */
.album-desc {
    font-size: 16px;
    color: #666666;
    line-height: 1.8;
}

/* 日期分组标题 */
.date-group-title {
    font-size: 21px;
    margin: 40px 0 18px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eeeeee;
}

/* 照片网格容器 */
.media-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
}

/* 媒体卡片 */
.media-card {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    cursor: zoom-in;
    background: #f8f8f8;
}

/* 卡片内图片、视频通用样式 */
.media-card img,
.media-card video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

/* 卡片底部悬浮文字 */
.media-caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px 12px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.68));
    color: #ffffff;
}

/* 卡片内图片名称 */
.media-caption .pic-name {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
}

/* 卡片内图片描述 */
.media-caption .pic-desc {
    font-size: 12px;
    opacity: 0.9;
}

/* 全屏放大弹窗 */
.lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.93);
    z-index: 9999;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
}

.lightbox.show {
    display: flex;
}

/* 弹窗关闭按钮 */
.lightbox-close {
    position: absolute;
    top: 24px;
    right: 36px;
    font-size: 40px;
    color: #fff;
    cursor: pointer;
    user-select: none;
    z-index: 10;
}

/* 左右切换按钮 */
.lightbox-prev,
.lightbox-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 50px;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.15);
    width: 50px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    border-radius: 6px;
    z-index: 10;
    transition: background 0.2s;
}

.lightbox-prev:hover,
.lightbox-next:hover {
    background: rgba(255, 255, 255, 0.15);
}

/* 左右切换按钮定位 */
.lightbox-prev {
    left: 20px;
}

.lightbox-next {
    right: 20px;
}

/* 弹窗内图片/视频尺寸 */
.lightbox-media {
    max-width: 92vw;
    max-height: 82vh;
}

/* 弹窗底部文字容器 */
.lightbox-text {
    margin-top: 20px;
    color: white;
    text-align: center;
    max-width: 900px;
}

/* 弹窗图片名称 */
.lightbox-name {
    font-size: 24px;
    margin-bottom: 6px;
}

/* 弹窗拍摄日期 */
.lightbox-date {
    font-size: 16px;
    opacity: 0.75;
    margin-bottom: 8px;
}

/* 弹窗图片描述 */
.lightbox-desc {
    font-size: 16px;
    opacity: 0.86;
    line-height: 1.7;
}

/* 手机端适配 768px以下 */
@media (max-width: 768px) {
    .album-header {
        flex-direction: column;
        position: relative;
        margin-bottom: 30px;
    }

    .cover-box {
        width: 100%;
        height: 270px;
    }

    .album-text {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 22px 16px;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.72));
        border-radius: 0 0 10px 10px;
    }

    .album-title {
        font-size: 30px;
        color: #fff;
    }

    .album-desc {
        font-size: 14px;
        color: #eeeeee;
    }

    /* 手机一行3张 */
    .media-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
    }

    .date-group-title {
        font-size: 18px;
        margin: 28px 0 14px;
    }

    .lightbox-prev,
    .lightbox-next {
        width: 30px;
        height: 60px;
        font-size: 30px;
    }

    .lightbox-prev {
        left: 8px;
    }

    .lightbox-next {
        right: 8px;
    }

    .lightbox-media {
        max-width: 75vw;
        max-height: 65vh;
    }
}
</style>

<div class="album-header" id="albumHeader">
    <div class="cover-box" id="coverWrap">
        <img id="coverImg" alt="相册封面" class="no-lightbox">
    </div>
    <div class="album-text">
        <h1 class="album-title" id="albumName"></h1>
        <p class="album-desc" id="albumDesc"></p>
    </div>
</div>
<div id="photoContainer"></div>
<div class="lightbox" id="lightbox">
    <span class="lightbox-close" id="closeBtn">×</span>
    <span class="lightbox-prev" id="prevBtn">&lt;</span>
    <span class="lightbox-next" id="nextBtn">&gt;</span>
    <img class="lightbox-media" id="lbImg" style="display:none;">
    <video class="lightbox-media" id="lbVideo" controls style="display:none;"></video>
    <div class="lightbox-text" id="lbText"></div>
</div>

<script>
let globalCfg = {};
let mediaAll = [];
let currentIndex = -1;
const coverWrap = document.getElementById('coverWrap');
const coverImg = document.getElementById('coverImg');
const albumName = document.getElementById('albumName');
const albumDesc = document.getElementById('albumDesc');
const photoContainer = document.getElementById('photoContainer');
const lightbox = document.getElementById('lightbox');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const lbImg = document.getElementById('lbImg');
const lbVideo = document.getElementById('lbVideo');
const lbText = document.getElementById('lbText');

// 加载配置：优先 YML，加载/解析失败时自动降级为 JSON
async function loadConfig() {
    let cfg = null;

    // 第一步：尝试加载 YAML 配置
    try {
        const res = await fetch('./config.yml');
        if (!res.ok) throw new Error('YAML 文件不存在');
        const yamlText = await res.text();
        cfg = jsyaml.load(yamlText);
    } catch (yamlErr) {
        console.warn('YAML 配置加载失败，自动尝试加载 JSON 配置', yamlErr);

        // 第二步：YAML 失败，尝试加载 JSON 配置
        try {
            const res = await fetch('./config.json');
            if (!res.ok) throw new Error('JSON 文件不存在');
            cfg = await res.json();
        } catch (jsonErr) {
            alert('读取配置文件失败，请检查配置文件路径是否正确');
            console.error('YAML 和 JSON 配置均加载失败', jsonErr);
            return;
        }
    }

    // 初始化全局配置，设置默认值与路径兼容
    globalCfg = cfg.global || {};
    if (!globalCfg.local_media_path) globalCfg.local_media_path = 'photos/';
    // 自动补全路径末尾斜杠，避免拼接错误
    if (!globalCfg.local_media_path.endsWith('/')) {
        globalCfg.local_media_path += '/';
    }

    // 解析本地与远程媒体列表，兼容空列表
    const localList = cfg.local_media_list || [];
    const remoteList = cfg.remote_media_list || [];
    mediaAll = [
        ...parseLocalMedia(localList),
        ...parseRemoteMedia(remoteList)
    ];

    renderHeader();
    sortAndGroupMedia();
}

// 解析本地媒体：从 ID 提取日期，路径由 local_media_path 拼接
function parseLocalMedia(list) {
    return list.map(item => {
        const idArr = item.id.split('-');
        const year = idArr[0];
        const month = idArr[1];
        const day = idArr[2];
        const sortNum = parseInt(idArr[3], 10) || 0;
        const dateShow = `${year}/${month}/${day}`;
        const dateTime = new Date(`${year}-${month}-${day}`).getTime();

        return {
            id: item.id,
            type: 'local',
            ext: item.ext,
            name: item.name || '',
            desc: item.description || '',
            fullSrc: `${globalCfg.local_media_path}${item.id}.${item.ext}`,
            dateStr: dateShow,
            dateSort: dateTime,
            serial: sortNum
        };
    });
}

// 解析远程媒体：支持 YYYY-MM-DD-NN 格式，按日期+序号排序
function parseRemoteMedia(list) {
    return list.map((item, index) => {
        let year, month, day, serialNum;
        const dateRaw = item.date;

        // 兜底分支：YAML 自动解析为 Date 对象（带序号的date不会进入此分支）
        if (dateRaw instanceof Date) {
            year = dateRaw.getFullYear();
            month = String(dateRaw.getMonth() + 1).padStart(2, '0');
            day = String(dateRaw.getDate()).padStart(2, '0');
            serialNum = index;
        }
        // 主逻辑：字符串格式「年-月-日-序号」解析
        else {
            const dateStr = String(dateRaw || '1970-01-01-0');
            const parts = dateStr.split('-');
            year = parts[0] || '1970';
            month = parts[1] || '01';
            day = parts[2] || '01';

            // 提取第4段作为当日序号，解析失败则默认为0
            serialNum = parts[3] ? parseInt(parts[3], 10) : 0;
            if (isNaN(serialNum)) serialNum = 0;
        }

        const dateShow = `${year}/${month}/${day}`;
        const dateTime = new Date(`${year}-${month}-${day}`).getTime();

        // 从 URL 提取后缀，自动识别图片/视频
        const ext = item.url.split('.').pop().toLowerCase() || 'jpg';

        return {
            id: `remote_${index}_${encodeURIComponent(item.url)}`,
            type: 'remote',
            ext: ext,
            name: item.name || '',
            desc: item.description || '',
            fullSrc: item.url,
            dateStr: dateShow,
            dateSort: dateTime,
            serial: serialNum
        };
    });
}

// 媒体统一排序 + 分组渲染
function sortAndGroupMedia() {
    mediaAll.sort((a, b) => {
        if (globalCfg.new_first) {
            if (b.dateSort !== a.dateSort) return b.dateSort - a.dateSort;
            return a.serial - b.serial;
        } else {
            if (a.dateSort !== b.dateSort) return a.dateSort - b.dateSort;
            return a.serial - b.serial;
        }
    });
    groupAndRender(mediaAll);
}

// 渲染顶部封面信息
function renderHeader() {
    coverImg.src = globalCfg.cover_path;
    albumName.innerText = globalCfg.album_name;
    albumDesc.innerText = globalCfg.album_desc;
}

// 按日期分组渲染页面
function groupAndRender(list) {
    photoContainer.innerHTML = '';
    const groupMap = new Map();
    list.forEach(item => {
        if (!groupMap.has(item.dateStr)) groupMap.set(item.dateStr, []);
        groupMap.get(item.dateStr).push(item);
    });

    groupMap.forEach(groupItems => {
        const date = groupItems[0].dateStr;
        const title = document.createElement('h2');
        title.className = 'date-group-title';
        title.innerText = date;
        photoContainer.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'media-grid';
        groupItems.forEach(media => {
            grid.appendChild(createMediaCard(media));
        });
        photoContainer.appendChild(grid);
    });
}

// 生成单张媒体卡片
function createMediaCard(media) {
    const card = document.createElement('div');
    card.className = 'media-card';

    let el;
    // 支持常见视频格式自动识别
    if (['mp4', 'webm', 'ogg'].includes(media.ext)) {
        el = document.createElement('video');
        el.muted = true;
    } else {
        el = document.createElement('img');
    }
    el.src = media.fullSrc;
    card.appendChild(el);

    if (media.name || media.desc) {
        const cap = document.createElement('div');
        cap.className = 'media-caption';
        cap.innerHTML = `
                <div class="pic-name">${media.name}</div>
                <div class="pic-desc">${media.desc}</div>
            `;
        card.appendChild(cap);
    }

    card.onclick = () => {
        currentIndex = mediaAll.findIndex(m => m.id === media.id);
        openLightBox(media);
    };
    return card;
}

// 打开全屏弹窗
function openLightBox(media) {
    lbImg.style.display = 'none';
    lbVideo.style.display = 'none';
    lbVideo.pause();

    if (['mp4', 'webm', 'ogg'].includes(media.ext)) {
        lbVideo.src = media.fullSrc;
        lbVideo.style.display = 'block';
    } else {
        lbImg.src = media.fullSrc;
        lbImg.style.display = 'block';
    }

    lbText.innerHTML = `
            <div class="lightbox-name">${media.name || ''}</div>
            <div class="lightbox-date">拍摄日期：${media.dateStr}</div>
            <div class="lightbox-desc">${media.desc || ''}</div>
        `;
    lightbox.classList.add('show');
}

// 切换上一张
function prevMedia() {
    if (currentIndex <= 0) return;
    currentIndex -= 1;
    openLightBox(mediaAll[currentIndex]);
}

// 切换下一张
function nextMedia() {
    if (currentIndex >= mediaAll.length - 1) return;
    currentIndex += 1;
    openLightBox(mediaAll[currentIndex]);
}

// 封面点击放大
coverWrap.onclick = () => {
    currentIndex = -1;
    lbImg.src = globalCfg.cover_path;
    lbImg.style.display = 'block';
    lbVideo.style.display = 'none';
    lbText.innerHTML = `<div class="lightbox-name">相册封面</div>`;
    lightbox.classList.add('show');
};

// 关闭弹窗
function closeLightBox() {
    lightbox.classList.remove('show');
    lbVideo.pause();
    currentIndex = -1;
}

// 事件绑定
closeBtn.onclick = closeLightBox;
prevBtn.onclick = prevMedia;
nextBtn.onclick = nextMedia;
lightbox.onclick = (e) => {
    if (e.target === lightbox) closeLightBox();
};
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        closeLightBox();
    }
});

window.addEventListener('DOMContentLoaded', loadConfig);
</script>