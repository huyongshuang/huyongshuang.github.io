---
title: 留言板
date:
keywords:
description:
comments: false
top_img:
aside:
---

<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css"/>

<div id="waline"></div>

<script type="module">
    import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';
    init({
        el: '#waline',
        serverURL: 'https://comment.huyongshuang.top',
        emoji: [
            'https://unpkg.com/@waline/emojis@1.4.0/qq',
            'https://unpkg.com/@waline/emojis@1.4.0/weibo',
            'https://unpkg.com/@waline/emojis@1.4.0/bilibili',
            'https://unpkg.com/@waline/emojis@1.4.0/bmoji',
            'https://unpkg.com/@waline/emojis@1.4.0/tieba',
            'https://unpkg.com/@waline/emojis@1.4.0/tw-emoji'
        ],
        dark: 'html[data-theme="dark"]',
        requiredMeta: ['nick'],
/*        imageUploader: async (file) => {
            const githubUser = "huyongshuang";
            const githubRepo = "Images-Waline";
            const githubToken = "";

            // 自动读取当前页面路径作为文件夹名（去掉域名、首尾斜杠）
            const pagePath = window.location.pathname.replace(/^\/|\/$/g, '');
            // 首页路径为空时，默认存入 index 文件夹
            const uploadDir = pagePath || 'index';

            // 格式化时间为 年月日时分秒（YYYYMMDDHHmmss）
            const formatDateTime = (date) => {
                const pad = (n) => String(n).padStart(2, '0');
                return date.getFullYear()
                    + pad(date.getMonth() + 1)
                    + pad(date.getDate())
                    + pad(date.getHours())
                    + pad(date.getMinutes())
                    + pad(date.getSeconds());
            };
            const timePrefix = formatDateTime(new Date());
            const fileName = `${timePrefix}-${file.name}`;

            // 拼接完整文件路径
            const filePath = `${uploadDir}/${fileName}`;

            // 文件分段转 Base64（保留原有逻辑，解决大文件栈溢出）
            const getBase64 = (f) => new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const pureBase64 = e.target.result.split(',')[1];
                    resolve(pureBase64);
                };
                reader.readAsDataURL(f);
            });
            const base64Data = await getBase64(file);

            // GitHub API 上传接口
            const apiUrl = `https://api.github.com/repos/${githubUser}/${githubRepo}/contents/${filePath}`;
            const res = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    "Authorization": `token ${githubToken}`,
                    "Accept": "application/vnd.github.v3+json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: `Waline upload: ${fileName}`,
                    content: base64Data,
                    branch: "main"
                })
            });
            const data = await res.json();
            // 返回 CDN 加速链接
            return `https://cdn.jsdelivr.net/gh/${githubUser}/${githubRepo}@main/${filePath}`;
        },*/
        noCopyright: true,
        noRss: true,
        reaction: true,
        reactionCount: true,
    });
</script>