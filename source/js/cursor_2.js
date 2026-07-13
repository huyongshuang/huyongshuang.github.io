document.addEventListener('DOMContentLoaded', () => {
	const btn = document.getElementById('cursor-switch-2');
	const link = document.getElementById('cursor_2');
	// 读取存储状态，页面初始默认开启（disabled=false）
	const savedState = localStorage.getItem('cursorCss2State');
	if (savedState === 'off') {
		link.disabled = true;
		btn.textContent = "开启";
	} else {
		link.disabled = false;
		btn.textContent = "关闭";
	}

	btn.addEventListener('click', () => {
		if (link.disabled) {
			link.disabled = false;
			btn.textContent = "关闭";
			localStorage.setItem('cursorCss2State', 'on');
		} else {
			link.disabled = true;
			btn.textContent = "开启";
			localStorage.setItem('cursorCss2State', 'off');
		}
	});
});