import songs from './playList.js';

const playList = document.querySelector('.play-list');
const volBar = document.querySelector('.volume');
const durBar = document.querySelector('.duration');
const bars = document.querySelectorAll('.bar');
const prevButton = document.querySelector('.button.prev');
const nextButton = document.querySelector('.button.next');
const playButton = document.querySelector('.button.play');
const soundButton = document.querySelector('.button.sound');
const trackName = document.querySelector('.track-name');
const buttons = document.querySelectorAll('.button');

const curTime = document.querySelector('.current-time');
const wholeTime = document.querySelector('.whole-time');

let playSpecific;

const iconMute = `
<svg style="enable-background:new 0 0 16 16;" version="1.1" viewBox="0 0 16 16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="10,16 10,0 3,5 0,5 0,11 3,11 "/><polygon points="14.646,5.646 13,7.293 11.354,5.646 10.646,6.354 12.293,8 10.646,9.646 11.354,10.354 13,8.707 14.646,10.354   15.354,9.646 13.707,8 15.354,6.354 "/></svg>
`;
const iconSound = `
<svg style="enable-background:new 0 0 16 16;" version="1.1" viewBox="0 0 16 16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="10,16 10,0 3,5 0,5 0,11 3,11 "/><path d="M11,13.91c2.837-0.477,5-2.938,5-5.91s-2.163-5.433-5-5.91v1.011C13.279,3.566,15,5.585,15,8s-1.721,4.434-4,4.899V13.91z"/><path d="M11,9.722v1.094c1.163-0.413,2-1.512,2-2.816s-0.837-2.403-2-2.816v1.094C11.595,6.625,12,7.263,12,8  C12,8.737,11.595,9.375,11,9.722z"/></svg>
`;
const iconPlay = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 64 64">
<title>play2</title>
<path fill="#fff" d="M32 0c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zM32 58c-14.359 0-26-11.641-26-26s11.641-26 26-26 26 11.641 26 26-11.641 26-26 26zM24 18l24 14-24 14z"></path>
</svg>
`;
const iconPause = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 64 64">
<title>pause</title>
<path fill="#fff" d="M32 0c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zM32 58c-14.359 0-26-11.641-26-26s11.641-26 26-26 26 11.641 26 26-11.641 26-26 26zM20 20h8v24h-8zM36 20h8v24h-8z"></path>
</svg>
`;

let playingTrack;
let playingTrackName;
let tracks;

let curTrackNum = 0;
let prevTrackNum = curTrackNum;
let specificIcon;
let lastSoundVal = 0;

songs.forEach((el, index) => {
  const song = document.createElement('li');
  song.classList.add(`track`);
  song.classList.add(`s${index}`);
  const soundIcon = document.createElement('span');
  soundIcon.classList.add('icon-play');
  soundIcon.setAttribute('data-number', index);
  soundIcon.innerHTML = iconPlay;
  const track = document.createElement('audio');
  const songWrapper = document.createElement('figure');
  const title = document.createElement('figcaption');
  track.setAttribute('src', `${el.src}`);
  title.textContent = `${el.title} (${el.duration})`;

  songWrapper.append(title);
  songWrapper.append(track);

  song.append(soundIcon);
  song.append(songWrapper);
  playList.append(song);
});
playSpecific = document.querySelectorAll('.icon-play');

durBar.style.background = `linear-gradient(to right, #ff4901 0%, #ff4901 0%, #c4c4c4 0%, #c4c4c4 100%)`;

tracks = document.querySelectorAll('.track');
specificIcon = tracks[curTrackNum].querySelector('.icon-play');

if (!trackName.textContent) trackName.classList.add('invisible');

function progressBarHandler(el) {
  el.style.background = `linear-gradient(to right, #ff4901 0%, #ff4901 ${el.value}%, #c4c4c4 ${el.value}%, #c4c4c4 100%)`;
}

function changeBarStatus(el) {
  const headway = (el.currentTime / el.duration) * 100;
  durBar.value = headway;
  durBar.style.background = `linear-gradient(to right, #ff4901 0%, #ff4901 ${headway}%, #c4c4c4 ${headway}%, #c4c4c4 100%)`;
}

