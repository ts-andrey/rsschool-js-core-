import { getWeather } from './weather.js';
import { getQuotes } from './quote.js';

const setIcon = document.querySelector('.settings-icon');
const settingsMenu = document.querySelector('.settings-menu');
let languageOptions = document.querySelectorAll('.language');
let picSrcOptions = document.querySelectorAll('.img-storage');
let imageThemeAPIOption = document.querySelector('.img-themes');
let showOptions = document.querySelectorAll('input[name="show"]');

const langWrapper = document.querySelector('.lang-option');
const imgWrapper = document.querySelector('.img-storage-option');
const imgThemeWrapper = document.querySelector('.img-theme-option');
const showWrapper = document.querySelector('.show-option');

const playerItem = document.querySelector('.player');
const weatherItem = document.querySelector('.weather');
const timeItem = document.querySelector('.time');
const dateItem = document.querySelector('.date');
const greetItem = document.querySelector('.greet');
const infoItem = document.querySelector('.info');
const quoteItem = document.querySelector('.quote');

let language = window.localStorage.getItem('language');

const langTextEng = ['Choose language:', 'English', 'Russian'];
const langTextRu = ['Выберите язык:', 'Английский', 'Русский'];

const ImgTextEng = ['Choose picture source:'];
const ImgTextRu = ['Выберите источник изображений:'];

const ImgThemeTextEng = ['Image themes for API source:', 'Choose image theme', 'Nature', 'Animals'];
const ImgThemeTextRu = ['Тематика изображений для API:', 'Выберите тематику', 'Природа', 'Животные'];

const showTextEng = ['Choose what to show:', 'Playlist', 'Weather', 'Info-block', 'Time', 'Date', 'Greeting', 'Quotes'];
const showTextRu = [
  'Выберите что отображать:',
  'Плэйлист',
  'Погода',
  'Инфоблок',
  'Время',
  'Дата',
  'Приветствие',
  'Цитаты',
];
let showOptionsObject = {
  playlist: true,
  weather: true,
  infoblock: true,
  time: true,
  date: true,
  greet: true,
  quote: true,
};

function translateSettings() {
  language = window.localStorage.getItem('language');

  langWrapper.querySelector('p').textContent = language === 'eng' ? langTextEng[0] : langTextRu[0];
  const langWrapperLables = langWrapper.querySelectorAll('label');
  langWrapperLables[0].textContent = language === 'eng' ? langTextEng[1] : langTextRu[1];
  langWrapperLables[1].textContent = language === 'eng' ? langTextEng[2] : langTextRu[2];

  imgWrapper.querySelector('p').textContent = language === 'eng' ? ImgTextEng[0] : ImgTextRu[0];

  imgThemeWrapper.querySelector('p').textContent = language === 'eng' ? ImgThemeTextEng[0] : ImgThemeTextRu[0];
  const imgThemeOptions = imgThemeWrapper.querySelectorAll('option');
  imgThemeOptions[0].textContent = language === 'eng' ? ImgThemeTextEng[1] : ImgThemeTextRu[1];
  imgThemeOptions[1].textContent = language === 'eng' ? ImgThemeTextEng[2] : ImgThemeTextRu[2];
  imgThemeOptions[2].textContent = language === 'eng' ? ImgThemeTextEng[3] : ImgThemeTextRu[3];

  showWrapper.querySelector('p').textContent = language === 'eng' ? showTextEng[0] : showTextRu[0];
  const showWrapperLables = showWrapper.querySelectorAll('label');
  showWrapperLables[0].textContent = language === 'eng' ? showTextEng[1] : showTextRu[1];
  showWrapperLables[1].textContent = language === 'eng' ? showTextEng[2] : showTextRu[2];
  showWrapperLables[2].textContent = language === 'eng' ? showTextEng[3] : showTextRu[3];
  showWrapperLables[3].textContent = language === 'eng' ? showTextEng[4] : showTextRu[4];
  showWrapperLables[4].textContent = language === 'eng' ? showTextEng[5] : showTextRu[5];
  showWrapperLables[5].textContent = language === 'eng' ? showTextEng[6] : showTextRu[6];
  showWrapperLables[6].textContent = language === 'eng' ? showTextEng[7] : showTextRu[7];
}

