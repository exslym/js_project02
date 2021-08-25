function form() {
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
					request.setRequestHeader('Content-Type', 'multipart/form-data');
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
}

module.exports = form;
