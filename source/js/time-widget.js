function initCalendarWidget() {
	console.log('初始化时间天气模块...');
	if (window.calendarWidgetInitialized && Date.now() - window.calendarWidgetInitialized < 1000) return;
	window.calendarWidgetInitialized = Date.now();

	if (window.calendarTimers) {
		window.calendarTimers.forEach(timer => clearInterval(timer));
		window.calendarTimers = [];
	} else {
		window.calendarTimers = [];
	}

	function updateTime() {
		const now = new Date();
		const timeString = now.toLocaleTimeString('zh-CN', {
			hour12: false,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});
		const timeElement = document.getElementById('current-time');
		if (timeElement) {
			timeElement.textContent = timeString;
		}
	}

	function updateDate() {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const day = now.getDate();
		const weekdayMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
		const weekday = weekdayMap[now.getDay()];
		const dateString = `${year}年${month}月${day}日　${weekday}`;
		const dateElement = document.getElementById('current-date');
		if (dateElement) {
			dateElement.textContent = dateString;
		}
	}

	const API_URL = "https://v1.yiketianqi.com/free/day?appid=55974212&appsecret=eo5XbG53&unescape=1";

	const ICON_MAP = {
		"qing": "☀️",
		"yun": "🌤️",
		"yin": "⛅",
		"yu": "🌧️",
		"xiaoyu": "🌦️",
		"zhongyu": "🌧️",
		"dayu": "🌨️",
		"xue": "❄️",
		"feng": "💨",
		"wu": "🌫️",
		"bing": "🧊",
		"lei": "⛈️"
	};

	function getAirLevel(aqi) {
		aqi = Number(aqi);
		if (aqi <= 50) return "优";
		if (aqi <= 100) return "良";
		if (aqi <= 150) return "轻度污染";
		if (aqi <= 200) return "中度污染";
		if (aqi <= 300) return "重度污染";
		return "严重污染";
	}

	function renderWeather(data) {
		const weatherEl = document.getElementById("current-weather");
		if (!weatherEl) return;
		const tempStr = `${data.tem_night}℃ ~ ${data.tem_day}℃`;
		const weatherText = `${data.city} ${ICON_MAP[data.wea_img] || "🌡️"} ${data.wea}　${tempStr}\n空气: ${getAirLevel(data.air)}　${data.win} ${data.win_speed}`;
		weatherEl.textContent = weatherText;
	}

	function renderWeatherError(msg) {
		const weatherEl = document.getElementById("current-weather");
		if (!weatherEl) return;
		weatherEl.textContent = msg;
		weatherEl.style.color = "#e74c3c";
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			weatherEl.style.color = "#ff6b6b";
		}
	}

	function getCachedWeather() {
		const cached = localStorage.getItem('weatherData');
		const cacheTime = localStorage.getItem('weatherCacheTime');
		if (cached && cacheTime && (Date.now() - cacheTime) < 9000000) {
			return JSON.parse(cached);
		}
		return null;
	}

	function setCachedWeather(data) {
		localStorage.setItem('weatherData', JSON.stringify(data));
		localStorage.setItem('weatherCacheTime', Date.now().toString());
	}

	let isWeatherFetching = false;
	async function getWeather() {
		if (isWeatherFetching) return;

		const cachedData = getCachedWeather();
		if (cachedData) {
			renderWeather(cachedData);
			return;
		}

		try {
			isWeatherFetching = true;
			const res = await fetch(API_URL);
			if (!res.ok) throw new Error(`请求失败 ${res.status}`);
			const data = await res.json();
			if (!data.city || !data.wea_img || !data.wea || !data.tem_night || !data.tem_day || !data.air || !data.win || !data.win_speed) {
				throw new Error("数据不完整");
			}
			setCachedWeather(data);
			renderWeather(data);
		} catch (err) {
			console.error("获取天气失败：", err);
			if (!cachedData) {
				renderWeatherError("获取天气信息失败");
			}
		} finally {
			isWeatherFetching = false;
		}
	}

	let currentDate = new Date();

	function renderCalendar(date) {
		const year = date.getFullYear();
		const month = date.getMonth();
		const monthYearElement = document.getElementById('calendar-month-year');
		if (monthYearElement) {
			monthYearElement.textContent = `${year}年${month + 1}月`;
		}
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const today = new Date();
		const firstDayIndex = firstDay.getDay();
		const prevMonthLastDay = new Date(year, month, 0).getDate();
		const datesElement = document.getElementById('calendar-dates');
		if (!datesElement) return;
		datesElement.innerHTML = '';

		for (let i = firstDayIndex; i > 0; i--) {
			const day = prevMonthLastDay - i + 1;
			const dateElement = document.createElement('div');
			dateElement.classList.add('other-month', 'date-item');
			dateElement.textContent = day;
			datesElement.appendChild(dateElement);
		}

		for (let i = 1; i <= lastDay.getDate(); i++) {
			const dateElement = document.createElement('div');
			dateElement.classList.add('current-month', 'date-item');
			dateElement.textContent = i;
			if (
				year === today.getFullYear() &&
				month === today.getMonth() &&
				i === today.getDate()
			) {
				dateElement.classList.add('today');
			}
			datesElement.appendChild(dateElement);
		}

		const totalCells = 42;
		const nextMonthDays = totalCells - (firstDayIndex + lastDay.getDate());
		for (let i = 1; i <= nextMonthDays; i++) {
			const dateElement = document.createElement('div');
			dateElement.classList.add('other-month', 'date-item');
			dateElement.textContent = i;
			datesElement.appendChild(dateElement);
		}
	}

	function adaptThemeColors() {
		const root = document.documentElement;
		const computedStyle = getComputedStyle(root);
		const primaryColor = computedStyle.getPropertyValue('--primary-color').trim() || '#3a86ff';
		const cardBg = computedStyle.getPropertyValue('--card-bg').trim() || '#ffffff';
		const textColor = computedStyle.getPropertyValue('--text-color').trim() || '#333333';
		const borderColor = computedStyle.getPropertyValue('--border-color').trim() || '#eaeaea';
		const secondaryTextColor = computedStyle.getPropertyValue('--secondary-text-color').trim() || '#666666';
		const hoverBg = computedStyle.getPropertyValue('--hover-bg').trim() || '#f5f5f5';
		const widget = document.querySelector('.custom-sidebar-widget');
		if (widget) {
			widget.style.setProperty('--primary-color', primaryColor);
			widget.style.setProperty('--card-bg', cardBg);
			widget.style.setProperty('--text-color', textColor);
			widget.style.setProperty('--border-color', borderColor);
			widget.style.setProperty('--secondary-text-color', secondaryTextColor);
			widget.style.setProperty('--hover-bg', hoverBg);
			const rgb = hexToRgb(primaryColor);
			if (rgb) {
				widget.style.setProperty('--primary-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
			}
		}
	}

	function watchThemeChange() {
		const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
		darkModeMedia.addEventListener('change', adaptThemeColors);
		document.addEventListener('theme-change', adaptThemeColors);
	}

	function hexToRgb(hex) {
		let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});
		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}

	updateTime();
	updateDate();
	renderCalendar(currentDate);
	adaptThemeColors();
	watchThemeChange();

	const timeInterval = setInterval(updateTime, 1000);
	const dateInterval = setInterval(updateDate, 60000);
	const weatherInterval = setInterval(getWeather, 2.5 * 60 * 60 * 1000);

	window.calendarTimers.push(timeInterval, dateInterval, weatherInterval);

	const prevMonthBtn = document.getElementById('prev-month');
	const nextMonthBtn = document.getElementById('next-month');

	if (prevMonthBtn) {
		const newPrevBtn = prevMonthBtn.cloneNode(true);
		prevMonthBtn.parentNode.replaceChild(newPrevBtn, prevMonthBtn);

		newPrevBtn.addEventListener('click', function() {
			currentDate.setMonth(currentDate.getMonth() - 1);
			renderCalendar(currentDate);
		});
	}

	if (nextMonthBtn) {
		const newNextBtn = nextMonthBtn.cloneNode(true);
		nextMonthBtn.parentNode.replaceChild(newNextBtn, nextMonthBtn);

		newNextBtn.addEventListener('click', function() {
			currentDate.setMonth(currentDate.getMonth() + 1);
			renderCalendar(currentDate);
		});
	}

	if (!window.weatherFetchTimer) {
		const cachedWeather = getCachedWeather();
		if (cachedWeather) {
			renderWeather(cachedWeather);
		} else {
			window.weatherFetchTimer = setTimeout(() => {
				getWeather();
				window.weatherFetchTimer = null;
			}, 500);
		}
	}
}

document.addEventListener('DOMContentLoaded', function() {
	let initTimer = null;

	function safeInit() {
		if (initTimer) clearTimeout(initTimer);
		initTimer = setTimeout(initCalendarWidget, 100);
	}

	safeInit();
	document.addEventListener('rd.pjax.complete', safeInit);

	const observer = new MutationObserver(function(mutations) {
		const hasCachedWeather = !!localStorage.getItem('weatherData') && (Date.now() - localStorage.getItem('weatherCacheTime')) < 9000000;
		let needInit = false;

		for (const mutation of mutations) {
			if (mutation.type === 'childList') {
				const widget = document.querySelector('.custom-sidebar-widget');
				if (widget) {
					const timeEl = widget.querySelector('#current-time');
					const weatherEl = widget.querySelector('#current-weather');

					if ((!timeEl || timeEl.textContent === '') ||
						(weatherEl && weatherEl.textContent === '加载中...' && !hasCachedWeather)) {
						needInit = true;
						break;
					}
				}
			}
		}

		if (needInit) {
			safeInit();
		}
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true
	});
});