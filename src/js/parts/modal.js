function modal() {
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
}

module.exports = modal;
