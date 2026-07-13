---
title: 文件目录树生成器
date:
keywords:
description:
comments:
top_img:
aside:
---

<style>
/* 默认: 日间模式 (Light Mode) - 继承 Butterfly 亮色主题 */
.dirtree-container {
  --bg-color: #f6f8fa;
  --container-bg: #ffffff;
  --text-color: #24292f;
  --text-color-muted: #57606a;
  --primary-color: #0969da;
  --primary-hover-color: #0a60c8;
  --border-color: #d0d7de;
  --output-bg: #f6f8fa;
  --button-bg: #f6f8fa;
  --button-hover-bg: #eef1f4;
  --success-color: #1a7f37;
  --notice-text: #9a6700;
  --notice-bg: #fff8c5;
  --notice-border: #f2c600;
  --shadow-color: rgba(140, 149, 159, 0.2);
  --shadow-glow: 0 0 12px rgba(9, 105, 218, 0.3);
}

/* 暗黑模式适配 - Butterfly 主题 data-theme="dark" */
[data-theme="dark"] .dirtree-container {
  --bg-color: #0d1117;
  --container-bg: #161b22;
  --text-color: #c9d1d9;
  --text-color-muted: #8b949e;
  --primary-color: #58a6ff;
  --primary-hover-color: #79c0ff;
  --border-color: #30363d;
  --output-bg: #010409;
  --button-bg: #21262d;
  --button-hover-bg: #30363d;
  --success-color: #238636;
  --notice-text: #d29922;
  --notice-bg: rgba(210, 153, 34, 0.1);
  --notice-border: rgba(210, 153, 34, 0.2);
  --shadow-color: rgba(0, 0, 0, 0.3);
  --shadow-glow: 0 0 12px rgba(88, 166, 255, 0.3);
}

/* --- 容器基础样式 --- */
.dirtree-container {
  background-color: inherit;
  background-size: 30px 30px;
  color: var(--text-color);
  width: 100%;
  max-width: 900px;
  padding: 2rem 3rem;
  margin: 0 auto;
  line-height: 1.7;
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

/* --- 头部 --- */
.dirtree-container header {
  text-align: left;
  margin-bottom: 2.5rem;
}

.dirtree-container header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  letter-spacing: 1px;
  margin: 0;
  transition: color 0.3s ease;
}

.dirtree-container header .subtitle {
  font-size: 1.1rem;
  color: var(--text-color-muted);
  margin: 0.5rem 0 0 0;
  transition: color 0.3s ease;
}

/* --- 控制区 --- */
.dirtree-container .controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.dirtree-container #select-folder-btn {
  background-color: var(--primary-color);
  color: white;
  font-weight: 500;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.dirtree-container #select-folder-btn:hover {
  background-color: var(--primary-hover-color);
  box-shadow: var(--shadow-glow);
}

.dirtree-container #select-folder-btn:disabled {
  background-color: var(--button-bg);
  color: var(--text-color-muted);
  cursor: not-allowed;
  box-shadow: none;
}

.dirtree-container #exclude-input {
  flex-grow: 1;
  background-color: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0.7rem 1rem;
  transition: all 0.2s ease;
}

.dirtree-container #exclude-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary-color) 25%, transparent);
}

/* --- 结果区 --- */
.dirtree-container .results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.dirtree-container .results-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
}

.dirtree-container .view-controls-panel {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-grow: 1;
  flex-wrap: wrap;
}

.dirtree-container .control-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dirtree-container .control-group-wide {
  flex-grow: 1;
}

.dirtree-container .control-group label {
  font-size: 0.9rem;
  color: var(--text-color-muted);
  white-space: nowrap;
}

.dirtree-container .control-group input[type="number"] {
  width: 60px;
}

.dirtree-container .control-group input {
  background-color: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
  text-align: center;
  transition: all 0.2s ease;
}

