---
title: Hexo Tutorial (4) - Comment System
date: 2024/10/4 19:36:23
updated: 2025/12/17 7:54:43
tags:
  - Tutorial
  - Hexo
  - Blog
categories:
  - Tutorial
  - Hexo
keywords: Tutorial, Hexo, Blog
description: There are many plugins for the comment system, and many themes also have built-in comment system plugins. Let's take the Redefine theme as an example to introduce the usage of the Waline comment system.
top_img: 0.png
cover: 0.png
series: hexo
---

* There are numerous plugins for comment systems, and many themes come with built-in comment system plugins. This tutorial takes the Redefine theme as an example to introduce the usage of the Waline comment system.
Official Documentation: [https://waline.js.org/guide/get-started/](https://waline.js.org/guide/get-started/)
Waline supports multiple deployment methods, such as Vercel, CloudBase, Netlify, Railway, Zeabur and more. You may select a suitable platform for deployment. The following steps use Zeabur deployment as an example; refer to the official documentation for other deployment solutions.

# 1. Server-side Configuration

1. Click the link: [https://github.com/walinejs/zeabur-starter/fork](https://github.com/walinejs/zeabur-starter/fork) to create the `Zeabur` starter scaffold. Fill in the repository name in the `Repository name` field, then click `Create fork` to finish creation.
{% asset_img 1.png Figure 1 %}

2. Click the link: [https://dash.zeabur.com](https://dash.zeabur.com) to log into the `Zeabur` dashboard. Click `Language` at the bottom-left corner to switch to Simplified Chinese. Hit `Create New Project` to create a new project, select the first region `Silicon Valley, United States`, open `Settings`, and set a name for the new project under `Project Name`.
{% asset_img 2.png Figure 2 %}

3. Click `Deploy New Service` to deploy a new service, select `Databases`, then pick `MongoDB`. The database service will be deployed automatically.
{% asset_img 3.png Figure 3 %}

4. Next, create the `Waline` service. Click `Add Service`, then tap `Configure GitHub` and complete GitHub authorization as prompted. On the `GitHub Repo` page, select the project you forked earlier and click `Deploy` to start deployment.
{% asset_img 4.png Figure 4 %}
{% asset_img 5.png Figure 5 %}

5. Finally, bind an accessible domain `<serverURL>` to the service. Select the newly created `Waline` service on the left sidebar, switch to the `Networking` tab on the right and click the `Generate Domain` button. Enter your desired domain prefix and click `Confirm` to finish domain binding.
{% asset_img 6.png Figure 6 %}

6. Open the newly bound domain in your browser to test comment posting functionality.
{% asset_img 7.png Figure 7 %}

# 2. Client-side Configuration

Fill the domain you set above into the `_config.redefine.yml` configuration file.
```yaml
comment:
  config:
    waline:
      serverUrl: https://huyongshuang.zeabur.app
```
The rendering effect is shown below:
{% asset_img 8.png Figure 8 %}

# 3. Comment Management

Visit `<serverURL>/ui/register` to register an account, or sign up via the comment input box. The first registered user will be assigned administrator privileges. After logging in as an admin, you can access the comment management panel to edit, mark or delete comments.
{% asset_img 9.png Figure 9 %}

# 4. Emoji Configuration

Reference Document: [https://waline.js.org/guide/features/emoji.html](https://waline.js.org/guide/features/emoji.html)
Add preset emoji URLs to the `_config.redefine.yml` config file.
```yaml
comment:
  config:
    waline:
      emoji: [
        "https://unpkg.com/@waline/emojis@1.4.0/bilibili",
        "https://unpkg.com/@waline/emojis@1.4.0/qq",
        "https://unpkg.com/@waline/emojis@1.4.0/weibo"
      ]
```
{% asset_img 10.png Figure 10 %}