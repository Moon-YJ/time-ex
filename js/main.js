const main = document.querySelector('main');
const numbers = main.querySelectorAll('.screen span');
const em = main.querySelector('.screen .apm');
const btns = main.querySelectorAll('nav span');
let timer;

// 자주 바뀔만한 값을 전역변수로 객체를 배열로 묶어두는 형태로 따로 빼서 관리
// 해당 값이 아래 함수에서 호출되도록 처리
const data = [
	// const hr = new Date().getHours() 쓰면 안되는 이유 --> 시간이 지날때마다 바뀌어야하는데 const 안에 담아놓으면 고정값이므로
	{ cond: new Date().getHours() >= 5 && new Date().getHours() < 12, name: 'morning' },
	{ cond: new Date().getHours() >= 12 && new Date().getHours() < 16, name: 'afternoon' },
	{ cond: new Date().getHours() >= 16 && new Date().getHours() < 20, name: 'evening' },
	{ cond: new Date().getHours() >= 20 || new Date().getHours() < 5, name: 'night' },
];

timer = setInterval(() => {
	// data전역변수를 인수로 받아서 호출
	changeTheme(data);
	em.innerText = new Date().getHours() < 12 ? 'am' : 'pm';
	//getTime함수가 [시간,분,초]반환
	//반환된 배열값을 그대로 반복돌면서 setTime함수에 인수로 전달
	//setTime반복돌면서 시간,분,초에 1자리수일때 앞에 '0'을 붙여주는 공통로직 반복 처리
	getTime().forEach((num, idx) => setTime(num, idx));
}, 1000);

// 시간값을 구해서 반환하는 함수
function getTime() {
	const now = new Date();
	let hr = now.getHours();
	const min = now.getMinutes();
	const sec = now.getSeconds();
	//현재 시간값이 13이상이되면 12를 뺀값을 hr로 리턴
	hr = hr > 12 ? hr - 12 : hr;
	return [hr, min, sec];
}

// 반환된 시간값을 인수로 받아서 DOM에 세팅하는 함수
function setTime(num, index) {
	numbers[index].innerText = num < 10 ? '0' + num : num;
}

// 시간에 따른 테마 변경 함수
function changeTheme(info) {
	main.className = '';

	// 전역 data를 바로 활용하지 않고 파라미터를 통해 전달받도록 처리
	// 추후 데이터 추적을 편하게 하기 위함
	info.forEach((el) => {
		if (el.cond) main.classList.add(el.name);
	});

	/*
    if (hr >= 5 && hr < 12) {
      main.classList.add('morning');
    }
    if (hr >= 12 && hr < 16) {
      main.classList.add('afternoon');
    }
    if (hr >= 16 && hr < 20) {
      main.classList.add('evening');
    }
    if (hr >= 20 || hr < 5) {
      main.classList.add('night');
    }
  */
}

btns.forEach((btn, idx) => {
	btn.addEventListener('click', (e) => {
		btns.forEach((btn) => btn.classList.remove('on'));
		e.currentTarget.classList.add('on');
		clearInterval(timer);
		main.className = '';
		main.classList.add(e.currentTarget.innerText.toLowerCase());
		// toLowerCase() - 모든 문자를 소문자로 반환
		// toUpperCase() - 모든 문자를 대문자로 반환
	});
});
