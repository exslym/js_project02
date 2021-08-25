export default function timer() {
	let deadline = '2021-09-30';

	function getTimeRemaining(endtime) {
		let total = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((total / 1000) % 60),
			minutes = Math.floor((total / 1000 / 60) % 60),
			hours = Math.floor(total / 1000 / 60 / 60);
		//  hours = Math.floor((t/1000/60/60) % 24),
		//  days = Math.floor(t/1000/60/60/24);
		return {
			total,
			hours,
			minutes,
			seconds,
		};
	}

	function setClock(id, endtime) {
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds'),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			let t = getTimeRemaining(endtime);

			function addZero(num) {
				if (num < 10) {
					return `0${num}`;
				} else {
					return num;
				}
			}
			hours.textContent = addZero(t.hours);
			minutes.textContent = addZero(t.minutes);
			seconds.textContent = addZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
				hours.textContent = '00';
				minutes.textContent = '00';
				seconds.textContent = '00';
			}
		}
	}
	setClock('timer', deadline);
}
