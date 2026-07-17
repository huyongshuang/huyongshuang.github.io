document.addEventListener('DOMContentLoaded', function() {
	const switchBtn = document.getElementById('cursor-switch-1');
	let targetLink = document.getElementById('cursor_1');
	let linkCache = null;
	// 读取本地存储的状态，默认true（CSS默认开启）
	let isCssActive = localStorage.getItem('cursorCss1State') !== 'false';

	// 页面初始化：根据存储状态自动还原
	if (!isCssActive) {
		// 上次是关闭状态，直接移除link
		linkCache = targetLink;
		targetLink.remove();
		switchBtn.textContent = 'ON';
	} else {
		switchBtn.textContent = 'OFF';
	}

	switchBtn.addEventListener('click', function() {
		if (isCssActive) {
			// 删除link，存关闭状态
			linkCache = targetLink;
			targetLink.remove();
			isCssActive = false;
			localStorage.setItem('cursorCss1State', 'false');
			this.textContent = 'ON';
		} else {
			// 恢复link，存开启状态
			document.head.appendChild(linkCache);
			targetLink = linkCache;
			isCssActive = true;
			localStorage.setItem('cursorCss1State', 'true');
			this.textContent = 'OFF';
		}
	});
});