.dirtree-container .control-group-wide input {
  flex-grow: 1;
  text-align: left;
  padding-left: 0.8rem;
}

.dirtree-container #copy-btn,
.dirtree-container .view-controls-panel button {
  background-color: var(--button-bg);
  color: var(--primary-color);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: auto;
}

.dirtree-container #copy-btn:hover,
.dirtree-container .view-controls-panel button:hover {
  background-color: var(--button-hover-bg);
  border-color: var(--primary-color);
}

.dirtree-container #copy-btn.copied {
  background-color: var(--success-color);
  color: white;
  border-color: var(--success-color);
}

.dirtree-container .output-wrapper {
  background-color: var(--output-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.dirtree-container #tree-output {
  margin: 0;
  font-size: 0.95rem;
  max-height: 450px;
  overflow: auto;
  white-space: pre;
}

/* --- 使用说明区 --- */
.dirtree-container #info-section {
  margin-top: 4rem;
  border-top: 1px solid var(--border-color);
  padding-top: 2rem;
  transition: border-color 0.3s ease;
}

.dirtree-container #info-section article {
  margin-bottom: 2.5rem;
}

.dirtree-container #info-section h2 {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--primary-color);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.dirtree-container #info-section ul {
  padding-left: 1.5rem;
}

.dirtree-container #info-section ul li {
  margin-bottom: 0.5rem;
}

.dirtree-container .notice {
  color: var(--notice-text);
  background-color: var(--notice-bg);
  border: 1px solid var(--notice-border);
  border-radius: 6px;
  padding: 1rem 1.5rem;
  margin: 2rem 0;
  transition: all 0.3s ease;
}

/* --- 页脚 --- */
.dirtree-container footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
  font-size: 1rem;
  color: var(--text-color-muted);
  transition: all 0.3s ease;
}

.dirtree-container footer a {
  text-decoration: none;
  color: var(--primary-color);
}

.dirtree-container footer a:hover {
  text-decoration: underline;
}
</style>

