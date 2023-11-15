const main = document.querySelector('main');
const [spanHr, spanMin, spanSec] = main.querySelectorAll('.screen span');
const em = main.querySelectorAll('.screen em');
let timer;

/*
  em.forEach((el, i) => {
    el.classList.remove('on');
  });

  if (spanHr >= 12 && spanHr < 0) {
    em[1].classList.add('on');
  } else {
    em[0].classList.add('on');
  }
*/

timer = setInterval(() => {
	const now = new Date();
	const hr = now.getHours();
	const min = now.getMinutes();
	const sec = now.getSeconds();

	spanHr.innerText = hr < 10 ? '0' + hr : hr;
	spanMin.innerText = min < 10 ? '0' + min : min;
	spanSec.innerText = sec < 10 ? '0' + sec : sec;
}, 1000);
