window.addEventListener('DOMContentLoaded', function () {
	'use strict';

	// Tabs:
	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent');

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}
	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function (event) {
		let target = event.target;
		if (target && target.classList.contains('info-header-tab')) {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});

	// Timer:
	let deadline = '2021-08-21';

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

	// Modal:
	let more = document.querySelector('.more'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close'),
		descr = document.querySelectorAll('.description-btn');

	more.addEventListener('click', function () {
		this.classList.add('more-splash');
		overlay.style.display = 'block';
		document.body.style.overflow = 'hidden';
	});

	close.addEventListener('click', () => {
		more.classList.remove('more-splash');
		overlay.style.display = 'none';
		document.body.style.overflow = '';
	});

	descr.forEach(elem => {
		elem.addEventListener('click', () => {
			elem.classList.add('more-splash');
			overlay.style.display = 'block';
			document.body.style.overflow = 'hidden';
		});
	});

	// Form
	let message = {
		loading: 'Загрузка...',
		succes: 'Спасибо! Мы скоро с Вами свяжемся!',
		failure: 'Что-то пошло не так...',
	};

	let form = document.getElementsByClassName('main-form')[0],
		formBottom = document.getElementById('form'),
		input = form.getElementsByTagName('input'),
		statusMessage = document.createElement('div');
	statusMessage.classList.add('status');

	function sendForm(elem) {
		elem.addEventListener('submit', function (event) {
			event.preventDefault();
			elem.appendChild(statusMessage);
			let formData = new FormData(elem);

			function postData() {
				return new Promise(function (resolve, reject) {
					let request = new XMLHttpRequest();
					request.open('POST', 'server.php');
					request.setRequestHeader(
						'Content-Type',
						'multipart/form-data'
					);
					request.onreadystatechange = function () {
						if (request.readyState < 4) {
							resolve();
						} else if (request.readyState === 4) {
							if (request.status == 200 && request.status < 3) {
								resolve();
							} else {
								reject();
							}
						}
					};
					let obj = {};
					formData.forEach(function (value, key) {
						obj[key] = value;
					});
					let data = JSON.stringify(obj);
					request.send(data);
				});
			} // end postData

			function clearInput() {
				for (let i = 0; i < input.length; i++) {
					input[i].value = '';
				}
			}

			postData(formData)
				.then(() => (statusMessage.innerHTML = message.loading))
				.then(() => (statusMessage.innerHTML = message.succes))
				.catch(() => (statusMessage.innerHTML = message.failure))
				.then(clearInput);
		});
	}

	sendForm(form);
	sendForm(formBottom);

	// Slider:
	let slideIndex = 1,
		slides = document.querySelectorAll('.slider-item'),
		prev = document.querySelector('.prev'),
		next = document.querySelector('.next'),
		dotsWrap = document.querySelector('.slider-dots'),
		dots = document.querySelectorAll('.dot');

	showSlides(slideIndex);
	function showSlides(n) {
		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}

		// for (let i = 0; i < slides.length; i++) {
		// 	slides[i]style.display = 'none';
		// }
		slides.forEach(item => (item.style.display = 'none'));
		dots.forEach(item => item.classList.remove('dot-active'));

		slides[slideIndex - 1].style.display = 'block';
		dots[slideIndex - 1].classList.add('dot-active');
	}

	function plusSlides(n) {
		showSlides((slideIndex += n));
	}
	function currentSlide(n) {
		showSlides((slideIndex = n));
	}

	prev.addEventListener('click', function () {
		plusSlides(-1);
	});
	next.addEventListener('click', function () {
		plusSlides(1);
	});

	dotsWrap.addEventListener('click', function (e) {
		for (let i = 0; i < dots.length + 1; i++) {
			if (e.target.classList.contains('dot') && e.target == dots[i - 1]) {
				currentSlide(i);
			}
		}
	});

	// Calculator:
	let persons = document.querySelectorAll('.counter-block-input')[0],
		restDays = document.querySelectorAll('.counter-block-input')[1],
		place = document.getElementById('select'),
		totalValue = document.getElementById('total'),
		personsSum = 0,
		daysSum = 0,
		total = 0;

	totalValue.innerHTML = 0;

	persons.addEventListener('input', function () {
		personsSum = +this.value;
		total = daysSum * personsSum * 4000;

		if (restDays.value == '') {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML =
				total * place.options[place.selectedIndex].value;
		}
	});

	restDays.addEventListener('input', function () {
		daysSum = +this.value;
		total = daysSum * personsSum * 4000;

		if (persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML =
				total * place.options[place.selectedIndex].value;
		}
	});

	place.addEventListener('change', function () {
		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
			let a = total;
			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
		}
	});
});