<div class="dirtree-container">
  <header>
    <h1>文件目录树生成器</h1>
    <p class="subtitle">一款文件目录树在线生成器，支持按文件名称或路径进行排除。</p>
  </header>
  <main>
    <div class="controls">
      <button id="select-folder-btn" title="点击选择一个您电脑上的文件夹">选择文件夹</button>
      <input type="text" id="exclude-input" value=".git, node_modules, .idea, .vscode, .DS_Store, dist, build, coverage, __pycache__, logs, *.log" placeholder="排除项（用逗号,隔开）">
    </div>
    <div class="results-container">
      <div class="results-header">
        <h2>文件目录树结果</h2>
        <div id="view-controls" class="view-controls-panel" style="display: none;">
          <div class="control-group">
            <label for="depth-input">最大深度:</label>
            <input type="number" id="depth-input" min="1" title="设置目录树显示的最大层级">
          </div>
          <div class="control-group control-group-wide">
            <label for="limit-config-input">分层数量限制:</label>
            <input type="text" id="limit-config-input" title="格式: 深度:数量,  *:默认值" placeholder="例如: 1:20, 3:5, *:10">
          </div>
          <button id="update-view-btn">更新视图</button>
        </div>
        <button id="copy-btn" title="点击复制下方的目录树文本">复制</button>
      </div>
      <div class="output-wrapper">
        <pre id="tree-output"><code>请先选择一个文件夹...</code></pre>
      </div>
    </div>
    <p id="compatibility-notice" class="notice" style="display: none;">
      <strong>浏览器不兼容：</strong>您的浏览器不支持文件系统访问API，请使用最新版 Edge 或 Chrome 浏览器。
    </p>
    <section id="info-section">
      <article id="manual">
        <h2>使用说明</h2>
        <ul>
          <li>支持按文件名称或路径进行排除，已预置 Git、IDE 配置文件、构建产物等常见排除项。</li>
          <li>支持深度控制、数量限制和高级排除规则。</li>
        </ul>
      </article>
    </section>
    <footer> © <a href="https://github.com/huyongshuang/huyongshuang.github.io/tree/main/source/html/dirtree">GitHub</a>
    </footer>
  </main>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  // --- 文件树生成逻辑 ---
  const selectFolderBtn = document.getElementById('select-folder-btn');
  const excludeInput = document.getElementById('exclude-input');
  const treeOutput = document.getElementById('tree-output').querySelector('code');
  const copyBtn = document.getElementById('copy-btn');
  const compatibilityNotice = document.getElementById('compatibility-notice');
  const viewControlsPanel = document.getElementById('view-controls');
  const depthInput = document.getElementById('depth-input');
  const limitConfigInput = document.getElementById('limit-config-input');
  const updateViewBtn = document.getElementById('update-view-btn');

  let scannedTreeData = null;
  let maxDiscoveredDepth = 0;

  // 检查浏览器兼容性
  if (!('showDirectoryPicker' in window)) {
    selectFolderBtn.disabled = true;
    compatibilityNotice.style.display = 'block';
    treeOutput.textContent = '浏览器不兼容，无法使用此工具。';
    return;
  }

  // 设置分层限制的默认值
  if (!limitConfigInput.value) {
    limitConfigInput.value = '*:50';
  }

  // 如果 HTML 中没有 value，或者用户清空了刷新页面，这里提供一个恢复机制
  if (!excludeInput.value.trim()) {
    const defaultExcludes = [
      '.git', 'node_modules', '.idea', '.vscode', '.DS_Store',
      'dist', 'build', 'coverage', '__pycache__', 'logs', '*.log'
    ];
    excludeInput.value = defaultExcludes.join(', ');
  }

  selectFolderBtn.addEventListener('click', handleFolderSelection);
  updateViewBtn.addEventListener('click', handleViewUpdate);
  copyBtn.addEventListener('click', handleCopy);

  async function handleFolderSelection() {
    try {
      const dirHandle = await window.showDirectoryPicker();
      treeOutput.textContent = '正在扫描文件夹结构，请稍候...';
      viewControlsPanel.style.display = 'none';

      // 处理通配符和排除逻辑
      const rawPatterns = excludeInput.value.split(',').map(item => item.trim()).filter(Boolean);
      const excludeConfig = {
        names: [],
        paths: [],
        extensions: []
      };

      rawPatterns.forEach(p => {
        if (p.startsWith('*.')) {
          excludeConfig.extensions.push(p.slice(1));
        } else if (p.includes('/')) {
          excludeConfig.paths.push(p);
        } else {
          excludeConfig.names.push(p);
        }
      });

      maxDiscoveredDepth = 0;
      scannedTreeData = await scanDirectoryToObject(dirHandle, '', excludeConfig, 1);

      const initialOptions = {
        maxDepth: Infinity,
        limitMap: parseLimitConfig(limitConfigInput.value)
      };

      if (scannedTreeData.children.length === 0) {
        treeOutput.textContent = `${dirHandle.name}\n└─ (目录为空或所有内容均被排除)`;
      } else {
        renderTreeFromObject(scannedTreeData, initialOptions);
      }

      depthInput.value = maxDiscoveredDepth;
      depthInput.max = maxDiscoveredDepth;
      viewControlsPanel.style.display = 'flex';

    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('An error occurred:', error);
        treeOutput.textContent = `发生错误：${error.message}`;
      } else if (treeOutput.textContent.includes('扫描')) {
        treeOutput.textContent = '操作已取消，请重新选择文件夹。';
      }
    }
  }

  async function scanDirectoryToObject(dirHandle, currentPath, excludeConfig, depth) {
    maxDiscoveredDepth = Math.max(maxDiscoveredDepth, depth);
    const node = {
      name: dirHandle.name,
      type: 'directory',
      children: []
    };

    for await (const entry of dirHandle.values()) {
      const entryPath = currentPath ? `${currentPath}/${entry.name}` : entry.name;

      // 排除逻辑检查
      const isNameExcluded = excludeConfig.names.includes(entry.name);
      const isPathExcluded = excludeConfig.paths.some(p => entryPath.includes(p));
      // 简单的后缀名排除检查
      let isExtExcluded = false;
      if (entry.kind === 'file') {
        isExtExcluded = excludeConfig.extensions.some(ext => entry.name.endsWith(ext));
      }

      if (isNameExcluded || isPathExcluded || isExtExcluded) {
        continue;
      }

      if (entry.kind === 'directory') {
        node.children.push(await scanDirectoryToObject(entry, entryPath, excludeConfig, depth + 1));
      } else {
        node.children.push({
          name: entry.name,
          type: 'file'
        });
      }
    }

    node.children.sort((a, b) => {
      if (a.type === b.type) return a.name.localeCompare(b.name, 'zh-CN', {
        numeric: true
      });
      return a.type === 'directory' ? -1 : 1;
    });
    return node;
  }

  function renderTreeFromObject(treeData, options) {
    let treeString = treeData.name + '\n';
    treeString += buildStringFromNode(treeData.children, '', {
      ...options,
      currentDepth: 1
    });
    treeOutput.textContent = treeString;
  }

  function parseLimitConfig(configString) {
    const configMap = {};
    if (!configString) return configMap;

    const parts = configString.split(',');
    parts.forEach(part => {
      const [key, value] = part.split(':').map(s => s.trim());
      const numValue = parseInt(value, 10);
      if (key && !isNaN(numValue)) {
        if (key === '*') {
          configMap['default'] = numValue;
        } else {
          const numKey = parseInt(key, 10);
          if (!isNaN(numKey)) {
            configMap[numKey] = numValue;
          }
        }
      }
    });
    return configMap;
  }

  function buildStringFromNode(children, prefix, options) {
    const {
      maxDepth,
      limitMap,
      currentDepth
    } = options;
    if (currentDepth > maxDepth) return '';

    const itemLimit = limitMap[currentDepth] ?? limitMap['default'] ?? Infinity;

    let result = '';
    const totalItems = children.length;
    const itemsToDisplay = children.slice(0, itemLimit);

    itemsToDisplay.forEach((child, i) => {
      const isLastItemInView = (i === itemsToDisplay.length - 1);
      const isTruncated = totalItems > itemLimit;
      const isTrulyLast = isLastItemInView && !isTruncated;

      const connector = isTrulyLast ? '└─ ' : '├─ ';
      result += prefix + connector + child.name + '\n';

      if (child.type === 'directory' && child.children && child.children.length > 0) {
        const newPrefix = prefix + (isTrulyLast ? '   ' : '│  ');
        result += buildStringFromNode(child.children, newPrefix, {
          ...options,
          currentDepth: currentDepth + 1
        });
      }
    });

    if (totalItems > itemLimit) {
      result += prefix + `└─ ... (${totalItems - itemLimit} more items)\n`;
    }

    return result;
  }

  function handleViewUpdate() {
    if (!scannedTreeData) {
      alert('请先选择一个文件夹并生成目录树。');
      return;
    }
    const options = {
      maxDepth: parseInt(depthInput.value, 10) || Infinity,
      limitMap: parseLimitConfig(limitConfigInput.value)
    };
    renderTreeFromObject(scannedTreeData, options);
  }

  function handleCopy() {
    const textToCopy = treeOutput.textContent;
    if (textToCopy && !textToCopy.startsWith('请先') && !textToCopy.startsWith('正在扫描')) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        copyBtn.textContent = '复制成功!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = "复制";
          copyBtn.classList.remove('copied');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('复制失败，您的浏览器可能不支持或权限不足。');
      });
    }
  }
});
</script>