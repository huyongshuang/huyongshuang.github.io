// 立即执行函数，隔离作用域避免全局污染
(function() {
    // 全局状态变量定义
    let musicData = [];
    let currentMusicIndex = 0;
    let isPlaying = false;
    let isLooping = false;
    let playbackRate = 1.0;
    let lyrics = [];
    let currentLyricIndex = -1;
    let themeMode = 'auto';
    let musicDurations = {};

    // DOM元素缓存
    const playerWrapper = document.querySelector('.music-player-wrapper');
    const audioPlayer = new Audio();
    const musicList = document.getElementById('musicList');
    const albumCover = document.getElementById('albumCover');
    const nowPlayingTitle = document.getElementById('nowPlayingTitle');
    const nowPlayingArtist = document.getElementById('nowPlayingArtist');
    const albumStatus = document.getElementById('albumStatus');
    const lyricsWrapper = document.getElementById('lyricsWrapper');
    const lyricsContainer = document.getElementById('lyricsContainer');
    const progress = document.getElementById('progress');
    const progressBar = document.getElementById('progressBar');
    const currentTimeDisplay = document.getElementById('currentTimeDisplay');
    const totalTimeDisplay = document.getElementById('totalTimeDisplay');
    const currentTime = document.getElementById('currentTime');
    const totalTime = document.getElementById('totalTime');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const loopBtn = document.getElementById('loopBtn');
    const speedBtn = document.getElementById('speedBtn');
    const themeBtn = document.getElementById('themeBtn');
    const speedSelector = document.getElementById('speedSelector');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const musicListContainer = document.getElementById('musicListContainer');
    const musicListCloseBtn = document.getElementById('musicListCloseBtn');
    const mobileOverlay = document.getElementById('mobileOverlay');

    // 设置移动端歌单背景色与文字颜色，自动适配父容器
    function setMobileMenuBg() {
        const parent = playerWrapper.parentElement;
        const bgColor = getComputedStyle(parent).backgroundColor;
        const rgbMatch = bgColor.match(/\d+/g);
        
        if (rgbMatch && rgbMatch.length >= 3) {
            const r = parseInt(rgbMatch[0]);
            const g = parseInt(rgbMatch[1]);
            const b = parseInt(rgbMatch[2]);
            
            playerWrapper.style.setProperty('--mobile-menu-bg', `rgba(${r}, ${g}, ${b}, 0.3)`);
            
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            if (brightness > 128) {
                playerWrapper.style.setProperty('--mobile-text-color', '#1a1a1a');
            } else {
                playerWrapper.style.setProperty('--mobile-text-color', '#f0f0f0');
            }
        } else {
            playerWrapper.style.setProperty('--mobile-menu-bg', 'rgba(0, 0, 0, 0.3)');
            playerWrapper.style.setProperty('--mobile-text-color', '#f0f0f0');
        }
    }

    // 加载音乐配置，YML优先级高于JSON，均失败则使用默认数据
    async function loadMusicData() {
        try {
            const ymlRes = await fetch('/music/config.yml');
            if (ymlRes.ok) {
                const yamlText = await ymlRes.text();
                if (typeof jsyaml === 'undefined') throw new Error('js-yaml库未加载');
                const config = jsyaml.load(yamlText);
                if (config && config.songs && config.songs.length > 0) {
                    musicData = config.songs;
                    console.log('已加载 YAML 配置文件');
                    return;
                }
            }
            throw new Error('YAML配置无效或不存在');
        } catch (ymlError) {
            console.warn('YAML配置加载失败，尝试JSON配置:', ymlError.message);
        }

        try {
            const jsonRes = await fetch('/music/config.json');
            if (jsonRes.ok) {
                const jsonData = await jsonRes.json();
                if (jsonData && jsonData.songs && jsonData.songs.length > 0) {
                    musicData = jsonData.songs;
                    console.log('已加载 JSON 配置文件');
                    return;
                }
            }
            throw new Error('JSON配置无效或不存在');
        } catch (jsonError) {
            console.warn('JSON配置加载失败，使用默认数据:', jsonError.message);
        }

        musicData = [
            {
                id: 1,
                title: "梦与创造",
                artist: "胡永双",
                src: "https://huyongshuang.top/music/胡永双 - 梦与创造.mp3",
                cover: "https://huyongshuang.top/music/cover/根新.jpg",
                smallCover: "https://huyongshuang.top/music/cover/根新.jpg",
                lrcFile: "/music/lrc/胡永双 - 梦与创造.lrc"
            },
            {
                id: 2,
                title: "一个人想着一个人",
                artist: "Lone",
                src: "https://huyongshuang.top/music/Lone - 一个人想着一个人.mp3",
                cover: "https://huyongshuang.top/music/cover/Lone.jpg",
                smallCover: "https://huyongshuang.top/music/cover/Lone.jpg",
                lrcFile: "/music/lrc/Lone - 一个人想着一个人.lrc"
            }
        ];

        const errorTip = document.createElement('div');
        errorTip.style.cssText = `
            position: absolute; top: 10px; right: 10px;
            background: #ff6b6b; color: white;
            padding: 8px 12px; border-radius: 5px;
            z-index: 10000; font-size: 12px;
        `;
        errorTip.textContent = '配置加载失败，使用默认音乐';
        playerWrapper.appendChild(errorTip);
        setTimeout(() => errorTip.remove(), 4000);
    }

    // 初始化渲染歌单列表
    function initMusicList() {
        musicList.innerHTML = '';
        musicData.forEach((music, index) => {
            const item = document.createElement('div');
            item.className = `music-item ${index === currentMusicIndex ? 'active' : ''}`;
            item.dataset.index = index;
            item.innerHTML = `
                <img src="${music.smallCover}" alt="${music.title}" class="music-cover-small">
                <div class="music-info">
                    <div class="music-title">${music.title}</div>
                    <div class="music-artist">${music.artist}</div>
                </div>
                <div class="music-duration">${musicDurations[index] ? formatTime(musicDurations[index]) : '加载中...'}</div>
            `;
            item.addEventListener('click', () => {
                if (index === currentMusicIndex) {
                    togglePlayPause();
                } else {
                    selectMusic(index);
                    isPlaying = true;
                    audioPlayer.play().then(() => {
                        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                        albumStatus.textContent = '正在播放';
                        updateAlbumCoverRotation();
                    }).catch(e => console.error(e));
                }
                closeMusicList();
            });
            musicList.appendChild(item);
            if (!musicDurations[index]) preloadMusicDuration(index);
        });
    }

    // 预加载指定歌曲的时长
    function preloadMusicDuration(index) {
        const tempAudio = new Audio();
        tempAudio.addEventListener('loadedmetadata', () => {
            if (!isNaN(tempAudio.duration) && tempAudio.duration > 0) {
                musicDurations[index] = tempAudio.duration;
                const el = musicList.querySelector(`.music-item[data-index="${index}"] .music-duration`);
                if (el) el.textContent = formatTime(tempAudio.duration);
            }
            tempAudio.remove();
        });
        tempAudio.addEventListener('error', () => tempAudio.remove());
        tempAudio.src = musicData[index].src;
        tempAudio.load();
    }

    // 更新专辑封面旋转动画状态
    function updateAlbumCoverRotation() {
        if (!albumCover.style.animation) {
            albumCover.style.animation = 'rotate 20s linear infinite';
            albumCover.classList.add('playing');
        }
        if (isPlaying) {
            albumCover.classList.remove('paused');
            albumCover.classList.add('playing');
            albumCover.style.animationPlayState = 'running';
        } else {
            albumCover.classList.remove('playing');
            albumCover.classList.add('paused');
            albumCover.style.animationPlayState = 'paused';
        }
    }

    // 加载LRC歌词文件
    async function loadLrcFile(path) {
        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error('加载失败');
            return await res.text();
        } catch (e) {
            console.error('歌词加载失败:', e);
            return null;
        }
    }

    // 切换并加载指定歌曲
    async function selectMusic(index) {
        currentMusicIndex = index;
        document.querySelectorAll('.music-item').forEach((el, i) => {
            el.classList.toggle('active', i === index);
        });

        const music = musicData[index];
        audioPlayer.src = music.src;
        albumCover.src = music.cover;
        nowPlayingTitle.textContent = music.title;
        nowPlayingArtist.textContent = music.artist;
        albumStatus.textContent = isPlaying ? '正在播放' : '已暂停';

        albumCover.style.animation = 'none';
        setTimeout(() => {
            albumCover.style.animation = 'rotate 20s linear infinite';
            updateAlbumCoverRotation();
        }, 10);

        if (music.lrcFile) {
            const text = await loadLrcFile(music.lrcFile);
            parseLyrics(text || '');
        } else {
            parseLyrics('');
        }

        if (isPlaying) setTimeout(() => audioPlayer.play(), 100);
        else {
            audioPlayer.load();
            updateProgress();
        }
    }

    // 解析LRC格式歌词文本
    function parseLyrics(text) {
        lyrics = [];
        currentLyricIndex = -1;
        lyricsWrapper.innerHTML = '';

        if (!text) {
            const line = document.createElement('div');
            line.className = 'lyric-line active';
            line.textContent = '暂无歌词';
            lyricsWrapper.appendChild(line);
            return;
        }

        const lines = text.split('\n');
        lines.forEach(line => {
            const match = line.match(/\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/);
            if (match) {
                const time = parseInt(match[1])*60 + parseInt(match[2]) + (match[3] ? parseInt(match[3])/(match[3].length===2?100:1000) : 0);
                const content = line.replace(/\[\d{2}:\d{2}(?:\.\d{2,3})?\]/g, '').trim();
                if (content) lyrics.push({ time, text: content });
            }
        });
        lyrics.sort((a,b) => a.time - b.time);

        const frag = document.createDocumentFragment();
        lyrics.forEach(item => {
            const line = document.createElement('div');
            line.className = 'lyric-line';
            line.textContent = item.text;
            frag.appendChild(line);
        });
        lyricsWrapper.appendChild(frag);
        updateLyricsPosition(0);
    }

    // 更新歌词滚动位置与高亮
    function updateLyricsPosition(idx) {
        const allLines = lyricsWrapper.querySelectorAll('.lyric-line');
        if (!allLines.length) return;

        allLines.forEach(l => l.classList.remove('active'));
        if (allLines[idx]) allLines[idx].classList.add('active');

        const containerH = lyricsContainer.clientHeight;
        const lineH = allLines[0].clientHeight;
        const totalH = allLines.length * lineH;

        let offset = idx * lineH + lineH/2 - containerH/2;
        const maxOffset = totalH - containerH;
        if (offset < 0) offset = 0;
        if (offset > maxOffset) offset = maxOffset;

        lyricsWrapper.style.transform = `translateY(${-offset}px)`;
    }

    // 同步当前播放时间对应的歌词
    function updateLyrics() {
        if (!lyrics.length) return;
        const ct = audioPlayer.currentTime;
        let newIdx = 0;
        for (let i = lyrics.length-1; i >= 0; i--) {
            if (lyrics[i].time <= ct + 0.12) {
                newIdx = i;
                break;
            }
        }
        if (newIdx !== currentLyricIndex) {
            currentLyricIndex = newIdx;
            updateLyricsPosition(newIdx);
        }
    }

    // 更新进度条与时间显示
    function updateProgress() {
        if (!isNaN(audioPlayer.duration) && audioPlayer.duration > 0) {
            const pct = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progress.style.width = `${pct}%`;
            const t = formatTime(audioPlayer.currentTime);
            const total = formatTime(audioPlayer.duration);
            currentTimeDisplay.textContent = t;
            currentTime.textContent = t;
            totalTimeDisplay.textContent = total;
            totalTime.textContent = total;
        }
    }

    // 秒数格式化为分:秒
    function formatTime(sec) {
        const m = Math.floor(sec/60);
        const s = Math.floor(sec%60);
        return `${m}:${s<10?'0':''}${s}`;
    }

    // 切换播放与暂停状态
    function togglePlayPause() {
        if (isPlaying) {
            audioPlayer.pause();
        } else {
            if (!audioPlayer.src) { selectMusic(currentMusicIndex); return; }
            audioPlayer.play().then(() => {
                isPlaying = true;
                playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                albumStatus.textContent = '正在播放';
                updateAlbumCoverRotation();
            }).catch(e => console.error(e));
        }
    }

    // 切换上一首歌曲
    function playPrev() {
        currentMusicIndex = (currentMusicIndex - 1 + musicData.length) % musicData.length;
        selectMusic(currentMusicIndex);
    }

    // 切换下一首歌曲
    function playNext() {
        currentMusicIndex = (currentMusicIndex + 1) % musicData.length;
        selectMusic(currentMusicIndex);
    }

    // 切换循环播放开关
    function toggleLoop() {
        isLooping = !isLooping;
        audioPlayer.loop = isLooping;
        loopBtn.classList.toggle('active', isLooping);
    }

    // 切换倍速选择面板显示
    function toggleSpeedSelector() {
        speedSelector.classList.toggle('show');
    }

    // 设置播放倍速
    function selectSpeed(speed) {
        playbackRate = speed;
        audioPlayer.playbackRate = playbackRate;
        speedBtn.innerHTML = `<span>${playbackRate}x</span>`;
        speedBtn.classList.add('active');
        document.querySelectorAll('.speed-option').forEach(opt => {
            opt.classList.toggle('active', parseFloat(opt.dataset.speed) === speed);
        });
        speedSelector.classList.remove('show');
    }

    // 三态背景模式切换：自动→白色→黑色→自动
    function toggleTheme() {
        if (themeMode === 'auto') {
            themeMode = 'light';
            playerWrapper.classList.add('force-light');
            playerWrapper.classList.remove('force-dark');
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            themeBtn.title = '白色背景';
            playerWrapper.style.removeProperty('--mobile-text-color');
        } else if (themeMode === 'light') {
            themeMode = 'dark';
            playerWrapper.classList.add('force-dark');
            playerWrapper.classList.remove('force-light');
            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            themeBtn.title = '黑色背景';
            playerWrapper.style.removeProperty('--mobile-text-color');
        } else {
            themeMode = 'auto';
            playerWrapper.classList.remove('force-light', 'force-dark');
            themeBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i>';
            themeBtn.title = '自动背景';
            setMobileMenuBg();
        }
    }

    // 点击进度条跳转播放位置
    function seekTo(e) {
        if (!audioPlayer.duration || audioPlayer.duration <= 0) return;
        const rect = progressBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const p = Math.max(0, Math.min(1, x / rect.width));
        audioPlayer.currentTime = p * audioPlayer.duration;
        if (!isPlaying) {
            updateProgress();
            updateLyrics();
        }
    }

    // 打开移动端歌单抽屉
    function openMusicList() {
        musicListContainer.classList.add('active');
        mobileOverlay.classList.add('active');
    }

    // 关闭移动端歌单抽屉
    function closeMusicList() {
        musicListContainer.classList.remove('active');
        mobileOverlay.classList.remove('active');
    }

    // 初始化所有事件监听
    function initEvents() {
        playPauseBtn.addEventListener('click', togglePlayPause);
        prevBtn.addEventListener('click', playPrev);
        nextBtn.addEventListener('click', playNext);
        progressBar.addEventListener('click', seekTo);

        volumeSlider.addEventListener('input', () => {
            audioPlayer.volume = volumeSlider.value / 100;
        });

        loopBtn.addEventListener('click', toggleLoop);
        speedBtn.addEventListener('click', toggleSpeedSelector);
        themeBtn.addEventListener('click', toggleTheme);

        document.querySelectorAll('.speed-option').forEach(opt => {
            opt.addEventListener('click', () => selectSpeed(parseFloat(opt.dataset.speed)));
        });

        mobileMenuBtn.addEventListener('click', openMusicList);
        musicListCloseBtn.addEventListener('click', closeMusicList);
        mobileOverlay.addEventListener('click', closeMusicList);

        document.addEventListener('click', e => {
            if (!speedBtn.contains(e.target) && !speedSelector.contains(e.target)) {
                speedSelector.classList.remove('show');
            }
        });

        audioPlayer.addEventListener('timeupdate', () => {
            updateProgress();
            updateLyrics();
        });

        audioPlayer.addEventListener('ended', () => {
            if (!isLooping) {
                playNext();
                isPlaying = true;
                audioPlayer.play().then(() => {
                    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    albumStatus.textContent = '正在播放';
                    updateAlbumCoverRotation();
                }).catch(e => console.error(e));
            } else {
                audioPlayer.currentTime = 0;
                audioPlayer.play();
            }
        });

        audioPlayer.addEventListener('loadedmetadata', updateProgress);
        audioPlayer.addEventListener('pause', () => {
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            albumStatus.textContent = '已暂停';
            updateAlbumCoverRotation();
        });
        audioPlayer.addEventListener('play', () => {
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            albumStatus.textContent = '正在播放';
            updateAlbumCoverRotation();
        });
        audioPlayer.addEventListener('seeked', updateLyrics);

        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) closeMusicList();
        });
    }

    // 播放器初始化入口函数
    function initApp() {
        setMobileMenuBg();
        
        loadMusicData().then(() => {
            if (musicData.length > 0) {
                initMusicList();
                initEvents();
                selectMusic(0);
                audioPlayer.volume = volumeSlider.value / 100;
                selectSpeed(1.0);
            } else {
                nowPlayingTitle.textContent = '无法加载音乐';
                nowPlayingArtist.textContent = '请检查配置文件';
            }
        });
    }

    // 页面加载完成后启动播放器
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
})();