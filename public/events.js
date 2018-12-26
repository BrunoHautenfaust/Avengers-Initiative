let addButton = document.getElementsByClassName('add')[0];
let body = document.getElementsByTagName('body')[0];

addButton.addEventListener('click', renderForm);

// Render form for adding an avenger
function renderForm() {
	let request = new XMLHttpRequest();
	request.open('GET', 'form');
	request.onload = () => {
	    if (request.status === 200) {
	        let form = document.createElement('div');
	        form.innerHTML = request.responseText;
	        body.appendChild(form);

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
  let input = form.querySelectorAll('input[type="text"]');
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
			let response = document.createElement('div');
			response.innerText = request.responseText;
			body.appendChild(response);

			// Reload records after 1 second
			setTimeout(() => {	
				let xhr = new XMLHttpRequest();
				xhr.open('GET', '/avengers');
				xhr.onload = () => {
				    if (xhr.status === 200) {
				    	body.innerHTML = xhr.responseText;
				    	// Redefine addButton and rebind event
				    	let addButton = document.getElementsByClassName('add')[0];
				    	addButton.addEventListener('click', renderForm);
				    } else {
				    	alert('Request failed. Returned status of ' + request.status);
				    }
				}
				xhr.send();
			}, 1000);
		} else {
			alert('Request failed. Returned status of ' + request.status);
		}
	};
	request.send(data);
}