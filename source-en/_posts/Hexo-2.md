---
title: Hexo Tutorial (2) - Configuration
date: 2024/10/2 12:23:56
updated: 2025/12/15 15:48:42
tags:
  - Tutorial
  - Hexo
  - Blog
categories:
  - Tutorial
  - Hexo
keywords: Tutorial, Hexo, Blog
description: If you have installed a Hexo theme, most of the settings will be handled in the _config.[theme].yml file of the theme configuration. Since the priority of the theme configuration file is higher than that of the Hexo configuration file, most of the information about the Hexo configuration file will not be necessary to pay attention to. I will introduce a few commonly used settings of Hexo configuration files at the end.
top_img:
cover:
series: hexo
---

Modify most of the configurations in the `_config.yml` file. Click to <a href="{% asset_path config.yml %}" download="_config.yml">**download**</a> the Chinese annotated version of the Hexo configuration file.
**Pre-reading note**: If you have installed a Hexo theme, most of the settings will be operated in the theme configuration file `_config.[theme].yml`. Because the priority of the theme configuration file is higher than that of the Hexo configuration file, most of the following introduction about the Hexo configuration file can be ignored. I will introduce several commonly used settings of Hexo configuration files at the end. 

**Hexo Configuration File Details**:

# 1. Site

```yaml
title: Hexo # The title of your website
subtitle: '' # The subtitle of your website
description: '' # The description of your website
keywords: # The keywords of your website
author: John Doe # Your name
language: en # The language of your website
timezone: '' # The timezone of your website. Some examples are America/New_York, Japan, and UTC.
```

# 2. URL

```yaml
url: http://example.com # The URL of your website
root: / # The root directory of your website
permalink: :year/:month/:day/:title/ # The permalink format of articles
permalink_defaults: # Default values of each segment in permalink
pretty_urls: # Rewrite the permalink variables to pretty URLs
  trailing_index: true # Trailing index.html, set to false to remove it
  trailing_html: true # Trailing .html, set to false to remove it (does not apply to trailing index.html)
```

# 3. Directory

```yaml
source_dir: source # Source folder. Where your content is stored
public_dir: public # Public folder. Where the static site will be generated
tag_dir: tags # Tag directory
archive_dir: archives # Archive directory
category_dir: categories # Category directory
code_dir: downloads/code # Include code directory (subdirectory of source_dir)
i18n_dir: :lang # 	i18n directory
skip_render: # Paths that will be copied to public raw, without being rendered
#  - "_posts/test-post.md" # Skip individual file, format: path/file
#  - "_posts/*" # Skip all files in the specified directory, format: dir/*
#  - "_posts/**" # Skip the entire directory (including all subdirectories/files), format: dir/**
#  - "*.js" # Skip all js files, format: *.ext
#  - "scripts/*.js" # Skip all js files in the "scripts" directory, in the format: dir/*.ext
```

# 4. Writing

```yaml
new_post_name: :title.md # 	The filename format for new posts
default_layout: post # Default layout
titlecase: false # Transform titles into title case
external_link:
  enable: true # Open external links in a new tab
  field: site # Applies to the whole site or post only
  exclude: '' # Exclude hostname. Specify subdomain when applicable, including www
filename_case: 0 # Transform filenames to 1 lower case; 2 upper case
render_drafts: false # Display drafts
post_asset_folder: false # 	Enable the Asset Folder
relative_link: false # Make links relative to the root folder
future: true # Display future posts
syntax_highlighter: highlight.js # Grammar Highlighting Tool
highlight:
  line_number: true # Display of line numbers of the code
  auto_detect: false # Automatically detect the programming language of the code
  tab_replace: '' # Replace the "Tab" characters in the code with an empty string
  wrap: true # Open the packaging container of the code
  hljs: false # Disable the built-in hljs-* class names of highlight.js
prismjs:
  preprocess: true # Code preprocessing
  line_number: true # Display of line numbers of the code
  tab_replace: '' # Replace the "Tab" characters in the code with an empty string
```

# 5. Home page setting

```yaml
index_generator: # Generate an archive of posts
  path: '' # Root path for your blog’s index page
  per_page: 10 # Posts displayed per page
  order_by: -date # Posts order. Order by descending date (new to old) by default.
```

* Here, `index_generator.per_page: 10` refers to the page-specific pagination for the home page only. It controls the number of articles displayed per page on the homepage (the main page) and has a higher priority than `per_page: 10`.

# 6. Category & Tag

```yaml
default_category: uncategorized # 	Default category
category_map: # 	Override category slugs	
tag_map: # Override tag slugs
```

# 7. Metadata elements

```yaml
meta_generator: true # Whether to generate the <meta name="generator" ...> tag
```

# 8. Date / Time format

```yaml
date_format: YYYY-MM-DD # Date format
time_format: HH:mm:ss # Time format
updated_option: 'mtime' # The updated value to used when not provided in the front-matter
```

# 9. Pagination

```yaml
per_page: 10 # Number of posts displayed on each page. disables pagination 0
pagination_dir: page # URL format
```

* Here, `per_page: 10` is the default pagination setting applicable to the entire site. It is used for all pagination pages such as category pages, tag pages, archive pages, and search results pages.

# 10. Include / Exclude Files or Folders

```yaml
include:  # Include hidden files
exclude:  # Exclude files/folders
ignore:  # Ignore files/folders
```

# 11. Extensions

```yaml
theme: landscape # Theme name. disables theming false.
```

# 12. Deployment

Deployment configuration is as follows: [**Deploy to GitHub Pages**](/en/2024/10/1-Hexo-1#IV-Deploy-to-GitHub-Pages)
```yaml
deploy:
  type: git
  repo: <repository url> # https://github.com/huyongshuang/huyongshuang.github.io.git
  branch: [branch]
  token: [token]
  message: [message]
```

# Common Hexo Configuration

```yaml
# The language used on the website is generally Chinese.
language: zh-CN

# By using the following configuration, you can remove the ".html" and "index.html" at the end of the permanent links while keeping the file suffix of the generated HTML files intact.
permalink: :year/:month/:day/:title.html
pretty_urls:
  trailing_index: false
  trailing_html: false

# Skip rendering
skip_render:
  - "_posts/test-post.md" # Skip individual file, format: path/file
  - "_posts/*" # Skip all files in the specified directory, format: dir/*
  - "_posts/**" # Skip the entire directory (including all subdirectories/files), format: dir/**
  - "*.js" # Skip all js files, format: *.ext
  - "scripts/*.js" # Skip all js files in the "scripts" directory, in the format: dir/*.ext

# If you want to provide pictures and other resources more regularly and distribute their resources across various articles, please enable the following settings. After executing the command "hexo new post Blog" in the source/_posts folder, a resource directory with the same name as the article was generated.
post_asset_folder: true

# If you have installed a Hexo theme, after you have set up the theme configuration, you need to enable the following settings, otherwise the theme configuration will not be read.
theme: redefine

# When using hexo-deployer-git for one-click deployment, the following configurations are required
deploy:
  type: git
  repo: <repository url> # https://github.com/huyongshuang/huyongshuang.github.io.git
  branch: [branch]
  token: [token]
  message: [message]
```