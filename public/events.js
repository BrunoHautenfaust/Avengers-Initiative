let click = new Audio('sfx/click.wav');
let music = new Audio('sfx/music.wav');
music.loop = true;
music.volume = 0.2;
music.play();

// Loop music
setInterval(() => {
	if (music.currentTime >= 16) {
		music.currentTime = 0;
	}
}, 100);

bindEvents();

function bindEvents() {
	let avengers = document.getElementsByClassName('avenger');
	let body = document.getElementsByTagName('body')[0];
	let overlay = document.getElementById('dim');
	let audioButton = document.getElementById('audio');

	audioButton.addEventListener('click', () => {
		if (!music.paused) {
			music.pause();
			audioButton.className = 'off';
		} else {
			music.play();
			audioButton.className = 'on';
		}
	});
	
	Array.from(avengers).forEach((el, i) => {
		let show = new Audio('sfx/show.wav');
		el.addEventListener('click', renderEditForm);
		setTimeout(() => {
			i += 1;
			el.className = 'avenger show';
			show.play();
		}, 1000 + (i * 500));
	});

	let time = 1000 + (Array.from(avengers).length * 500);
	setTimeout(() => {
		let addButton = document.getElementsByClassName('add hide')[0];
		addButton.className = 'add';
		addButton.addEventListener('click', renderAddForm);
		click.play();
	}, time);

	overlay.addEventListener('click', fadeOut);


}

// Fade out display when a form gets rendered
function fadeOut(e) {
	e.target.className = '';
	let form = document.getElementsByClassName('form-container')[0];
	form.remove();
}

function renderAddForm() {
	click.play();
	document.getElementById('dim').className = 'fadeout';

	let request = new XMLHttpRequest();
	request.open('GET', 'form');
	request.onload = () => {
	    if (request.status === 200) {
			successfulResponse(request, 'edit', 'POST');
	    } else {
	    	alert('Request failed. Returned status of ' + request.status);
	    }
	};
	request.send();
}

function renderEditForm() {
	click.play();
	document.getElementById('dim').className = 'fadeout';

	let id = this.getAttribute('id');
	let request = new XMLHttpRequest();
	request.open('GET', 'avengers/'+ id);
	request.onload = () => {
		if (request.status === 200) {
			successfulResponse(request, 'add', 'PUT');

			let removeButton = document.getElementsByClassName('removeBtn')[0];
			removeButton.addEventListener('click', removeAvenger);
		} else {
	    	alert('Request failed. Returned status of ' + request.status);
	    }
	};
	request.send();
};

function removeAvenger(e) {
	e.preventDefault();
	let form = document.getElementById('form');
	let id = form.elements['id'].value;
   	let formData = serializeForm(form);
	sendFormData('DELETE', '/avengers/' + id, formData);
}

/* Render successful response
params:
	req - request object
	elClass - className to determine which elements to hide on form render
	httpMethod - defines the method fo the sendFormData request (post or put)
*/ 
function successfulResponse(req, elClass, httpMethod) {
	let form = document.createElement('div');
	form.className = 'form-container';
	form.innerHTML = req.responseText;

	let body = document.getElementsByTagName('body')[0];
	body.appendChild(form);

	let elementsToHide = form.getElementsByClassName(elClass);
	Array.from(elementsToHide).forEach((el) => {
		el.className += ' hide';
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		let formData = serializeForm(form);
		sendFormData(httpMethod, '/avengers', formData);
	});
}

/* Serialize form
params: 
	form - form object containing the form data
*/
function serializeForm(form) {
  let input = form.querySelectorAll('input[type="text"], input[type="hidden"]');
  let formData = {};
  for (let i = 0; i < input.length; i++) {
    formData[input[i].name] = input[i].value;
  }
  
  return JSON.stringify(formData);
}

/* Send form data
params:
	httpMethod - defines the method fo the sendFormData request
	url - the endpoint for the request
	data - data to send
*/
function sendFormData(httpMethod, url, data) {
	let request = new XMLHttpRequest();
	request.open(httpMethod, url);
	request.setRequestHeader('Content-type', 'application/json');
	request.onload = () => {
		if (request.status === 200) {
			let message = document.createElement('div');
			message.className = 'message';
			message.innerText = request.responseText;
			let form = document.getElementById('form');
			form.appendChild(message);

			// Reload records after 1 second
			setTimeout(() => {
				let xhr = new XMLHttpRequest();
				xhr.open('GET', '/avengers');
				xhr.onload = () => {
				    if (xhr.status === 200) {
				    	let body = document.getElementsByTagName('body')[0];
				    	body.innerHTML = xhr.responseText;
				    	
						bindEvents();
				    } else {
				    	alert('Request failed. Returned status of ' + request.status);
				    }
				}
				xhr.send();
			}, 1000);
		} else {
			let form = document.getElementById('form');
			let message = document.createElement('div');
			message.className = 'message';
			message.innerHTML = request.responseText;
			form.appendChild(message);
			
			setTimeout(() => {
				message.remove();
			}, 1000);
		}
	};

	request.send(data);
}