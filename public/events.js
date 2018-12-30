let addButton = document.getElementsByClassName('add')[0];
let body = document.getElementsByTagName('body')[0];
let overlay = document.getElementById('dim');
let avenger = document.getElementsByClassName('avenger');

addButton.addEventListener('click', renderAddForm);

for (let i = 0; i < avenger.length; i++) {
    avenger[i].addEventListener('click', renderEditForm);
}

overlay.addEventListener('click', fadeOut);

function fadeOut(e) {
	e.target.className = '';
	let form = document.getElementsByClassName('form-container')[0];
	form.remove();
}

function removeAvenger(e) {
	e.preventDefault();
	let form = document.getElementById('form');
   	let formData = serializeForm(form);
	sendFormData('delete', '/avengers', formData);
}

function renderEditForm() {
	let overlay = document.getElementById('dim');
	overlay.className = 'fadeout';

	let id = this.getAttribute('id');
	let request = new XMLHttpRequest();
	request.open('GET', 'avengers/'+ id);
	request.onload = () => {
		if (request.status === 200) {
			let form = document.createElement('div');
			form.className = 'form-container';
	    	form.innerHTML = request.responseText;

	    	body.appendChild(form);

	    	let elementsWithAddClass = form.getElementsByClassName('add');
			Array.from(elementsWithAddClass).forEach((el) => {
				el.className += ' hide';
			});

			let removeButton = document.getElementsByClassName('removeBtn')[0];
			removeButton.addEventListener('click', removeAvenger);

	    	// submit form with AJAX
	        form.addEventListener('submit', (e) => {
	        	e.preventDefault();
	        	let formData = serializeForm(form);
	        	sendFormData('put', '/avengers', formData);
	        });
		} else {
	    	alert('Request failed. Returned status of ' + request.status);
	    }
	};
	request.send();
};

function renderAddForm() {
	let overlay = document.getElementById('dim');
	overlay.className = 'fadeout';

	let request = new XMLHttpRequest();
	request.open('GET', 'form');
	request.onload = () => {
	    if (request.status === 200) {
	        let form = document.createElement('div');
	        form.className = 'form-container';
	        form.innerHTML = request.responseText;

	        body.appendChild(form);

	        let elementsWithAddClass = form.getElementsByClassName('edit');
			Array.from(elementsWithAddClass).forEach((el) => {
				el.className += ' hide';
			});

	        // submit form with AJAX
	        form.addEventListener('submit', (e) => {
	        	e.preventDefault();
	        	let formData = serializeForm(form);
	        	sendFormData('post', '/avengers', formData);
	        });
	    } else {
	    	alert('Request failed. Returned status of ' + request.status);
	    }
	};
	request.send();
}

function serializeForm(form) {
  let input = form.querySelectorAll('input[type="text"], input[type="email"], input[type="hidden"]');
  let formData = {};
  for (let i = 0; i < input.length; i++) {
    formData[input[i].name] = input[i].value;
  }
  return JSON.stringify(formData);
}


function sendFormData(method, url, data) {
	let request = new XMLHttpRequest();
	request.open(method, url);
	request.setRequestHeader('Content-type', 'application/json');
	request.onload = () => {
		if (request.status === 200) {
			let message = document.createElement('div');
			message.innerText = request.responseText;
			let form = document.getElementById('form');
			form.appendChild(message);

			// Reload records after 1 second
			setTimeout(() => {
				let xhr = new XMLHttpRequest();
				xhr.open('GET', '/avengers');
				xhr.onload = () => {
				    if (xhr.status === 200) {
				    	body.innerHTML = xhr.responseText;
				    	// Redefine add and edit buttons and rebind events
				    	let addButton = document.getElementsByClassName('add')[0];
				    	addButton.addEventListener('click', renderAddForm);

				    	let avenger = document.getElementsByClassName('avenger');
						for (let i = 0; i < avenger.length; i++) {
						    avenger[i].addEventListener('click', renderEditForm);
						}

						let overlay = document.getElementById('dim');
						overlay.addEventListener('click', fadeOut);
				    } else {
				    	alert('Request failed. Returned status of ' + request.status);
				    }
				}
				xhr.send();
			}, 1000);
		} else {
			let form = document.getElementById('form');
			let message = document.createElement('div');
			message.innerHTML = request.responseText;
			form.appendChild(message);
		}
	};
	request.send(data);
}