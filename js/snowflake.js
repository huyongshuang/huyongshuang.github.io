// jquery.min.js
let snowStyleMode = 1;

// 样式一
(function($) {
	$.fn.snow = function(options) {
		if (window.snowTimer) clearInterval(window.snowTimer);
		const $flake = $('<div class="snow-item" />').css({
			position: 'absolute',
			'z-index': '9999',
			top: '-50px',
			'pointer-events': 'none'
		}).html('&#10052;');
		const documentHeight = $(document).height();
		const documentWidth = $(document).width();
		const defaults = {
			minSize: 10,
			maxSize: 20,
			newOn: 1000,
			flakeColor: "#AFDAEF"
		};
		const opts = $.extend({}, defaults, options);
		window.snowTimer = setInterval(function() {
			const startPositionLeft = Math.random() * documentWidth - 100;
			const startOpacity = 0.5 + Math.random();
			const sizeFlake = opts.minSize + Math.random() * opts.maxSize;
			const endPositionTop = documentHeight - 200;
			const endPositionLeft = startPositionLeft - 500 + Math.random() * 500;
			const durationFall = documentHeight * 10 + Math.random() * 5000;

			$flake.clone()
				.appendTo('body')
				.css({
					left: startPositionLeft,
					opacity: startOpacity,
					fontSize: sizeFlake,
					color: opts.flakeColor
				})
				.animate({
					top: endPositionTop,
					left: endPositionLeft,
					opacity: 0.2
				}, durationFall, 'linear', function() {
					$(this).remove();
				});
		}, opts.newOn);
	};

	$.fn.stopSnow = function() {
		if (window.snowTimer) clearInterval(window.snowTimer);
		$('.snow-item').remove();
	}
})(jQuery);

// 样式二
function SnowFall(snowConfig) {
	snowConfig = snowConfig || {};
	this.maxFlake = snowConfig.maxFlake || 200;
	this.flakeSize = snowConfig.flakeSize || 10;
	this.fallSpeed = snowConfig.fallSpeed || 1;
	this.canvas = null;
	this.ctx = null;
	this.flakes = [];
	this.loopId = null;
}
window.requestAnimationFrame = window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	function(cb) {
		return setTimeout(cb, 1000 / 60);
	};

window.cancelAnimationFrame = window.cancelAnimationFrame ||
	window.mozCancelAnimationFrame ||
	window.webkitCancelAnimationFrame ||
	window.msCancelAnimationFrame ||
	window.oCancelAnimationFrame ||
	function(id) {
		clearTimeout(id);
	};

SnowFall.prototype.start = function() {
	this.createCanvas();
	this.createFlakes();
	this.drawLoop();
};
SnowFall.prototype.destroy = function() {
	if (this.loopId) cancelAnimationFrame(this.loopId);
	if (this.canvas) this.canvas.remove();
};
SnowFall.prototype.createCanvas = function() {
	const snowcanvas = document.createElement("canvas");
	snowcanvas.id = "snowfall-canvas";

	snowcanvas.width = window.innerWidth - 1;
	snowcanvas.height = window.innerHeight;

	snowcanvas.style.cssText = "position:fixed; top:0; left:0; z-index:9998; pointer-events:none; display:block;";
	document.body.appendChild(snowcanvas);

	this.canvas = snowcanvas;
	this.ctx = snowcanvas.getContext("2d");
	const that = this;
	window.addEventListener("resize", function() {
		that.canvas.width = window.innerWidth - 1;
		that.canvas.height = window.innerHeight;
	})
};

function Flake(canvasW, canvasH, baseSize, baseSpeed) {
	this.canvasW = canvasW;
	this.canvasH = canvasH;
	this.x = Math.floor(Math.random() * canvasW);
	this.y = Math.floor(Math.random() * canvasH);
	this.maxSize = baseSize;
	this.size = Math.random() * baseSize + 2;
	this.fallSpeed = baseSpeed;
	this.speed = Math.random() * 1 + baseSpeed;
	this.velY = this.speed;
	this.velX = 0;
	this.stepSize = Math.random() / 30;
	this.step = 0;
}
Flake.prototype.update = function() {
	this.velX *= 0.98;
	if (this.velY <= this.speed) this.velY = this.speed;
	this.velX += Math.cos(this.step += 0.05) * this.stepSize;
	this.y += this.velY;
	this.x += this.velX;

	if (this.x >= this.canvasW || this.x <= 0 || this.y >= this.canvasH || this.y <= 0) {
		this.reset();
	}
};
Flake.prototype.reset = function() {
	this.x = Math.floor(Math.random() * this.canvasW);
	this.y = 0;
	this.size = Math.random() * this.maxSize + 2;
	this.speed = Math.random() * 1 + this.fallSpeed;
	this.velY = this.speed;
	this.velX = 0;
};
Flake.prototype.render = function(ctx) {
	const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
	grad.addColorStop(0, "rgba(255,255,255,0.9)");
	grad.addColorStop(0.5, "rgba(255,255,255,0.5)");
	grad.addColorStop(1, "rgba(255,255,255,0)");
	ctx.save();
	ctx.fillStyle = grad;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
	ctx.fill();
	ctx.restore();
};
SnowFall.prototype.createFlakes = function() {
	this.flakes = [];
	const w = this.canvas.width;
	const h = this.canvas.height;
	for (let i = 0; i < this.maxFlake; i++) {
		this.flakes.push(new Flake(w, h, this.flakeSize, this.fallSpeed));
	}
};
SnowFall.prototype.drawLoop = function() {
	const ctx = this.ctx;
	const canvas = this.canvas;
	const flakes = this.flakes;
	const total = this.maxFlake;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < total; i++) {
		flakes[i].update();
		flakes[i].render(ctx);
	}
	const that = this;
	this.loopId = requestAnimationFrame(() => that.drawLoop());
};

// 页面加载初始化
let canvasSnowInstance = null;
$(function() {
	if (snowStyleMode === 1) {
		$.fn.snow({
			minSize: 5,
			maxSize: 30,
			newOn: 400
		});
	} else if (snowStyleMode === 2) {
		canvasSnowInstance = new SnowFall({
			maxFlake: 60
		});
		canvasSnowInstance.start();
	}
});

// 切换按钮点击逻辑
$("#switchSnowBtn").click(function() {
	if (snowStyleMode === 1) {
		$.fn.stopSnow();
		snowStyleMode = 2;
		if (canvasSnowInstance) canvasSnowInstance.destroy();
		canvasSnowInstance = new SnowFall({
			maxFlake: 60
		});
		canvasSnowInstance.start();
	} else {
		if (canvasSnowInstance) canvasSnowInstance.destroy();
		snowStyleMode = 1;
		$.fn.snow({
			minSize: 5,
			maxSize: 30,
			newOn: 400
		});
	}
})