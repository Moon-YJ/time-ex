const main = document.querySelector('main');
const numbers = main.querySelectorAll('.screen span');
const em = main.querySelector('.screen .apm');

setInterval(() => {
	changeTheme();
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
function changeTheme() {
	const hr = new Date().getHours();
	main.className = '';

	if (hr >= 5 && hr < 12) {
		main.classList.add('morning');
	}
	if (hr >= 12 && hr < 16) {
		main.classList.add('afternoon');
	}
	if (hr >= 16 && hr < 20) {
		main.classList.add('evening');
	}
	if (hr >= 20) {
		main.classList.add('night');
	}
}
