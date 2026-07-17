document.addEventListener('DOMContentLoaded', () => {
    // --- 主题切换逻辑 ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    const applyTheme = (theme) => {
        body.classList.remove('light-mode', 'dark-mode');
        body.classList.add(`${theme}-mode`);
    };

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const currentHour = new Date().getHours();
        const autoTheme = (currentHour >= 6 && currentHour < 18) ? 'light' : 'dark';
        applyTheme(autoTheme);
    }

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
    if(!limitConfigInput.value){
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
        const node = { name: dirHandle.name, type: 'directory', children: [] };

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
                node.children.push({ name: entry.name, type: 'file' });
            }
        }
        
        node.children.sort((a, b) => {
            if (a.type === b.type) return a.name.localeCompare(b.name, 'zh-CN', { numeric: true });
            return a.type === 'directory' ? -1 : 1;
        });
        return node;
    }

    function renderTreeFromObject(treeData, options) {
        let treeString = treeData.name + '\n';
        treeString += buildStringFromNode(treeData.children, '', { ...options, currentDepth: 1 });
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
        const { maxDepth, limitMap, currentDepth } = options;
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
                result += buildStringFromNode(child.children, newPrefix, { ...options, currentDepth: currentDepth + 1 });
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