// 鼠标移动星星特效
(function() {
	// 启动初始化与渲染循环入口
	function initStarEffect() {
		bindEventListeners();
		startRenderLoop();
	}

	// 绑定鼠标、触摸、窗口大小监听事件
	function bindEventListeners() {
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("touchmove", handleTouchEvent);
		document.addEventListener("touchstart", handleTouchEvent);
		window.addEventListener("resize", updateWindowSize);
	}

	// 更新窗口宽高尺寸
	function updateWindowSize() {
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
	}

	// 处理移动端触摸事件，生成星星
	function handleTouchEvent(event) {
		if (event.touches.length > 0) {
			for (let touchIndex = 0; touchIndex < event.touches.length; touchIndex++) {
				const touchPoint = event.touches[touchIndex];
				createStar(touchPoint.clientX, touchPoint.clientY, colorPalette[Math.floor(Math.random() * colorPalette.length)]);
			}
		}
	}

	// 处理鼠标移动事件，生成星星
	function handleMouseMove(event) {
		mousePoint.x = event.clientX;
		mousePoint.y = event.clientY;
		createStar(mousePoint.x, mousePoint.y, colorPalette[Math.floor(Math.random() * colorPalette.length)]);
	}

	// 创建单个星星实例并推入星星数组
	function createStar(posX, posY, starColor) {
		const starItem = new StarParticle();
		starItem.init(posX, posY, starColor);
		starList.push(starItem);
	}

	// 批量更新所有星星状态、销毁生命周期结束的星星
	function updateAllStars() {
		// 更新所有粒子位置与生命周期
		for (let i = 0; i < starList.length; i++) {
			starList[i].update();
		}
		// 倒序遍历移除死亡粒子，防止数组下标错乱
		for (let i = starList.length - 1; i >= 0; i--) {
			if (starList[i].lifeSpan < 0) {
				starList[i].die();
				starList.splice(i, 1);
			}
		}
	}

	// 帧动画渲染循环
	function startRenderLoop() {
		requestAnimationFrame(startRenderLoop);
		updateAllStars();
	}

	// 星星粒子构造类
	function StarParticle() {
		this.character = "*";
		this.lifeSpan = 120;
		this.initialStyles = {
			position: "fixed",
			top: "0",
			display: "block",
			pointerEvents: "none",
			"z-index": "10000000",
			fontSize: "20px",
			"will-change": "transform"
		};

		// 初始化星星位置、颜色、DOM元素
		this.init = function(posX, posY, starColor) {
			// 随机横向偏移速度，纵向固定向下
			this.velocity = {
				x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
				y: 1
			};
			this.position = {
				x: posX - 10,
				y: posY - 20
			};
			this.initialStyles.color = starColor;
			this.element = document.createElement("span");
			this.element.innerHTML = this.character;
			setElementStyle(this.element, this.initialStyles);
			this.update();
			document.body.appendChild(this.element);
		};

		// 更新星星坐标、透明度缩放、生命周期
		this.update = function() {
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
			this.lifeSpan--;
			this.element.style.transform = `translate3d(${this.position.x}px,${this.position.y}px,0) scale(${this.lifeSpan / 120})`;
		};

		// 销毁DOM元素
		this.die = function() {
			this.element.parentNode.removeChild(this.element);
		};
	}

	// 批量给DOM元素设置样式
	function setElementStyle(domEl, styleObj) {
		for (let styleKey in styleObj) {
			domEl.style[styleKey] = styleObj[styleKey];
		}
	}

	// 全局变量定义
	const colorPalette = ["#D61C59", "#E7D84B", "#1B8798", "#ffaaff", "#aaaaff"];
	let windowWidth = window.innerWidth;
	let windowHeight = window.innerHeight;
	let mousePoint = {
		x: windowWidth / 2,
		y: windowWidth / 2
	};
	let starList = [];

	// 执行特效初始化
	initStarEffect();
})();