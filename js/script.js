const musicContainer = document.getElementById('music-container');
const title = document.getElementById('title');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 2;

function loadSong(song) {
    title.textContent = song;
    audio.src = `./music/${song}.mp3`;
    cover.src = `./img/${song}.jpg`;
}

function playSong(){
    audio.play();
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
}

function pauseSong(){
    audio.pause();
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
}

function prevSong() {
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex]);
    playSong();  
}

function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration )*100;
    progress.style.width = `${progressPercent}%`;
}

function setProgres(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
    // console.log(clickX);
}

loadSong(songs[songIndex]);

playBtn.addEventListener('click', ()=>{
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgres);

audio.addEventListener('ended', nextSong);