// DOM加载完成后初始化自定义光标
document.addEventListener('DOMContentLoaded', function() {
	// 创建光标DOM元素并插入页面
	const cursor = document.createElement('div');
	cursor.className = 'gif-cursor normal';
	document.body.appendChild(cursor);

	// 全局状态变量定义
	let isEdgeMenuVisible = false;
	let isInputFocused = false;
	let lastX = 0;
	let lastY = 0;
	let ticking = false;
	let currentState = 'normal';

	// 元素选择器配置
	const clickableSelectors = 'a, button, img, label, li, ul, ol, dl, span, i, svg, #nav, .btn, [role="button"], .iconfont, input[type="button"], input[type="submit"]';
	const textSelectors = 'p, h1, h2, h3, h4, h5, h6, span, li, td, th, label, input, textarea, [contenteditable]';
	// 输入框选择器，用于判断鼠标当前是否悬浮在输入框上
	const inputSelector = 'input, textarea, [contenteditable]';

	// 计算浏览器系统滚动条宽度
	const scrollbarWidth = (function() {
		const div = document.createElement('div');
		div.style.cssText = 'width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;';
		document.body.appendChild(div);
		const width = div.offsetWidth - div.clientWidth;
		document.body.removeChild(div);
		return width;
	})();

	// 更新光标坐标位置
	function updateCursorPosition(x, y) {
		cursor.style.left = x + 'px';
		cursor.style.top = y + 'px';
	}

	// 判断鼠标是否处于浏览器滚动条区域
	function isOnScrollbar(x, y) {
		const hasVerticalScroll = document.documentElement.scrollHeight > window.innerHeight;
		const hasHorizontalScroll = document.documentElement.scrollWidth > window.innerWidth;
		if (!hasVerticalScroll && !hasHorizontalScroll) return false;

		const onVertical = hasVerticalScroll && x >= window.innerWidth - scrollbarWidth;
		const onHorizontal = hasHorizontalScroll && y >= window.innerHeight - scrollbarWidth;
		return onVertical || onHorizontal;
	}

	// 控制自定义光标显示/隐藏，同步切换系统光标
	function updateCursorVisibility() {
		const shouldHide = isOnScrollbar(lastX, lastY) || isEdgeMenuVisible;
		cursor.classList.toggle('hidden', shouldHide);
		document.body.classList.toggle('show-system-cursor', shouldHide);
	}

	// 切换光标样式，缓存状态避免重复DOM操作
	function setCursorState(state) {
		if (currentState === state) return;
		cursor.classList.remove('normal', 'clickable', 'text');
		cursor.classList.add(state);
		currentState = state;
	}

	// 鼠标移动事件：requestAnimationFrame节流优化渲染
	function handlePointerMove(e) {
		if (e.clientX === lastX && e.clientY === lastY) return;
		lastX = e.clientX;
		lastY = e.clientY;

		if (!ticking) {
			requestAnimationFrame(function() {
				updateCursorPosition(lastX, lastY);
				updateCursorVisibility();
				restoreCursorStyle();
				ticking = false;
			});
			ticking = true;
		}
	}

	// 检测Edge浏览器右键弹出菜单
	function checkEdgeMenu() {
		const edgeMenu = document.querySelector('[aria-label*="选择"]') ||
			document.querySelector('.ms-ContextualMenu') ||
			document.querySelector('[role="menu"][style*="fixed"]');
		isEdgeMenuVisible = !!edgeMenu;
		updateCursorVisibility();
	}

	// 根据鼠标悬浮元素自动切换光标样式（核心逻辑）
	function restoreCursorStyle() {
		if (isEdgeMenuVisible) return;

		const target = document.elementFromPoint(lastX, lastY);
		if (!target) {
			setCursorState('normal');
			return;
		}

		const hoverOnInput = !!target.closest(inputSelector);

		if (target.closest(clickableSelectors)) {
			setCursorState('clickable');
		} else if (target.closest(textSelectors) && hoverOnInput) {
			setCursorState('text');
		} else {
			setCursorState('normal');
		}
	}

	// 绑定全局鼠标移动监听
	document.addEventListener('pointermove', handlePointerMove, {
		passive: true,
		capture: true
	});

	// 文本选中变化监听，选中文本切换文本光标
	document.addEventListener('selectionchange', function() {
		const hasSelection = window.getSelection().toString().length > 0;
		checkEdgeMenu();

		if (hasSelection) {
			setCursorState('text');
		} else {
			restoreCursorStyle();
		}
	});

	// 元素悬浮监听，实时刷新光标样式
	document.addEventListener('pointerover', function(e) {
		lastX = e.clientX;
		lastY = e.clientY;
		restoreCursorStyle();
	}, {
		passive: true,
		capture: true
	});

	// 输入框获取焦点监听
	document.addEventListener('focusin', function(e) {
		if (e.target.closest(inputSelector)) {
			isInputFocused = true;
			restoreCursorStyle();
		}
	}, {
		passive: true,
		capture: true
	});

	// 输入框失去焦点监听
	document.addEventListener('focusout', function(e) {
		if (e.target.closest(inputSelector)) {
			isInputFocused = false;
			restoreCursorStyle();
		}
	}, {
		passive: true,
		capture: true
	});

	// 鼠标抬起事件，检测右键菜单并刷新光标
	document.addEventListener('pointerup', function() {
		setTimeout(checkEdgeMenu, 50);
		restoreCursorStyle();
	}, {
		passive: true
	});

	// 鼠标移出页面，隐藏自定义光标
	document.addEventListener('pointerleave', function() {
		cursor.style.opacity = '0';
	}, {
		passive: true
	});

	// 鼠标移入页面，显示自定义光标
	document.addEventListener('pointerenter', function() {
		cursor.style.opacity = '1';
	}, {
		passive: true
	});

	// 页面初始化执行逻辑
	updateCursorPosition(window.innerWidth / 2, window.innerHeight / 2);
	lastX = window.innerWidth / 2;
	lastY = window.innerHeight / 2;
	restoreCursorStyle();
	updateCursorVisibility();
});