function languageHandler() {
  console.log(this.value);
  window.localStorage.setItem('language', this.value);
  getWeather();
  getQuotes();
  translateSettings();
}

function showMenuHandler() {
  settingsMenu.classList.toggle('shown');
}

function displayHandler() {
  if (this.classList.contains('show-playlist')) playerItem.classList.toggle('invisible');
  if (this.classList.contains('show-weather')) weatherItem.classList.toggle('invisible');
  if (this.classList.contains('show-time')) timeItem.classList.toggle('invisible');
  if (this.classList.contains('show-date')) dateItem.classList.toggle('invisible');
  if (this.classList.contains('show-greet')) greetItem.classList.toggle('invisible');
  if (this.classList.contains('show-info')) infoItem.classList.toggle('invisible');
  if (this.classList.contains('show-quotes')) quoteItem.classList.toggle('invisible');

  showOptionsObject[this.getAttribute('data-name')] = this.checked;
  window.localStorage.setItem('showObject', JSON.stringify(showOptionsObject));
}

function imgStorageHandler() {
  window.localStorage.setItem('imgSrc', this.value);
}

function imgThemeHandler() {
  window.localStorage.setItem('imgTheme', this.value);
}

function setInitialState() {
  if (language === 'eng') languageOptions[0].checked = true;
  else languageOptions[1].checked = true;
  if (!window.localStorage.getItem('showObject'))
    window.localStorage.setItem('showObject', JSON.stringify(showOptionsObject));
  const imageSource = window.localStorage.getItem('imgSrc');
  if (imageSource === 'github') picSrcOptions[0].checked = true;
  if (imageSource === 'flickr') picSrcOptions[1].checked = true;
  if (imageSource === 'unsplash') picSrcOptions[2].checked = true;

  const imgTheme = window.localStorage.getItem('imgTheme');
  if (imgTheme === 'nature') imageThemeAPIOption[1].selected = true;
  if (imgTheme === 'animals') imageThemeAPIOption[2].selected = true;

  showOptionsObject = JSON.parse(window.localStorage.getItem('showObject'));
  showOptions.forEach(el => {
    el.checked = showOptionsObject[el.getAttribute('data-name')];
  });

  for (const key in showOptionsObject) {
    if (key === 'playlist' && showOptionsObject[key]) playerItem.classList.remove('invisible');
    else if (key === 'playlist' && !showOptionsObject[key]) playerItem.classList.add('invisible');

    if (key === 'weather' && showOptionsObject[key]) weatherItem.classList.remove('invisible');
    else if (key === 'weather' && !showOptionsObject[key]) weatherItem.classList.add('invisible');

    if (key === 'infoblock' && showOptionsObject[key]) infoItem.classList.remove('invisible');
    else if (key === 'infoblock' && !showOptionsObject[key]) infoItem.classList.add('invisible');

    if (key === 'time' && showOptionsObject[key]) timeItem.classList.remove('invisible');
    else if (key === 'time' && !showOptionsObject[key]) timeItem.classList.add('invisible');

    if (key === 'date' && showOptionsObject[key]) dateItem.classList.remove('invisible');
    else if (key === 'date' && !showOptionsObject[key]) dateItem.classList.add('invisible');

    if (key === 'greet' && showOptionsObject[key]) greetItem.classList.remove('invisible');
    else if (key === 'greet' && !showOptionsObject[key]) greetItem.classList.add('invisible');

    if (key === 'quote' && showOptionsObject[key]) quoteItem.classList.remove('invisible');
    else if (key === 'quote' && !showOptionsObject[key]) quoteItem.classList.add('invisible');
  }
}

setInitialState();
translateSettings();

setIcon.addEventListener('click', showMenuHandler);

languageOptions.forEach(el => {
  el.addEventListener('change', languageHandler);
});

showOptions.forEach(el => {
  el.addEventListener('change', displayHandler);
});

picSrcOptions.forEach(el => {
  el.addEventListener('change', imgStorageHandler);
});

imageThemeAPIOption.addEventListener('change', imgThemeHandler);