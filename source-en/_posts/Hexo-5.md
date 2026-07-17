---
title: Hexo Tutorial (5) - Deploy to Cloud Server
date: 2024/10/24 15:12:28
updated: 2025/12/17 23:45:27
tags:
  - Tutorial
  - Hexo
  - Blog
categories:
  - Tutorial
  - Hexo
keywords: Tutorial, Hexo, Blog, Cloud Server
description: "Preparation for deploying Hexo to a cloud server: 1. Local Hexo project files that have been completed; 2. Purchased cloud server, such as Tencent Cloud, Alibaba Cloud, etc.; 3. Server system: CentOS or Ubuntu; 4. Server has opened ports: 22 (SSH), 80 (HTTP), 443 (HTTPS, optional); 5. Obtained server public IP, root account password/key; 6. Purchased domain name and registered (unregistered cannot be accessed) (optional); 7. Purchased SSL certificate (can be accessed via HTTPS) (optional)."
top_img: 0.png
cover: 0.png
series: hexo
sticky: 99
---

[[toc]]

# I. Preparations

1. Completed local Hexo project files, see: [**Hexo Tutorial (Part 1)**](/en/2024/10/1-Hexo-1), [**Hexo Tutorial (Part 2)**](/en/2024/10/2-Hexo-2), [**Hexo Tutorial (Part 3)**](/en/2024/10/3-Hexo-3), etc.
2. A purchased cloud server, such as Tencent Cloud, Alibaba Cloud, etc.
3. Server OS: CentOS or Ubuntu, etc.
4. Open server ports: 22 (SSH), 80 (HTTP), 443 (HTTPS, optional).
5. Server **public IP** and **root password / SSH key** obtained.
6. Domain purchased and filed (ICP filing required for access in China) (optional).
7. SSL certificate purchased (enables HTTPS access) (optional).

---

# II. Deploy to Cloud Server
## 1. Log in to Cloud Server (run in local terminal) (optional)

```bash
ssh root@server_ip
```
After running, you will be prompted for the server root password; enter it to log in.

## 2. Update System Packages

```bash
# CentOS
sudo yum update && sudo yum upgrade -y
# Ubuntu / Debian
sudo apt update && sudo apt upgrade -y
```

## 3. Install Git

```bash
# CentOS
sudo yum install git -y
# Ubuntu / Debian
sudo apt install git -y
```

## 4. Install Nginx (to serve Hexo static files)

```bash
# CentOS
sudo yum install nginx -y
# Ubuntu / Debian
sudo apt install nginx -y
```

## Install Both at Once (optional)

```bash
# CentOS
sudo yum install git nginx -y
# Ubuntu / Debian
sudo apt install git nginx -y
```

## 5. Start Nginx

```bash
# Start Nginx
sudo systemctl start nginx
# Enable Nginx to start on boot
sudo systemctl enable nginx
```

## 6. Create Website Root Directory (for Hexo static files)

```bash
sudo mkdir -p /blog/hexo
```

* **Modify permissions**: [^1]
```bash
sudo chown -R $USER:$USER /blog/hexo
sudo chmod -R 755 /blog/hexo
```

## 7. Configure Nginx

1. Create the Nginx configuration file:

```bash
sudo vim /etc/nginx/conf.d/hexo.conf
```

In the opened `vim` editor, enter the following configuration (press `i` to enter insert mode):

```hexo.conf
server {
    listen 80;
    server_name domain.com; # Domain / server IP
    root /blog/hexo; # Blog files directory
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

When finished editing, press `Esc`, then type `:wq` to save and exit `vim`.

```bash
# Verify configuration
sudo nginx -t
# Restart Nginx
sudo systemctl restart nginx
```

2. Ubuntu / Debian systems (optional)

Create the Nginx configuration file and enter the config (same as above):

```bash
sudo vim /etc/nginx/sites-available/hexo
```

Then enable the configuration:

```bash
# Create symlink (enable the site)
sudo ln -s /etc/nginx/sites-available/hexo /etc/nginx/sites-enabled/
# Verify config and restart Nginx
sudo nginx -t && sudo systemctl restart nginx
```

## 8. Create Git Bare Repository Directory

```bash
sudo mkdir -p /blog/hexo.git
```

* **Modify permissions**: [^2]
```bash
sudo chown -R $USER:$USER /blog/hexo.git
sudo chmod -R 755 /blog/hexo.git
```

Initialize the bare repository:
```bash
cd /blog/hexo.git
git config --global init.defaultBranch main
sudo git init --bare
```

## 9. Create Git Hook

```bash
sudo vim /blog/hexo.git/hooks/post-receive
```

Enter the following:
```post-receive
#!/bin/bash
git --work-tree=/blog/hexo --git-dir=/blog/hexo.git checkout -f
```

* **Grant execute permission**: [^3]
```bash
sudo chown -R $USER:$USER /blog/hexo.git/hooks/post-receive
sudo chmod +x /blog/hexo.git/hooks/post-receive
```

## 10. Modify Hexo Config and Deploy

`repo` format: `{admin_username}@{server_ip}:{git_bare_repo_path}`
```yaml
deploy:
  type: git
  repo: root@server_ip:/blog/hexo.git
  branch: main
