const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const ulTag = $('.playlist-wrapper');
const playlist = $('.playlist');

const player = $('.player');
const title = $('.title');
const author = $('.author')
const cdThumb = $('.cd-thumb');
const audio = $('#audio');

const play = $('.icon-play');
const btnPlay = $('.btn-toggle-play');

const progress = $('.progress');
const progressBar = $('.progress-bar');
const progressBarArea = $('.progress-area');

const volumeIcon = $('#volume-icon');
const volumeBar = $('.volume-bar');

const begin = $('#begin');
const end = $('#end');

const next = $('.btn-next');
const prev = $('.btn-prev');
const repeat = $('.btn-repeat');
const random = $('.btn-random');

const openPlaylist = $('#open-playlist');
const closePlaylist = $('#close-playlist');


// ${index === this.currentIndex ? 'active' : ''}

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [

        {
            name: 'Faded',
            singer: 'Alan Walker',
            path: './assets/music/music1/music1.mp3',
            image: './assets/img/img1.jpg',
        },
        {
            name: 'Havana',
            singer: 'Camila Cabello',
            path: './assets/music/music2/music2.mp3',
            image: './assets/img/img2.jpg',
        },
        {
            name: 'Shape of You',
            singer: 'Ed Sheeran',
            path: './assets/music/music3/music3.mp3',
            image: './assets/img/img3.jpg',
        },
        {
            name: 'Sugar',
            singer: 'Maroon 5',
            path: './assets/music/music4/music4.mp3',
            image: './assets/img/img4.jpg',
        },
        {
            name: 'Señorita',
            singer: 'Shawn Mendes',
            path: './assets/music/music5/music5.mp3',
            image: './assets/img/img5.jpg',
        },
        {
            name: 'One Call Away',
            singer: 'Charlie Puth',
            path: './assets/music/music6/music6.mp3',
            image: './assets/img/img6.jpg',
        },
        {
            name: 'Chại về nơi phía anh',
            singer: 'Khắc Việt',
            path: './assets/music/music7/music7.mp3',
            image: './assets/img/img7.jpg',
        },
        {
            name: 'Attention',
            singer: 'Charlie Puth',
            path: './assets/music/music8/music8.mp3',
            image: './assets/img/img8.jpg',
        },
        {
            name: 'I Need Your Love',
            singer: 'Calvin Harris',
            path: './assets/music/music9/music9.mp3',
            image: './assets/img/img9.jpg',
        },
        {
            name: 'That Girl',
            singer: 'Bejoncé',
            path: './assets/music/music10/music10.mp3',
            image: './assets/img/img10.jpg',
        }
    ],

    

    render: function() {
        this.songs.map((song, index) => {
            let liTag =` 
            <li class="playlist-item ${index === this.currentIndex ? 'active' : ''}" data-set=${index}>
                <div class="playlist-thumb" style="background-image: url('${song.image}')"></div>
                <div class="song-info">
                    <span class="playlist-title">${song.name}</span>
                    <span class="playlist-author">${song.singer}</span> 
                </div>
                <span class="audio-duration"></span>
                <audio class="duration-display" preload="metadata" src=${song.path}></audio>
            
            </li>`  
            ulTag.insertAdjacentHTML("beforeend", liTag);
        })

        const durations = $$('.audio-duration')
        const durationDisplay = $$('.duration-display')
        durations.forEach( (duration, indexs) => {
            durationDisplay[indexs].onloadedmetadata = function() {
                let endMin = Math.floor(durationDisplay[indexs].duration / 60);
                let endSec = Math.floor(durationDisplay[indexs].duration % 60);
                if(endSec < 10) {
                    endSec = `0${endSec}`;
                }
                duration.textContent = `${endMin}:${endSec}`;
            }

        });

    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', { // tự định nghĩa key currentSong vào obj của từng bài hát
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function() {
        const _this = this; // gán _this bằng app

        //xử lý CD khi quay
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 8000,  //10 giây
            iterations: Infinity, // quay vô hạn
        })
        cdThumbAnimate.pause();
        // console.log(cdThumbAnimate);

        btnPlay.onclick = function() {
            if(_this.isPlaying) {
                audio.pause();
                // player.classList.remove('playing');
                // _this.isPlaying = false;
            }
            else {
                audio.play(); 
                // player.classList.add('playing')
                // _this.isPlaying = true;
                   
            }
            
        }

        //khi song được play
        audio.onplay = function() {
             player.classList.add('playing')
            _this.isPlaying = true;
            cdThumbAnimate.play();
        },
        
        //khi song bị pause
        audio.onpause = function() {
            player.classList.remove('playing')
           _this.isPlaying = false;
           cdThumbAnimate.pause();
       },


       audio.onloadedmetadata = function() {
        let endMin = Math.floor(audio.duration / 60);
        let endSec = Math.floor(audio.duration % 60);
        if(endSec < 10) {
            endSec = `0${endSec}`;
        }
        end.textContent = `${endMin}:${endSec}`;

       },
       // khi tiến độ bài hát bị thay đổi
       audio.ontimeupdate = function() {
        progress.style.width = `${audio.currentTime /  audio.duration * 100}%`
        let currentMin = Math.floor(audio.currentTime / 60);
        let currentSec = Math.floor(audio.currentTime % 60);
        if(currentSec < 10) {
            currentSec = `0${currentSec}`
        }
        begin.textContent = `${currentMin}:${currentSec}`;
        console.log(audio.duration)
       }

       progressBar.onmousedown = function(e) {
        audio.currentTime = (e.offsetX / e.target.offsetWidth) * audio.duration;
       }

       audio.onvolumechange = function(e) {
        if(audio.muted) {
            volumeIcon.innerHTML = '<i  class="fas fa-volume-mute"></i>'
        }else if(audio.volume < 0.6) {
            volumeIcon.innerHTML = '<i  class="fas fa-volume-down"></i>'
        }else {
            volumeIcon.innerHTML = '<i  class="fas fa-volume-up"></i>'
        }

        $('.volume').style.width = `${audio.volume * 100}%`;
       }

       volumeBar.onmousedown = (e) => { 
        audio.volume = `${(e.offsetX / e.target.offsetWidth)}`;
       }

       volumeIcon.onclick = () => {
        audio.muted = !audio.muted;
       }   

       next.onclick = () => {
        if(_this.isRandom) {
            _this.playRandomSong();
        }else {
             _this.nextSong();
             
        }
        audio.play();
        _this.activePlaylist();
       }

       prev.onclick = () => {
        if(_this.isRandom) {
            _this.playRandomSong();
        }else {
             _this.prevSong();
            
        }
        audio.play();
        _this.activePlaylist();
       }

       random.onclick = () => {
        _this.isRandom = !_this.isRandom;

        random.classList.toggle("active", _this.isRandom); // isRandom = true thì add active nếu isRandom = flase thì remove active
       }

       repeat.onclick = () => {
        _this.isRepeat = !_this.isRepeat;
        repeat.classList.toggle("active", _this.isRepeat);
       }

       audio.onended = () => {
        if(_this.isRepeat) {
            audio.load();
        }else {
            next.click(); // khi hết bài tự ấn click vào bài mới
        }
        audio.play();
        
       }

       openPlaylist.onclick = () => {
        playlist.classList.add("active")

        _this.scrollToActiveSong();

       }

       closePlaylist.onclick = () => {
        playlist.classList.remove("active");
       }
    },
    
    
    scrollToActiveSong: function () {
        setTimeout(() => {
            $$(".playlist-item")[this.currentIndex].scrollIntoView({
                behavior: "smooth",
                block: "center"
             });
          }, 300);
    },

    loadCurrentSong: function() {
        title.textContent = this.currentSong.name;
        author.textContent = this.currentSong.singer;
        cdThumb.style.backgroundImage = `url("${this.currentSong.image}")`
        audio.src = this.currentSong.path;
    },

    activePlaylist: function() {
        const _this = this;
        const listSong = $$('.playlist-item');
        listSong.forEach((song, index) => {
            if(_this.currentIndex === index) {
                song.classList.add('active')
            }
            else song.classList.remove('active')
        })
 
    },
    
    playingSong: function() {
        const _this = this;
        const playlistItems = $$('.playlist-item')
        playlistItems.forEach((playlistItem) => {
            playlistItem.onclick = function(e) {
                $('.playlist-item.active').classList.remove('active');
                playlistItem.classList.add('active')
                _this.currentIndex = playlistItem.getAttribute('data-set');
                _this.loadCurrentSong();
                audio.play();   
            }    
        })
    },


    nextSong: function () {
        this.currentIndex++;
            if(this.currentIndex > this.songs.length - 1 ) {
                this.currentIndex = 0;
            }
            this.loadCurrentSong();
            // this.a();
    },

    prevSong: function () {
        this.currentIndex--;
            if(this.currentIndex < 0 ) {
                this.currentIndex = this.songs.length - 1;
            }
            this.loadCurrentSong();
    },

    playRandomSong: function () {
        let newIndex;
        do{
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex;
        this.loadCurrentSong();
        
    },

    start: function() {
        //Định nghĩa các thuôc tính cho obj
        this.defineProperties();

        this.loadCurrentSong();

        this.handleEvents();
        //render palyList
        this.render();
        this.playingSong();
        
        audio.volume = 0.5;
    },

    
}

app.start();