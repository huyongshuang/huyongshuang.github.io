// Hexo 多语言切换
// 自动给当前语言按钮添加 active 类用于高亮显示

// ==================== 配置区 ====================
const defaultLang = "zh";
const supportedLangs = ["zh", "en", "ja"];
const switchClass = "lang-switch";
// ================================================

// 全局页面基础变量
const protocol = window.location.protocol;
const host = window.location.host;
const siteRoot = `${protocol}//${host}`;
const originPath = window.location.pathname;

// 1. 解析当前页面语言 & 无语言前缀的纯路径
function parseCurrentPage() {
	const pathArr = originPath.split("/").filter(s => s !== "");
	const firstSeg = pathArr[0] || "";
	// 判断当前语言
	const currentLang = supportedLangs.includes(firstSeg) ? firstSeg : defaultLang;
	// 提取纯路径（去掉语言前缀）
	let purePath = "";
	if (currentLang !== defaultLang) {
		purePath = pathArr.slice(1).join("/");
	} else {
		purePath = pathArr.join("/");
	}
	return {
		currentLang,
		purePath
	};
}

// 2. 双层 if 生成目标完整 URL
function buildTargetUrl(targetLang) {
	const {
		currentLang,
		purePath
	} = parseCurrentPage();
	// 非法语言直接返回原页面
	if (!supportedLangs.includes(targetLang)) return `${siteRoot}${originPath}`;

	let targetUrl = "";
	// 第一层 if：当前是否为默认语言
	if (currentLang === defaultLang) {
		// 当前是中文根目录
		if (targetLang === defaultLang) {
			// 目标中文：域名/纯路径
			targetUrl = purePath ? `${siteRoot}/${purePath}` : `${siteRoot}/`;
		} else {
			// 目标外文：域名/语言/纯路径
			targetUrl = purePath ? `${siteRoot}/${targetLang}/${purePath}` : `${siteRoot}/${targetLang}/`;
		}
	} else {
		// 当前是外文
		if (targetLang === defaultLang) {
			// 切回中文：域名/纯路径
			targetUrl = purePath ? `${siteRoot}/${purePath}` : `${siteRoot}/`;
		} else {
			// 切换其他外文：替换前缀
			targetUrl = purePath ? `${siteRoot}/${targetLang}/${purePath}` : `${siteRoot}/${targetLang}/`;
		}
	}
	return targetUrl;
}

// 3. 从链接原始 href 提取目标语言代码
function getTargetLangFromHref(href) {
	const pathArr = new URL(href).pathname.split("/").filter(s => s !== "");
	const seg = pathArr[0] || "";
	return supportedLangs.includes(seg) ? seg : defaultLang;
}

// 4. 更新所有语言切换 a 标签的 href + 标记当前激活语言按钮
function refreshAllLangLink() {
	// 双重选择器：捕获页脚 a.lang-switch + 导航 li.lang-switch 内部的 a
	const allLinks = document.querySelectorAll(`a.${switchClass}, .${switchClass} a`);
	// 每次刷新先清除所有按钮的 active 高亮
	allLinks.forEach(aTag => aTag.classList.remove('lang-active'));

	// 存储当前页面语言，用于匹配按钮
	const {
		currentLang
	} = parseCurrentPage();

	allLinks.forEach(aTag => {
		// 获取这个按钮对应的目标语言
		const targetLang = getTargetLangFromHref(aTag.href);
		// 计算正确跳转地址
		const realUrl = buildTargetUrl(targetLang);
		// 强制覆盖 a 标签 href，hover 左下角立刻显示正确链接
		aTag.href = realUrl;
		// 兜底：点击事件拦截，防止 href 失效时强制跳转
		aTag.onclick = function(e) {
			e.preventDefault();
			location.href = realUrl;
		};
		// 匹配当前页面语言，添加蓝色高亮类
		if (targetLang === currentLang) {
			aTag.classList.add('lang-active');
		}
	});
}

// 页面加载完立刻执行一次
document.addEventListener("DOMContentLoaded", refreshAllLangLink);
// 延迟 500ms 再执行一次（等待导航栏JS渲染完成，必捕获菜单 a 标签）
setTimeout(refreshAllLangLink, 500);
// 滚动/窗口大小变化时刷新（侧边栏展开菜单时重新更新链接 + 高亮）
window.addEventListener("scroll", refreshAllLangLink);
window.addEventListener("resize", refreshAllLangLink);