```

Finally, run:
```bash
hexo clean && hexo g && hexo s
```
You will be prompted for the server root password; enter it to complete deployment.

---

# III. Common Issues
## 1. 404 Not Found

Nginx misconfiguration: the `root` directive points to the wrong directory, `location` rules are improperly set, or DNS resolution is incorrect.

## 2. 403 Forbidden

After configuring Nginx, if you see `403 Forbidden` when visiting the site, the Nginx configuration itself is likely fine.
If `403 Forbidden` appears after deployment, possible causes include:

### (1) Insufficient File/Directory Permissions

Make sure all permission-related commands (`chown` and `chmod`) from the steps above have been executed.
* [**Check Permissions**](#check-permissions)

### (2) SELinux / AppArmor Restrictions

Solutions:

(1) Identify the active security module
```bash
# Check SELinux
sestatus
# Check AppArmor
systemctl status apparmor
```
* If `sestatus` shows `SELinux status: enabled`, it's `SELinux`.
* If the `apparmor` service is `active`, it's `AppArmor`.

(2) Disable SELinux
```bash
# Temporarily disable SELinux (for testing)
sudo setenforce 0
# Permanently disable SELinux
sudo sed -i 's/^SELINUX=.*/SELINUX=disabled/' /etc/selinux/config
```
* A server reboot is required for the change to take effect.

(3) Disable AppArmor
```bash
# Temporarily disable AppArmor
# Find the corresponding AppArmor profile
sudo aa-status
# Temporarily put Nginx profile into complain mode
sudo aa-complain /etc/apparmor.d/usr.sbin.nginx
# Permanently modify the profile
# Open the Nginx AppArmor profile
sudo vim /etc/apparmor.d/usr.sbin.nginx
# Add allowed paths in the file
/blog/hexo/** r,
/blog/hexo.git/hooks/post-receive r,
# Reload the profile
sudo apparmor_parser -r /etc/apparmor.d/usr.sbin.nginx
```

### (3) Git Hook Sync Issues

Check whether Hexo static files exist in the website root directory. If they do, the issue is with Nginx configuration; if not, first check the hook file.
```bash
# Navigate to hooks directory
cd /blog/hexo.git/hooks
# Manually execute the hook
./post-receive
```

If it says `directory does not exist` or `permission denied`, follow the steps above to **create the directory** and **fix permissions**;
if files sync successfully, the hook itself is fine and the issue may be due to environment variable differences. Modify the hook as follows:
```post-receive
#!/bin/bash
unset GIT_DIR
/usr/bin/git --work-tree=/blog/hexo --git-dir=/blog/hexo.git checkout -f
```

### (4) File Owner/Group

Some cloud servers have a default username other than `root`. For example, Ubuntu on Tencent Cloud uses `ubuntu` as the default user; when you log in as `root`, the Linux prompt shows `root@VM-0-9-ubuntu`, which can be confusing. Here's the simplest way to resolve all file ownership issues. (`@` is the separator: username before `@`, hostname after.)

* First, confirm your cloud server's username — usually found in the cloud server console;
* Then, in the Hexo config, change the admin username in `"{admin_username}@{server_ip}:{git_bare_repo_path}"` to your actual cloud server username;
* Finally, change the owner/group of the `hexo`, `hexo.git`, and `post-receive` files to your cloud server username.

For example, if my cloud server username is `ubuntu`, the config would be `repo: ubuntu@IP:/blog/hexo.git`, and I would run `sudo chown -R ubuntu:ubuntu {file_path}` to update the owner/group of `hexo`, `hexo.git`, and `post-receive`.
{% asset_img 1.png Figure 1 %}
**Note**: `$USER` refers to the currently logged-in user. If I'm logged in as `root`, the commands above would set owner/group to `root` instead of `ubuntu`, which could cause issues.
{% asset_img 2.png Figure 2 %}

---

# IV. Create a Git User (Avoid Deploying as root) (optional)

* All steps remain the same except the ones below.

## 1. Create Git User

```bash
# Create git user and auto-generate /home/git home directory
useradd -m git
# Set password for git user
passwd git
```
After running `passwd git`, enter the password twice.

## 2. Grant Sudo Privileges to Git User

```bash
# Edit sudoers file
visudo
# Find the line "root ALL=(ALL) ALL" and add below it:
git ALL=(ALL) ALL
```
{% asset_img 3.png Figure 3 %}

## 3. Log in via SSH (locally)

```bash
ssh git@server_ip
```

## 4. Modify Permissions

Use `sudo chown -R git:git {file_path}` to change the owner/group of `hexo`, `hexo.git`, and `post-receive`.

## 5. Update Hexo Configuration

```yaml
repo: git@IP:/blog/hexo.git
```

---

# V. SSH Passwordless Login

* Private key (id_rsa): stored on the client (local machine)
* Public key (id_rsa.pub): uploaded to the server
* During login, the server verifies the client's private key against the public key; on a successful match, login is passwordless.

Choose one of the three methods below. The third is recommended — simplest, but requires a Tencent Cloud server.

## 1. Local → Server

(1) Generate SSH key pair locally
```bash
# Generate SSH key pair (-t specifies encryption type rsa, -C adds comment, usually an email)
ssh-keygen -t rsa -C "your_email@example.com"
```

You will be prompted:
`Enter file in which to save the key (C:\Users\username/.ssh/id_rsa)`: press Enter (use default path)
`Enter passphrase (empty for no passphrase)`: press Enter (no passphrase for passwordless login)
`Enter same passphrase again`: press Enter again

This generates `id_rsa` (private key) and `id_rsa.pub` (public key) in the `~/.ssh/` directory.

(2) Upload the public key to the server
A: Upload via command (use Git Bash, or install OpenSSH)
```bash
ssh-copy-id root@server_ip
# For git user
ssh-copy-id git@server_ip
```

B: Upload manually
```bash
# View and copy the public key locally (on your machine)
cat ~/.ssh/id_rsa.pub
# Upload the public key content to the server (on the server)
su git  # Switch to git user (as git user)
mkdir -p ~/.ssh  # Create .ssh directory
chmod 700 ~/.ssh  # Set directory permissions
vim ~/.ssh/authorized_keys  # Edit authorized_keys, paste the public key
chmod 600 ~/.ssh/authorized_keys  # Set file permissions
```

## 2. Server → Local

(1) Generate SSH key pair on the server
```bash
ssh-keygen -t rsa -C "server_key"
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

(2) Download the server private key to local
A: Download via command
```bash
scp -P 22 root@192.168.1.100:~/.ssh/id_rsa ~/.ssh/server_id_rsa
```

B: Download manually
```bash
# View and copy the private key on the server (on the server)
cat ~/.ssh/id_rsa
# Create a file locally and paste the private key (on your machine, use Git Bash)
vi ~/.ssh/server_id_rsa  # Create file locally, paste the private key
chmod 600 ~/.ssh/server_id_rsa  # Set private key permissions
```

## 3. Tencent Cloud SSH Key

Log in to the **Tencent Cloud Console** → go to **Cloud Virtual Machine** or **LightHouse** → find **SSH Keys** in the left sidebar.

(1) Create a new key → local
**Create Key** → **Select Region** → **Name the key** → **Create a new key pair** → **OK**. The browser will automatically download the private key file (`.pem` format). Be sure to save it — this is your only download opportunity. Move the downloaded `.pem` file to `C:\Users\username\.ssh\` and rename it to `id_rsa`.

(2) Local → Use existing public key (optional)
```bash
# Run locally
ssh-keygen -t rsa -C "your_email@example.com"
# View and copy the public key locally
cat ~/.ssh/id_rsa.pub
```

**Create Key** → **Select Region** → **Name the key** → **Use an existing public key** → **Paste your local public key** → **OK**.

(3) Bind the SSH key
On the **SSH Keys** page in the Tencent Cloud console, click **Bind Instances** and select your cloud server; or on the **Cloud Virtual Machine** page, click **SSH Key**, then **Bind Key**, and select the key you just created.

---

# Check Permissions

[^1]: Website root directory `/blog/hexo`
[^2]: Git bare repository directory `/blog/hexo.git`
[^3]: Git hook file `/blog/hexo.git/hooks/post-receive`