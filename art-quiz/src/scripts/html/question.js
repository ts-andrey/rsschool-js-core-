const content = (type, arr, timeObj) => {
  const withTimer = `<li>
  <ul class="timer">
  <li><svg class="exit" fill="none" height="28" viewBox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg"><path d="M2.32129 2.32363C2.72582 1.9191 3.38168 1.9191 3.78621 2.32363L25.6966 24.234C26.1011 24.6385 26.1011 25.2944 25.6966 25.6989C25.2921 26.1035 24.6362 26.1035 24.2317 25.6989L2.32129 3.78854C1.91676 3.38402 1.91676 2.72815 2.32129 2.32363Z" fill="black"/><path d="M25.6787 2.30339C25.2742 1.89887 24.6183 1.89887 24.2138 2.30339L2.30339 24.2138C1.89887 24.6183 1.89887 25.2742 2.30339 25.6787C2.70792 26.0832 3.36379 26.0832 3.76831 25.6787L25.6787 3.76831C26.0832 3.36379 26.0832 2.70792 25.6787 2.30339Z" fill="black"/></svg></li>
    <li class="timebar"><input type="range" name="timelimit" class="timelimit bar"></li>
    <li><span class="time-amount">00:${timeObj[1] ? timeObj[1] : '00'}</span></li>
  </ul>
</li>`;
  const artContent = `
<li><p class="question">${arr[0]}</p></li>
<li class="question-img-container">
  <img class="question-img" src="${arr[1]}" alt="question picture" />
  <ul class="questions-progress">
    <li class="question-number"></li>
    <li class="question-number"></li>
    <li class="question-number"></li>
    <li class="question-number"></li>
    <li class="question-number"></li>
    <li class="question-number"></li>
    <li class="question-number"></li>
    <li class="question-number"></li>
    <li class="question-number"></li>
    <li class="question-number"></li>
  </ul>
</li>
<li>
  <ul class="answers">
    <li class="text-answer btn answer-option" data-num="0">${arr[3][0]}</li>
    <li class="text-answer btn answer-option" data-num="1">${arr[3][1]}</li>
    <li class="text-answer btn answer-option" data-num="2">${arr[3][2]}</li>
    <li class="text-answer btn answer-option" data-num="3">${arr[3][3]}</li>
  </ul>
</li>
`;
  const imgContent = `
  <li><p class="question">${arr[0]}</p></li>
  <li>
    <ul class="answers">
      <li class="answer-option answer-option-img" data-num="0"><img class="img-answer" src="${arr[3][0]}" alt="answer picture"/></li>
      <li class="answer-option answer-option-img" data-num="1"><img class="img-answer" src="${arr[3][1]}" alt="answer picture"/></li>
      <li class="answer-option answer-option-img" data-num="2"><img class="img-answer" src="${arr[3][2]}" alt="answer picture"/></li>
      <li class="answer-option answer-option-img" data-num="3"><img class="img-answer" src="${arr[3][3]}" alt="answer picture"/></li>
      <li class="answer-paints-progress">
        <ul class="questions-progress">
          <li class="question-number"></li>
          <li class="question-number"></li>
          <li class="question-number"></li>
          <li class="question-number"></li>
          <li class="question-number"></li>
          <li class="question-number"></li>
          <li class="question-number"></li>
          <li class="question-number"></li>
          <li class="question-number"></li>
          <li class="question-number"></li>
        </ul>
      </li>
    </ul>

  </li>
`;

  const result = `
<ul class="container-question">
  ${timeObj[0] ? withTimer : ''}
  ${type === 'artists' ? artContent : type === 'imgs' ? imgContent : ''}
</ul>
`;
  return result;
};

class Question {
  constructor(type, data, timeObj) {
    this.el = document.querySelector('.main-content');
    this.type = type;
    this.data = data;
    this.timeObj = timeObj;
  }
  render() {
    const backgroundElement = document.querySelector('main');
    backgroundElement.style.background = '#000';
    this.el.innerHTML = content(this.type, this.data, this.timeObj);
    const progress = this.data[2];
    const elements = document.querySelectorAll('.question-number');
    if (this.type === 'artists')
      for (let i = 0; i < progress.length; i++) {
        if (progress[i] === true) {
          elements[i].style.background = `#ff4901`;
          elements[i].style.border = `.1rem solid #000`;
        }
        if (progress[i] === false) {
          elements[i].style.background = `#000`;
          elements[i].style.border = `.1rem solid #fff`;
        }
      }
    if (this.type === 'imgs')
      for (let i = 0; i < progress.length; i++) {
        if (progress[i] === true) {
          elements[i].style.background = `#ff4901`;
          elements[i].style.border = `.1rem solid #000`;
        }
        if (progress[i] === false) {
          elements[i].style.background = `#000`;
          elements[i].style.border = `.1rem solid #fff`;
        }
      }
    const timeValEl = document.querySelector('.time-amount');
    return [timeValEl, this.data];
  }
  answerSeeker(handler) {
    this.answers = document.querySelectorAll('.answer-option');
    this.answers.forEach(el => {
      el.addEventListener('click', ev =>
        handler({
          event: ev,
          element: el,
          answer: this.data[4],
          answerData: this.data[5],
          imgPath: this.data[1],
        })
      );
    });
  }
  closeSeeker(handler) {
    this.exit = document.querySelector('.exit');
    this.exit.addEventListener('click', ev => handler({ event: ev, element: this.exit }));
  }
  timeSeeker(handler) {
    this.timeBar = document.querySelector('.timelimit');
    this.timeAmount = document.querySelector('.time-amount');
    return handler({ timeBar: this.timeBar, time: this.timeAmount });
  }
}

module.exports.Question = Question;