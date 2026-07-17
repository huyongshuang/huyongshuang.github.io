---
title: Hexo Tutorial (1) – Site Construction, Deployment & Writing
date: 2024/10/1 13:14:27
updated: 2025/12/12 15:27:36
tags:
  - Tutorial
  - Hexo
  - Blog
categories:
  - Tutorial
  - Hexo
keywords: Tutorial, Hexo, Blog
description: "This article mainly walks you through building a personal blog website from scratch using Hexo and GitHub Pages, covering five sections: preparation, creating a GitHub repository, installing Hexo, deploying to GitHub Pages, and basic blog writing."
top_img: 0.png
cover: 0.png
series: hexo
sticky: 100
---

[[toc]]

# I. Preparations
## 1. Install Git

Official download: [https://git-scm.com](https://git-scm.com).
After installation, right-click on your desktop and you will see `Open Git GUI here` and `Open Git Bash here`; we will use `Git Bash`.
{% asset_img 1.png Figure 1 %}

Chinese localization for Git Bash: Open `Git Bash`, right-click and select `Options`, choose `Window` on the left sidebar, select `zh_CN` under `UI language`, then click `Save`.
Chinese localization for Git GUI: Download the localization package from [https://github.com/stayor/git-gui-zh](https://github.com/stayor/git-gui-zh), or click <a href="{% asset_path zh_cn.msg %}" download="zh_cn.msg">**here to download**</a>.

Type `git --version` in the terminal. If the version number is displayed, Git is installed successfully.
```bash
git --version
```
{% asset_img 2.png Figure 2 %}

Configure Git username and email:
(1) Global configuration (sets username and email for all projects)
```bash
git config --global user.name "your username"
git config --global user.email "your email address"
```
(2) Per-project configuration (sets username and email for the current project)
```bash
cd /path/to/your/project
git config user.name "your username"
git config user.email "your email address"
```
(3) Verify the configuration
```bash
git config user.name
git config user.email
```
{% asset_img 3.png Figure 3 %}

## 2. Install Node.js

Official download: [https://nodejs.org/zh-cn/download](https://nodejs.org/zh-cn/download).
Type `node -v` in the terminal. If the version number is displayed, Node.js is installed successfully.
```bash
node -v
```
{% asset_img 4.png Figure 4 %}

npm is installed along with Node.js. Type `npm -v` to check its version.
```bash
npm -v
```
{% asset_img 5.png Figure 5 %}

## 3. Register a GitHub Account

Official website: [https://github.com](https://github.com).
Click the `Sign up` button, fill in your `username`, `password` and `email address`, then click `Create account`.

---

# II. Create a Repository

Create a repository on GitHub to host our website files.
On the GitHub homepage, click the `+` icon in the top-right corner, then select `New repository` to go to the repository creation page.
{% asset_img 6.png Figure 6 %}

Enter the repository name in the `Repository name` field, which must follow the format `<username>.github.io`. You will then be able to access your site via `https://<username>.github.io`. You can fill in a repository description in the `Description` field, then click `Create repository`.
{% asset_img 7.png Figure 7 %}

---

# III. Install Hexo

Hexo is a fast, simple and powerful blog framework. It parses articles written in Markdown (or other markup languages) and generates static web pages with beautiful themes in seconds.

## 1. Install Hexo

Once all required applications are installed, you can install Hexo via npm.
```bash
npm install -g hexo-cli
```
Check Hexo version
```bash
hexo version
or hexo -v
```

## 2. Initialize a New Site

After installing Hexo, run the following commands. Hexo will create all required files in the specified folder. (`<folder>` is your project folder name, customizable; if omitted, the site will be created in the current directory.)
```bash
hexo init <folder>
cd <folder>
npm install
```

After initialization, your project folder structure will look like this:
{% asset_img 8.png Figure 8 %}
1. `scaffolds`: Template folder. When you create a new post, Hexo generates the file based on the corresponding scaffold.
2. `source`: Asset folder for user content. Except for the `_posts` folder, files/folders starting with `_` (underscore) and hidden files will be ignored. Markdown and HTML files will be parsed and placed in the `public` folder, while other files will be copied as-is.
3. `themes`: Theme folder. Hexo generates static pages based on the active theme (themes installed via `npm` are stored in the `node_modules` folder).
4. `_config.yml`: Site configuration file. You can configure most site parameters here.
5. `package.json`: Application metadata.

## 3. Generate Static Files and Local Preview

```bash
hexo generate # Generate static files
or hexo g
hexo server   # Start local preview
or hexo s
```

All generated static files are stored in the `public` folder.
Default preview URL: http://localhost:4000
Use the following command to specify a custom port.
```bash
hexo server -p <port number>
```
Visit in your browser: http://localhost:4000
{% asset_img 9.png Figure 9 %}

---

# IV. Deploy to GitHub Pages
## 1. Install hexo-deployer-git

```bash
npm install hexo-deployer-git --save
```

Edit the `_config.yml` file to configure GitHub deployment settings.
```yaml
deploy:
  type: git
  repo: <repository url> # https://github.com/huyongshuang/huyongshuang.github.io.git
  branch: [branch]
  token: [token]
  message: [message]
```
1. `repo`: URL of the target repository, available on the repository page.
{% asset_img 10.png Figure 10 %}
2. `branch`: Target branch name.
3. `message`: Custom commit message.
4. `token`: Personal access token for repository authentication. Follow the steps below to generate one:
Go to [https://github.com/settings/tokens/new](https://github.com/settings/tokens/new). As shown below, enter a note for the token in the `Note` field, select `No expiration` under `Expiration` to avoid expiration, check the `repo` scope under `Select scopes`, then click `Generate token`. The full token will only be displayed once and will be hidden after you refresh the page, so be sure to save it immediately!
{% asset_img 11.png Figure 11 %}

Deploy to GitHub Pages
```bash
hexo clean
hexo generate -d
```

## 2. Push via Git Commands

Push all files in the `public` folder to the `main` branch of your GitHub repository.
{% asset_img 12.png Figure 12 %}

(1) Initialize a local repository
```bash
git init -b main
```

(2) Stage files
```bash
# Stage a single file
git add <filename>
# Stage all files
git add .
```

(3) Commit files
```bash
git commit -m "Initial commit"
```

(4) Link to the remote repository
```bash
# Using HTTPS
git remote add origin https://github.com/username/repository-name.git
# Using SSH (requires SSH Key configuration first)
git remote add origin git@github.com:username/repository-name.git
```

(5) Push to GitHub
```bash
# First push
git push -u origin main
# Subsequent pushes
git push
```

(6) If there are conflicts between the remote and local repositories, run:
```bash
# Pull remote changes and rebase
git pull --rebase origin main
# Push changes
git push -u origin main
```

Or force overwrite the remote branch:
```bash
git push -u origin main --force
```

## 3. Push via Visual Studio Code

Open the `public` folder in Visual Studio Code, click `Source Control` on the left sidebar, then click `Initialize Repository`. Follow the steps in **Method 2** above to complete the push.
{% asset_img 13.png Figure 13 %}

After deployment, visit [https://<username>.github.io](https://huyongshuang.github.io) to view your new website.

---

# V. Writing Posts
## 1. Post Creation Command

```bash
hexo new [layout] <title>
```

* After running the command, a Markdown file will be generated under the `source/_posts` folder. You can then start writing your post.
* `post` is the default layout. You can also use custom layouts, and change the default layout by modifying the `default_layout` setting in `_config.yml`.
* Hexo has three default layouts: `post`, `page` and `draft`. Files created with the `post` layout are saved under `source/_posts`, `page` layout under `source`, and `draft` layout under `source/_drafts`.
* Use the publish command below to move a draft to the `source/_posts` folder.

```bash
hexo publish [layout] <title>
```

## 2. Basic Markdown Syntax
### (1) Headings

1. Use `#` for headings. The number of `#` symbols indicates the heading level, and there must be a space between `#` and the heading text.
```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
```

2. Placing `=` or `-` below a line of text will render it as a **level-1 heading** or **level-2 heading**, respectively.
```markdown
Level 1 Heading
====
Level 2 Heading
----
```

### (2) Text Formatting

1. Bold
```markdown
**Bold text**
```
2. Italic
```markdown
*Italic text*
```
3. Bold + Italic
```markdown
	***Bold italic text***
```
4. Strikethrough
```markdown
~~Strikethrough text~~
```
5. Underline
```markdown
<u>Underlined text</u>	
```
Preview:
① **Bold text**
② *Italic text*
③ ***Bold italic text***
④ ~~Strikethrough text~~
⑤ <u>Underlined text</u>

6. Footnotes
① Add `[^identifier]` at the end of the text to annotate;
② Write `[^identifier]: annotation content` anywhere in the document (usually at the end).
```markdown
The road ahead is long and far; I shall search high and low for truth.[^1]
……
[^1]: The journey in pursuit of truth is a long one, but I will persevere and spare no effort in seeking and exploring. This line expresses the poet's unwavering courage and determination in the pursuit of truth, embodying perseverance and unshakable integrity.
```
Preview:
The road ahead is long and far; I shall search high and low for truth.[^1]  [^2]

### (3) Lists

1. Unordered Lists
Start lines with `-`, `+` or `*`, with a space between the symbol and text. Nested lists are supported (indent by 2 spaces or 1 Tab for nesting).
```markdown
- Unordered item 1
  - Nested subitem 1
  - Nested subitem 2
+ Unordered item 2
* Unordered item 3
```
Preview:
  - Unordered item 1
    - Nested subitem 1
    - Nested subitem 2
  + Unordered item 2
  * Unordered item 3

2. Ordered Lists
Start lines with `number.`, with a space between the number and text. Nested lists are also supported.
```markdown
1. Ordered item 1
  1. Nested subitem 1
  2. Nested subitem 2
2. Ordered item 2
3. Ordered item 3
```
Preview:
  1. Ordered item 1
    1. Nested subitem 1
    2. Nested subitem 2
  2. Ordered item 2
  3. Ordered item 3

3. Task Lists
Use `- [ ]` for incomplete tasks and `- [x]` for completed tasks. The `space` and `x` inside the brackets are key: `[ ]` and `[x]`.
```markdown
- [ ] Todo item 1
- [x] Completed item 2
- [ ] Todo item 3
```
Preview: [^3]
  - [ ] Todo item 1
  - [x] Completed item 2
  - [ ] Todo item 3

### (4) Blockquotes

Use `>` for blockquotes. Nesting is supported (each additional `>` adds one nesting level).
```markdown
> Level 1 quote
>> Level 2 quote
>>> Level 3 quote
```
Preview:
  > Level 1 quote
  >> Level 2 quote
  >>> Level 3 quote

### (5) Tables

Use `|` to separate columns, `-` to separate the header from content. `:` controls alignment: `:---` for left-aligned, `---:` for right-aligned, `:---:` for centered.
```markdown
| Name | Age | Occupation |
| :--- | :---: | ---: |
| Zhang San | 25 | Programmer |
| Li Si | 30 | Designer |
```

Preview:

| Name | Age | Occupation |
| :--- | :---: | ---: |
| Zhang San | 25 | Programmer |
| Li Si | 30 | Designer |

### (6) Horizontal Rules

Create a horizontal rule with three or more `*`, `-` or `_` on a single line (no other content allowed on the line).
```markdown
---

----

***

****

___

____
```
Preview:

---

----

***

****

___

____

* **Note**:
A line of text immediately followed by `---` will be parsed as an `<h2>` level-2 heading. When using `---` as a horizontal rule, leave a blank line before and after it, or use `***` or `___` instead.
If you write `***`, `---`, `___` consecutively without blank lines between them, the parser will merge them into a single horizontal rule `<hr>` instead of multiple separate lines.

### (7) Links

1. Standard Links
Syntax: `[link text](link URL "optional tooltip text")`
```markdown
[Baidu](https://www.baidu.com "Click to go to Baidu")
```
Preview: [Baidu](https://www.baidu.com "Click to go to Baidu")

2. Anchor Links (jump to headings within the document)
Syntax: `[Jump to Heading 1](#heading-1)` (the heading text must exactly match the target heading, including case and spaces)
```markdown
[Back to top](#I-Preparations)
```
Preview: [Back to top](#I-Preparations)  [^4]

3. Image Links
Syntax: `![image alt text](image URL "optional tooltip text")` (alt text is required, displayed when the image fails to load)
```markdown

```
Preview:


### (8) Code

1. Inline Code
Wrap text with backticks `` ` ``, suitable for single-line code or code snippets.
```markdown
This is inline code: `print("Hello Markdown")`
```
Preview:
This is inline code: `print("Hello Markdown")`

2. Code Blocks
Wrap content with three backticks ``` ``` ```. You can specify the programming language (e.g. python, java) after the opening backticks for syntax highlighting.
````markdown
```python
# This is a Python code block
def hello():
    print("Hello Markdown!")
hello()
```
````
Preview:
```python
# This is a Python code block
def hello():
    print("Hello Markdown!")
hello()
```

3. Nested Code Blocks
Use four or more backticks `` ```` `` to wrap content that contains three backticks, achieving nested code blocks.
`````markdown
````markdown
```python
# This is a Python code block
def hello():
    print("Hello Markdown!")
hello()
```
````
`````
Preview:
````markdown
```python
# This is a Python code block
def hello():
    print("Hello Markdown!")
hello()
```
````

## 3. Insert Assets

Modify the `_config.yml` file to automatically create an asset folder when a new post is created.
```yaml
post_asset_folder: true
```

After running `hexo new post Blog`, an asset directory with the same name as the post will be generated under the `source/_posts` folder.
{% asset_img 14.png Figure 14 %}

Add an image and a txt file to the Blog folder.
{% asset_img 15.png Figure 15 %}

Add the following content to the Markdown file:
```markdown
{% asset_img picture.png Image %}
{% asset_link test.txt Test %}
```

After deployment, you will see the image on your site. Click `Test` to open the txt file.
{% asset_img 16.png Figure 16 %}
{% asset_img 17.png Figure 17 %}

To make the file downloadable on click, use the following content:
```markdown
<a href="{% asset_path test.txt %}" download="downloaded-file.txt">Download</a>
```
As shown below, the file can be downloaded successfully:
{% asset_img 18.png Figure 18 %}

## 4. Front-matter

Front-matter is the configuration block at the beginning of a Markdown file for post settings.
```yaml
---
title: Hexo Tutorial (Part 1)
date: 2024/10/1 13:14:27
---
```

* Settings & Default Values:

| Setting | Description | Default Value |
| :---: | :---: | :---: |
| layout | Layout | config.default_layout |
| title | Post title | Post filename |
| date | Creation date | File creation date |
| updated | Update date | File update date |
| comments | Enable comment feature for the post | true |
| tags | Tags (not applicable to pages) | |
| categories | Categories (not applicable to pages) | |
| permalink | Override the post permalink, must end with / or .html | null |
| excerpt | Plain text post excerpt | |
| disableNunjucks | Disables rendering of Nunjucks tags and tag plugins when enabled | false |
| lang | Set language to override auto-detection | Inherited from _config.yml |
| published | Whether the post is published | true for posts under _posts, false for drafts under _drafts |

---

# Notes

[^1]: The journey in pursuit of truth is a long one, but I will persevere and spare no effort in seeking and exploring. This line expresses the poet's unwavering courage and determination in the pursuit of truth, embodying perseverance and unshakable integrity.
[^2]: If the footnotes cannot be rendered, you can switch to another rendering engine, such as `hexo-renderer-kramed`.
[^3]: The display issue here is caused by the Markdown renderer, not related to the syntax.
[^4]: Using a non-default rendering engine such as `hexo-renderer-kramed` to render Markdown might cause anchor links to fail to navigate. You can use absolute links like `[Back to Top](/en/2024/10/1-Hexo-1/#I-Preparations)` or revert to the default rendering engine `hexo-renderer-marked`.