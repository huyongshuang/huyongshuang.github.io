---
title: The solution for Hexo being unable to skip the rendering of yml files
date: 2024-11-11 15:42:51
updated:
tags:
categories:
keywords:
description:
top_img:
cover:
---

* Root cause of the problem: Hexo will recognize `.yml` / `.yaml` files as data files. These files will be actively parsed by Hexo and added to the template variable `site.data`. This process occurs before the `skip_render` setting takes effect. Therefore, even if `skip_render` is configured, Hexo will still first parse the `.yml` files and then attempt to skip rendering (but the parsing process has already been completed).
* Solution: Use a script to forcibly copy the `yml` file to the `public` directory. Create a `scripts` folder in the root directory of Hexo, and within this folder, create a JavaScript file named `copy-yaml.js`. Write the following code into this file. Alternatively, you can <a href="{% asset_path copy-yaml.js %}" download="copy-yaml.js">**download**</a> the `copy-yaml.js` file.

```javascript
'use strict';

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

// Make sure that the YAML file is copied to the public directory
hexo.extend.filter.register('after_generate', function() {
  console.log('Starting to process the YAML file copy...');
  
  const sourceDir = hexo.source_dir;
  const publicDir = hexo.public_dir;
  
  // Search for all YAML files
  function findAndCopyYamlFiles(dir, basePath = '') {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const relativePath = path.join(basePath, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursive processing of subdirectories
        findAndCopyYamlFiles(fullPath, relativePath);
      } else if (file.match(/\.(yml|yaml)$/i)) {
        // Process YAML files
        const destDir = path.join(publicDir, basePath);
        const destPath = path.join(destDir, file);
        
        // Ensure that the target directory exists
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        
        // Copy the file
        try {
          fs.copyFileSync(fullPath, destPath);
          console.log(`Already copied: ${relativePath} -> ${path.relative(publicDir, destPath)}`);
        } catch (err) {
          console.error(`Copy failed: ${relativePath}`, err.message);
        }
      }
    });
  }
  
  // Start the search from the "source" directory.
  findAndCopyYamlFiles(sourceDir);
  console.log('YAML file copy completed');
});
```

* Finally, modify the following configuration in the `_config.yml` configuration file.
```yaml
exclude:
  - "Path" # Path for storing YML files
```