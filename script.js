const image = document.querySelector('img');
const title = document.getElementById('title');
const  artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEL = document.getElementById('current-time');
const durationTimeEL = document.getElementById('duration');
const music =document.querySelector('audio');
const prevbtn =document.getElementById('prev');
const playbtn = document.getElementById('play');
const playnext = document.getElementById('next');

//Music
const songs = [
    {
        name:'jacinto-1',
        displayName:'Electric Chill machine',
        artist:'Jacinto Design'
    },
    {
        name:'jacinto-2',
        displayName:'Seven Nation Army (Remix)',
        artist:'Jacinto Design'
    },
    {
        name:'jacinto-3',
        displayName:'Good night Disco Queen',
        artist:'Jacinto Design'
    },
    {
        name:'metric-1',
        displayName:'Electric Chill machine',
        artist:'Jacinto Design'
    }
    
]
//check if music is play or not
let isPlaying = false;
//play
function playsongs(){
    isPlaying =true;
    playbtn.classList.replace('fa-play', 'fa-pause');
    playbtn.setAttribute('title', 'play');
    music.play();
}
playsongs();
//pause

function pausesongs(){
    isPlaying = false;
    playbtn.classList.replace('fa-pause', 'fa-play');
    playbtn.setAttribute("title", 'pause');
    music.pause();
}
pausesongs();

// function nextsongs(){
    
// }

//play or pause eventlistner
playbtn.addEventListener('click',() => (isPlaying ? pausesongs() : playsongs()));

//update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;

}
//currentsongs
let songIndex = 0;
//on load - Select first song
loadSong(songs[songIndex]);

//updateProgressBar
function updateProgressBar(e){
    if(isPlaying){
        // console.log(e);
        const { duration, currentTime } = e.srcElement;
        // console.log(duration, currentTime);
        //update progress bar width
        const progressPercent = (currentTime / duration ) * 100;
        progress.style.width = `${progressPercent}%`;
        //calculate display for duration
        const durationMintues = Math.floor(duration / 60);
        console.log('Minutes', durationMintues);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }
        console.log('seconds', durationSeconds);
       

        //Delay switching duration Element to avoid NaN
        if(durationSeconds){
            durationTimeEL.textContent = `${durationMintues}:${durationSeconds}`;
        }
         //calculate display for currentTime
         const currentMintues = Math.floor(currentTime / 60);
         console.log('Minutes', currentMintues);
         let currentSeconds = Math.floor(currentTime % 60);
         if(currentSeconds < 10){
            currentSeconds = `0${durationSeconds}`
         }
         console.log('seconds', currentSeconds);
         currentTimeEL.textContent =  `${currentMintues}:${durationSeconds}`;
    }
}
//Event Listners
prevbtn.addEventListener('click', preSongs);
playnext.addEventListener('click', nextSongs);
music.addEventListener('timeupdate', updateProgressBar);


//function increament
function preSongs(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playsongs();
    pausesongs();

}
preSongs();
function nextSongs(){
    if(songIndex < 0){
        songIndex = songs.length -1;
        songIndex = 0;
    }
    songIndex++;
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playsongs();
    pausesongs();
}