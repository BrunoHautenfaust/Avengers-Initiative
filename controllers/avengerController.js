var AvengerModel = require('../models/avengerModel');
var controller = {};

// GET AVENGERS
controller.getAvengers = (req, res) => {
	let collection = AvengerModel.collection.get()
		.then((querySnapshot) => {
			var data = querySnapshot.docs.map((documentSnapshot) => documentSnapshot.data());
			res.send(data);
		})
		.catch((error) => {
			console.error('Unable to get records: ', error);
			res.end();
		});
};

// ADD AVENGER
controller.addAvenger = (req, res) => {
	let avenger = AvengerModel.avenger;
	req.body.created = new Date();

	avenger.set(req.body)
		.then(() => res.send('Avenger added to DB'))
		.catch((error) => res.send('Cannot add avenger: ', error));
	res.end();
};

// UPDATE AVENGER
controller.updateAvenger = (req, res) => {
	let id = req.body.id;
	let avenger = AvengerModel.collection.doc(id);
	delete req.body.id;

	avenger.update(req.body)
		.then(() => res.send('Avenger with id: '+ id + ' has been updated'))
		.catch((error) => res.send('Cannot update avenger: ', error));
};

// REMOVE AVENGER
controller.removeAvenger = (req, res) => {
	let id = req.body.id;
	let avenger = AvengerModel.collection.doc(id);

	avenger.delete()
		.then(() => res.send('Avenger with id: '+ id + ' has been removed'))
		.catch((error) => res.send('Cannot remove avenger: ', error));
};

// VALIDATE FIELDS IN REQUEST BODY.
// Use only when there is no interface that can enforce the fields which we regard as required
controller.validateFields = (req, res, next) => {
	let keys = ['email', 'givenName', 'familyName'];
	let hasRequiredKeys = keys.every((k) => {
		return req.body.hasOwnProperty(k);
	});

	if (hasRequiredKeys) {
		next();
	} else {
		res.send('One or more of the fields are incorrect');
	}
};

module.exports = controller;