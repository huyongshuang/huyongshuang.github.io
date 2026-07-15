// 导航栏
const navLinks = document.querySelectorAll('#navbar a[href^="#"]');
const navbar = document.getElementById('navbar');
const navHeight = navbar?.offsetHeight || 0;
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;
        const targetTop = targetEl.offsetTop - navHeight;
        window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        });
    });
});

// hitokoto
document.addEventListener('DOMContentLoaded', function() {
    fetch(`https://v1.hitokoto.cn/?c=k&c=i&c=h&c=d&c=c&t=${Date.now()}`)
        .then(response => {
            if (!response.ok) throw new Error('接口响应异常');
            return response.json();
        })
        .then(data => {
            let hitokotoText = data.hitokoto;
            if (data.from_who || data.from) {
                hitokotoText += " —— ";
                if (data.from_who) hitokotoText += data.from_who;
                if (data.from) hitokotoText += "《" + data.from + "》";
            }
            document.getElementById('hu_hitokoto').innerText = hitokotoText;
        })
        .catch(error => {
            document.getElementById('hu_hitokoto').innerText = '获取失败，请稍后再试！';
            console.error('获取一言失败：', error);
        });
});

// 按钮播放音乐
const playBtn = document.getElementById('playBtn');
const audio = new Audio('https://music.163.com/song/media/outer/url?id=2672603652.mp3');
audio.loop = true;
let isPlaying = false;

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playBtn.innerText = '▶';
        playBtn.style.backgroundColor = '#7d31e8';
    } else {
        audio.play().catch(err => {
            console.log('播放失败:', err);
            alert('播放失败，可能是浏览器音频策略限制，请再次点击尝试');
        });
        playBtn.innerText = '❚❚';
        playBtn.style.backgroundColor = '#651de2';
    }
    isPlaying = !isPlaying;
});

audio.addEventListener('pause', () => {
    if (!audio.ended) return;
    playBtn.innerText = '▶';
    playBtn.style.backgroundColor = '#7d31e8';
    isPlaying = false;
});

// 一言打字动画
// ========== 动画配置 ==========
const TYPE_SPEED = 80; // 打字速度(ms/字)，越小越快
const DELETE_SPEED = 50; // 删除速度(ms/字)，越小越快
const TYPE_PAUSE = 2000; // 打字完成后停顿时间(ms)
const DELETE_PAUSE = 500; // 删除完成后停顿时间(ms)

// ========== 全局变量 ==========
const textContent = document.getElementById('text');
let currentSentence = ''; // 当前动画句子
let index = 0; // 打字/删除索引
let isDeleting = false; // 是否删除状态
let isFirst = true; // 标记是否是第一句，核心防重复

async function getHitokoto() {
    try {
        const response = await fetch('https://v1.hitokoto.cn/?c=k&c=i&c=h&c=d&c=c&t=' + Date.now());
        if (!response.ok) throw new Error('接口响应异常');
        const data = await response.json();
        let sentence = data.hitokoto;
        if (data.from_who || data.from) {
            sentence += " —— ";
            if (data.from_who) sentence += data.from_who;
            if (data.from) sentence += "《" + data.from + "》";
        }
        return sentence;
    } catch (error) {
        console.error('获取一言失败：', error);
        return '获取语录失败，换一句试试吧！';
    }
}

async function typeDeleteAnimation() {
    if (index === 0 && !isDeleting) {
        currentSentence = await getHitokoto();
    }
    if (isDeleting) {
        textContent.textContent = currentSentence.substring(0, index - 1);
        index--;
        if (index === 0) {
            isDeleting = false;
            if (isFirst) isFirst = false;
            setTimeout(typeDeleteAnimation, DELETE_PAUSE);
            return;
        }
        setTimeout(typeDeleteAnimation, DELETE_SPEED);
    } else {
        textContent.textContent = currentSentence.substring(0, index + 1);
        index++;
        if (index === currentSentence.length) {
            isDeleting = true;
            setTimeout(typeDeleteAnimation, TYPE_PAUSE);
            return;
        }
        setTimeout(typeDeleteAnimation, TYPE_SPEED);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    typeDeleteAnimation();
});