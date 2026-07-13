---
title: Hexo 教程（五） - 部署到云服务器
date: 2024/10/24 15:12:28
updated: 2025/12/17 23:45:27
tags:
  - 教程
  - Hexo
  - 博客
categories:
  - 教程
  - Hexo
keywords: 教程, Hexo, 博客, 云服务器
description: Hexo 部署到云服务器准备工作：1、已经完成的本地 Hexo 项目文件；2、已经购买的云服务器，如腾讯云、阿里云等等；3、服务器系统：CentOS 或 Ubuntu 等等；4、服务器已开放端口：22（SSH）、80（HTTP）、443（HTTPS，可选）；5、已获取服务器公网 IP、root 账号密码 / 密钥；6、已购买域名且备案（不备案无法访问）（可选）；7、购买 SSL 证书（可通过 HTTPS 访问）（可选）。
top_img: 0.png
cover: 0.png
series: hexo
sticky: 99
---

# 一、准备工作

1. 已经完成的本地 Hexo 项目文件，具体见：[**Hexo 教程（一）**](/2024/10/1-Hexo-1)、[**Hexo 教程（二）**](/2024/10/2-Hexo-2)、[**Hexo 教程（三）**](/2024/10/3-Hexo-3)等等。
2. 已经购买的云服务器，如腾讯云、阿里云等等。
3. 服务器系统：CentOS 或 Ubuntu 等等。
4. 服务器已开放端口：22（SSH）、80（HTTP）、443（HTTPS，可选）。
5. 已获取服务器 **公网IP**、**root 账号密码 / 密钥**。
6. 已购买域名且备案（不备案无法访问）（可选）。
7. 购买 SSL 证书（可通过 HTTPS 访问）（可选）。

---

# 二、部署到云服务器
## 1、登录云服务器（本地终端执行）（可选）

```bash
ssh root@服务器 IP
```
执行后会提示输入服务器 root 密码，输入即可登录。

## 2、更新系统软件包

```bash
# CentOS 系统
sudo yum update && sudo yum upgrade -y
# Ubuntu / Debian 系统
sudo apt update && sudo apt upgrade -y
```

## 3、安装 Git

```bash
# CentOS 系统
sudo yum install git -y
# Ubuntu / Debian 系统
sudo apt install git -y
```

## 4、安装 Nginx（用于托管 Hexo 静态文件）

```bash
# CentOS 系统
sudo yum install nginx -y
# Ubuntu / Debian 系统
sudo apt install nginx -y
```

## 同时安装（可选）

```bash
# CentOS 系统
sudo yum install git nginx -y
# Ubuntu / Debian 系统
sudo apt install git nginx -y
```

## 5、启动 Nginx

```bash
# 启动 Nginx
sudo systemctl start nginx
# 设置 Nginx 开机自启
sudo systemctl enable nginx
```

## 6、创建网站根目录（存放 Hexo 静态文件）

```bash
sudo mkdir -p /blog/hexo
```

* **修改权限**：[^1]
```bash
sudo chown -R $USER:$USER /blog/hexo
sudo chmod -R 755 /blog/hexo
```

## 7、配置 Nginx

1、创建 Nginx 配置文件：

```bash
sudo vim /etc/nginx/conf.d/hexo.conf
```

在打开的 `vim` 编辑器中，输入以下配置（按 `i` 进入编辑模式）：

```hexo.conf
server {
    listen 80;
    server_name domain.com; # 域名 / 服务器 IP
    root /blog/hexo; # 博客文件存放目录
    index index.html index.htm;

    location / {
        try_files $uri $uri/ /index.html;
    }
    
    error_page 404 /404.html;
    location = /404.html {
        root /blog/hexo;
        internal;
    }
}
```

编辑完成后，按 `Esc`，输入 `:wq` 保存并退出 `vim`。

```bash
# 验证配置
sudo nginx -t
# 重启 Nginx
sudo systemctl restart nginx
```

2、Ubuntu / Debian 系统（可选）

创建 Nginx 配置文件并输入配置（配置和上面一样）：

```bash
sudo vim /etc/nginx/sites-available/hexo
```

然后启用配置：

```bash
# 创建软链接（启用配置）
sudo ln -s /etc/nginx/sites-available/hexo /etc/nginx/sites-enabled/
# 验证配置并重启 Nginx
sudo nginx -t && sudo systemctl restart nginx
```

## 8、创建 Git 裸仓库目录

```bash
sudo mkdir -p /blog/hexo.git
```

* **修改权限**：[^2]
```bash
sudo chown -R $USER:$USER /blog/hexo.git
sudo chmod -R 755 /blog/hexo.git
```

初始化裸仓库：
```bash
cd /blog/hexo.git
git config --global init.defaultBranch main
sudo git init --bare
```

## 9、创建 Git 钩子（hooks）

```bash
sudo vim /blog/hexo.git/hooks/post-receive
```

输入以下内容：
```post-receive
#!/bin/bash
git --work-tree=/blog/hexo --git-dir=/blog/hexo.git checkout -f
```

