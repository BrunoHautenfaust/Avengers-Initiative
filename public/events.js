let addButton = document.getElementsByClassName('add')[0];

addButton.addEventListener('click', () => {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'popup');
	xhr.onload = () => {
	    if (xhr.status === 200) {

	        let body = document.getElementsByTagName('body')[0];
	        let form = document.createElement('div');
	        form.innerHTML = xhr.responseText;
	        body.appendChild(form);

	        // form.addEventListener('submit', (e) => {
	        // 	e.preventDefault();
	        // 	let formData = serializeForm(form);
	        // 	sendFormData('post', '/avengers', formData);
	        // });
	    }
	    else {
	        alert('Request failed.  Returned status of ' + xhr.status);
	    }
	};
	xhr.send();
})


function serializeForm(f) {
  let input = f.querySelectorAll('input[type="text"]');
  let fd = {};
  for (let i = 0; i < input.length; i++) {
    fd[input[i].name] = input[i].value;
  }

  return fd = JSON.stringify(fd);
}

function sendFormData(method, url, data) {
	let request = new XMLHttpRequest();
	request.open(method, url);
	request.onload = () => {
		if (request.status === 200) {
			alert(request.responseText);
		} else {
			alert('Request failed.  Returned status of ' + request.status);
		}
	};
	request.send(data);
}