function beforePlaying() {
  playingTrack.pause();
  specificIcon.innerHTML = playingTrack.paused ? iconPlay : iconPause;
  if (prevTrackNum !== curTrackNum) tracks[prevTrackNum].classList.remove('active');
}
function checkTreckEnd() {
  if (playingTrack.currentTime >= playingTrack.duration) {
    beforePlaying();
    if (curTrackNum + 1 > tracks.length - 1) {
      prevTrackNum = curTrackNum;
      curTrackNum = 0;
    } else {
      prevTrackNum = curTrackNum;
      curTrackNum += 1;
    }
    setTrack();
    playTrack();
  }
}
function soundChangeHandler() {
  playingTrack.volume = volBar.value / 100;
  if (playingTrack.volume === 0) soundButton.innerHTML = iconMute;
  if (playingTrack.volume > 0) soundButton.innerHTML = iconSound;
}
function trackTimeHandler(ev) {
  const position = (ev.offsetX / durBar.offsetWidth) * playingTrack.duration;
  playingTrack.currentTime = position;
}

function showTime() {
  curTime.textContent = `${
    playingTrack.currentTime / 60 < 10
      ? '0' + Math.floor(playingTrack.currentTime / 60)
      : Math.floor(playingTrack.currentTime % 60)
  }:${
    playingTrack.currentTime % 60 < 10
      ? '0' + Math.floor(playingTrack.currentTime % 60)
      : Math.floor(playingTrack.currentTime % 60)
  }`;
  wholeTime.textContent = `0${Math.floor(playingTrack.duration / 60)}: ${
    playingTrack.duration % 60 < 10
      ? '0' + Math.floor(playingTrack.duration % 60)
      : Math.floor(playingTrack.duration % 60)
  }`;
}

function playingStatusHandler(el) {
  changeBarStatus(el);
  soundChangeHandler();
  checkTreckEnd();
  showTime();
}

function setTrack() {
  playingTrackName = tracks[curTrackNum].querySelector('figcaption');
  playingTrack = tracks[curTrackNum].querySelector('audio');
  playingTrack.currentTime = 0;
}

function playIconHandler() {
  playButton.innerHTML = playingTrack.paused ? iconPlay : iconPause;
  specificIcon = tracks[curTrackNum].querySelector('.icon-play');
  specificIcon.innerHTML = playingTrack.paused ? iconPlay : iconPause;
}

function muteHandler(val, icon) {
  volBar.value = val;
  soundButton.innerHTM = icon;
  progressBarHandler(volBar);
}

function soundIconHandler() {
  if (volBar.value > 0) {
    lastSoundVal = volBar.value;
    muteHandler(0, iconMute);
  } else muteHandler(lastSoundVal, iconSound);
}
function playTrack() {
  trackName.classList.remove('invisible');
  specificIcon.innerHTML = playingTrack.paused ? iconPlay : iconPause;
  tracks[prevTrackNum].classList.remove('active');
  tracks[curTrackNum].classList.add('active');
  tracks[curTrackNum].scrollIntoView({ behavior: 'smooth', block: 'end' });
  trackName.textContent = playingTrackName.textContent.split('(')[0];
  playingTrack.addEventListener('timeupdate', () => playingStatusHandler(playingTrack));
  playingTrack[playingTrack.paused ? 'play' : 'pause']();
  playIconHandler();
}
function playHandler() {
  playTrack();
}
function playPrev() {
  beforePlaying();
  if (curTrackNum - 1 < 0) {
    prevTrackNum = curTrackNum;
    curTrackNum = tracks.length - 1;
  } else {
    prevTrackNum = curTrackNum;
    curTrackNum -= 1;
  }
  setTrack();
  playTrack();
}
function playNext() {
  beforePlaying();
  if (curTrackNum + 1 > tracks.length - 1) {
    prevTrackNum = curTrackNum;
    curTrackNum = 0;
  } else {
    prevTrackNum = curTrackNum;
    curTrackNum += 1;
  }
  setTrack();
  playTrack();
}
function playSpecificHandler() {
  if (curTrackNum === +this.getAttribute('data-number')) {
    if (!playingTrack.paused) beforePlaying();
    else playTrack();
  } else {
    beforePlaying();
    prevTrackNum = curTrackNum;
    curTrackNum = +this.getAttribute('data-number');
    setTrack();
    playTrack();
  }
}
setTrack();
playingTrack.volume = volBar.value / 100;

function buttonHandler(ev) {
  if (ev.target === prevButton) playPrev();
  if (ev.target === nextButton) playNext();
  if (ev.target === playButton) playHandler();
  if (ev.target === soundButton) soundIconHandler();
}

bars.forEach(el => {
  el.addEventListener('input', () => progressBarHandler(el));
});
durBar.addEventListener('click', ev => trackTimeHandler(ev));
buttons.forEach(el => {
  el.addEventListener('click', buttonHandler);
});
playSpecific.forEach(el => {
  el.addEventListener('click', playSpecificHandler);
});