* **修改执行权限**：[^3]
```bash
sudo chown -R $USER:$USER /blog/hexo.git/hooks/post-receive
sudo chmod +x /blog/hexo.git/hooks/post-receive
```

## 10、修改 Hexo 配置文件并部署

`repo` 格式：`{管理员用户名}@{服务器IP}:{Git裸仓库地址}`
```yaml
deploy:
  type: git
  repo: root@服务器IP:/blog/hexo.git
  branch: main
```

最后执行：
```bash
hexo clean && hexo g && hexo s
```
执行后会提示输入服务器 root 密码，输入即可完成部署。

---

# 三、常见问题
## 1、404 Not Found

Nginx 配置错误：`root` 路径指向了错误的目录，`location` 规则配置不当，或者域名解析错误。

## 2、403 Forbidden

在配置完 Nginx 后，访问网站如果出现 `403 Forbidden`，则说明 Nginx 配置没有问题。
在部署完之后，如果出现 `403 Forbidden`，则有以下可能：

### （1）文件/目录权限不足

请确保上面步骤中有关权限的命令（`chown` 和 `chmod`）都已执行。
* [**检查权限**](/2024/10/24-Hexo-5/#检查权限)

### （2）SELinux / AppArmor 限制

解决方法如下：

（1）判断当前系统的安全模块
```bash
# 检查 SELinux
sestatus
# 检查 AppArmor
systemctl status apparmor
```
* 如果 `sestatus` 输出 `SELinux status: enabled`，说明是 `SELinux`。
* 如果 `apparmor` 服务处于 `active` 状态，说明是 `AppArmor`。

（2）关闭 SELinux
```bash
# 临时关闭 SELinux（用于测试）
sudo setenforce 0
# 永久关闭 SELinux
sudo sed -i 's/^SELINUX=.*/SELINUX=disabled/' /etc/selinux/config
```
* 修改后需要重启服务器才能生效。

（3）关闭 AppArmor
```bash
# 临时关闭 AppArmor
# 找到对应的 AppArmor 配置文件
sudo aa-status
# 临时禁用 Nginx 配置
sudo aa-complain /etc/apparmor.d/usr.sbin.nginx
# 永久修改配置
# 打开 Nginx 的 AppArmor 配置文件
sudo vim /etc/apparmor.d/usr.sbin.nginx
# 在文件中添加允许访问的路径
/blog/hexo/** r,
/blog/hexo.git/hooks/post-receive r,
# 重新加载配置
sudo apparmor_parser -r /etc/apparmor.d/usr.sbin.nginx
```

### （3）Git 钩子同步问题

检查网站根目录是否有 Hexo 静态文件，如果有，则是 Nginx 配置错误的问题；如果没有，先检查钩子文件是否有问题。
```bash
# 进入钩子目录
cd /blog/hexo.git/hooks
# 手动执行钩子
./post-receive
```

如果提示 `目录不存在` 或者 `权限不足`，请按上面步骤 **创建目录** 和 **修改权限**；
如果文件同步过去了，则说明钩子文件没有问题，可能是环境变量差异的问题，请将钩子文件修改为以下内容：
```post-receive
#!/bin/bash
unset GIT_DIR
/usr/bin/git --work-tree=/blog/hexo --git-dir=/blog/hexo.git checkout -f
```

### （4）关于文件所有者/所属组

一些云服务器的默认主机名可能不是 `root`，如腾讯云里面的 Ubuntu 系统的主机名就为 `ubuntu`，而当以 `root` 用户名登录后，Linux 终端的提示符就会变成 `root@VM-0-9-ubuntu`，比较乱，下面介绍一个最简单的方法来解决所有关于文件所有者的问题。（`@` 为分隔符，`@` 前面为用户名，后面为主机名。）

* 首先，确定你的云服务器的用户名，一般在云服务器的控制台上找；
* 然后，在 Hexo 配置文件中，将 `“{管理员用户名}@{服务器IP}:{Git裸仓库地址}”` 这里的管理员用户名改为你的云服务器的用户名；
* 最后，将前面创建的 `hexo`、`hexo.git` 和 `post-receive` 文件的所有者/所属组改为你的云服务器的用户名。

例如，我的云服务器用户名为 `ubuntu`，那么配置文件就写 `repo: ubuntu@IP:/blog/hexo.git`，然后用 `sudo chown -R ubuntu:ubuntu {文件路径}` 命令修改 `hexo`、`hexo.git` 和 `post-receive` 文件的所有者/所属组。
{% asset_img 1.png 图1 %}
**注意**，前面的 `$USER` 是指向当前登录用户，如果我以 `root` 用户名登录，使用上面的命令就会把所有者/所属组改为 `root` 而不是 `ubuntu`，就有可能出现问题。
{% asset_img 2.png 图2 %}

---

# 四、创建 Git 用户（避免使用 root 部署）（可选）

* 除了下面的步骤，其他步骤均与上面相同。

## 1、创建 Git 用户

```bash
# 创建 Git 用户并自动生成 /home/git 主目录
useradd -m git
# 为 Git 用户设置密码
passwd git
```
执行 `passwd git` 后，输入两次密码。

## 2、给 Git 用户添加 sudo 权限

```bash
# 编辑 sudoers 文件
Visudo
# 在文件中找到 root ALL=(ALL) ALL 这一行，在下方添加：
git ALL=(ALL) ALL
```
{% asset_img 3.png 图3 %}

## 3、通过 SSH 登录（本地）

```bash
ssh git@服务器 IP
```

## 4、修改权限

使用 `sudo chown -R git:git {文件路径}` 修改 `hexo`、`hexo.git` 和 `post-receive` 文件的所有者/所属组。

## 5、修改 Hexo 配置文件

```yaml
repo: git@IP:/blog/hexo.git
```

---

# 五、SSH 免密登录

* 私钥（id_rsa）：保存在客户端（本地）
* 公钥（id_rsa.pub）：上传到服务端（服务器）
* 登录时，服务器用公钥验证客户端的私钥，匹配成功则免密登录。

下面三种方法三选一即可，推荐第三种，最简单，但需要腾讯云服务器。

## 1、本地 → 服务器

（1）本地生成 SSH 密钥
```bash
# 生成 SSH 密钥对（-t 指定加密类型为 rsa，-C 添加备注，一般填邮箱）
ssh-keygen -t rsa -C "your_email@example.com"
```

执行后会提示：
`Enter file in which to save the key (C:\Users\用户名/.ssh/id_rsa)`: 直接回车（使用默认路径）
`Enter passphrase (empty for no passphrase)`: 回车（设置空密码，免密登录）
`Enter same passphrase again`: 再次回车

最终会在 `~/.ssh/` 目录下生成 `id_rsa`（私钥）和 `id_rsa.pub`（公钥）。

（2）上传公钥到服务器
A：命令上传（请在 Git Bash 中进行，或者安装 OpenSSH）
```bash
ssh-copy-id root@服务器 IP
# Git 用户
ssh-copy-id git@服务器 IP
```

B：手动上传
```bash
# 本地查看公钥内容并复制（本地进行）
cat ~/.ssh/id_rsa.pub
# 将公钥内容上传至服务器（服务端进行）
su git  # 切换到 Git 用户（Git 用户进行）
mkdir -p ~/.ssh  # 创建 .ssh 目录
chmod 700 ~/.ssh  # 设置目录权限
vim ~/.ssh/authorized_keys  # 编辑 authorized_keys 文件，粘贴本地复制的公钥内容
chmod 600 ~/.ssh/authorized_keys  # 设置文件权限
```

## 2、服务器 → 本地

（1）服务器生成 SSH 密钥
```bash
ssh-keygen -t rsa -C "server_key"
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

（2）下载服务器私钥到本地
A：命令下载
```bash
scp -P 22 root@192.168.1.100:~/.ssh/id_rsa ~/.ssh/server_id_rsa
```

B：手动下载
```bash
# 服务器查看私钥内容并复制（服务端进行）
cat ~/.ssh/id_rsa
# 本地创建文件并粘贴私钥（本地进行）（请在 Git Bash 中进行）
vi ~/.ssh/server_id_rsa  # 本地终端创建文件，粘贴复制的私钥内容
chmod 600 ~/.ssh/server_id_rsa  # 设置私钥权限
```

## 3、腾讯云 SSH 密钥

登录 `腾讯云控制台` → 进入 `云服务器` 或 `轻量应用服务器` → 左侧导航栏找到 `SSH 密钥`。

（1）创建新密钥 → 本地
`创建密钥` → `选择地域` → `设置密钥名称` → `选择创建新密钥` → `确定`，浏览器会自动下载私钥文件（`.pem` 格式），务必保存好，这是唯一的下载机会。将下载的私钥文件（`.pem` 格式）移动到 `C:\Users\用户名\.ssh\` 并将文件名改为 `id_rsa`。

（2）本地 → 使用已有公钥（可选）
```bash
# 本地执行
ssh-keygen -t rsa -C "your_email@example.com"
# 本地查看公钥内容并复制
cat ~/.ssh/id_rsa.pub
```

`创建密钥` → `选择地域` → `设置密钥名称` → `选择使用已有公钥` → `粘贴本地公钥` → `确定`。

（3）绑定 SSH 密钥
在腾讯云控制台的 `SSH 密钥` 页面下，点击 `绑定实例`，选择绑定自己的云服务器即可；或者在 `云服务器` 页面下，点击 `SSH密钥`，点击 `绑定密钥`，选择刚刚创建的密钥即可。

---

# 检查权限

[^1]: 网站根目录 `/blog/hexo`
[^2]: Git 裸仓库目录 `/blog/hexo.git`
[^3]: Git 钩子文件 `/blog/hexo.git/hooks/post-receive`