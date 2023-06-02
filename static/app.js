var playlist = [
    ["static/music/Anything.mp3","Anything","static/images/cover.jpg","CRX"],
    ["static/music/Broken Bones.mp3","Broken Bones","static/images/cover.jpg","CRX"],
    ["static/music/Give It Up.mp3","Give It Up","static/images/alternative.jpg","CRX"],
    ["static/music/Monkey Machine.mp3","Monkey Machine","static/images/cover.jpg","CRX"],
    ["static/music/On Edge.mp3","On Edge","static/images/CRX.jpg","CRX"],
    ["static/music/One Track Mind.mp3","One Track Mind","static/images/alternative.jpg","CRX"],
    ["static/music/Slow Down.mp3","Slow Down","static/images/cover.jpg","CRX"],
    ["static/music/Unnatural.mp3","Unnatural","static/images/PEEK.jpg","CRX"],
    ["static/music/Walls.mp3","Walls","static/images/PEEK.jpg","CRX"],
    ["static/music/Ways to Fake It.mp3","Ways to Fake It","static/images/Ways to Fake It.jpg","CRX"]
]

var currentIndex = 0
var maxIndex = 9
var minIndex = 0
var songTitle = document.getElementById("songTitle");
var artist = document.getElementById("artist");
var cover = document.getElementById("cover");
var queue = document.getElementById("queue");

let progress = document.getElementById("progress")
let song = document.getElementById("song")
let ctrlIcon = document.getElementById("ctrlIcon")

song.addEventListener('ended', skipToNextSong);

function skipToNextSong() {
    skipRight();
}

song.onloadedmetadata = function(){
    progress.max = song.duration
    progress.value = song.currentTime
}

function skipLeft(){
    currentIndex--
    if(currentIndex < minIndex){
        currentIndex = 9
    }
    var audioElement = document.getElementById('song')
    audioElement.src = playlist[currentIndex][0]
    audioElement.load();
    songTitle.textContent = playlist[currentIndex][1]
    cover.src = playlist[currentIndex][2]
    artist.textContent = playlist[currentIndex][3]
    audioElement.play()
    setPlay()
}

function skipRight(){
    currentIndex++
    if(currentIndex > maxIndex){
        currentIndex = 0
    }
    var audioElement = document.getElementById('song')
    audioElement.src = playlist[currentIndex][0]
    audioElement.load();
    songTitle.textContent = playlist[currentIndex][1]
    cover.src = playlist[currentIndex][2]
    artist.textContent = playlist[currentIndex][3]
    audioElement.play()
    setPlay()
}

function setPlay(){
    if(ctrlIcon.classList.contains("fa-play")){
        ctrlIcon.classList.add("fa-pause")
        ctrlIcon.classList.remove("fa-play")
    }
}

function playPause(){
    if(ctrlIcon.classList.contains("fa-pause")){
        song.pause()
        ctrlIcon.classList.remove("fa-pause")
        ctrlIcon.classList.add("fa-play")
    }
    else{
        song.play()
        ctrlIcon.classList.add("fa-pause")
        ctrlIcon.classList.remove("fa-play")
    }
}

if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime
    },1000)
}

progress.onchange = function(){
    song.play()
    song.currentTime = progress.value
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}

function showQueue(){
    var html = "";
    queue.innerHTML = html;
    if(document.getElementById("queue").style.display === "none"){
        displayQueue()
        document.getElementById("queue").style.display = "block";
    }
    else{
        document.getElementById("queue").style.display = "none";
    }
}

function displayQueue(){
    var html = "";
    for(i = 0; i < playlist.length; i++){
        html += '<p class="word fancy" onclick="playSong(' + i + ')">'
        html += '<img src="' + playlist[i][2] + '" width="40" height="40" alt="Image">'
        html += playlist[i][1]
        html += '</p>'
    }
    queue.innerHTML = html
}

function shuffleArray(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));  
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function shuffle(){
    playlist = shuffleArray(playlist)
    currentIndex = -1
    displayQueue()
}

function playSong(index){
    currentIndex = index
    var audioElement = document.getElementById('song')
    audioElement.src = playlist[currentIndex][0]
    audioElement.load();
    songTitle.textContent = playlist[currentIndex][1]
    cover.src = playlist[currentIndex][2]
    artist.textContent = playlist[currentIndex][3]
    audioElement.play()
    setPlay()
}
