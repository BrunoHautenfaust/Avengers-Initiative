const AvengerModel = require('../models/avengerModel');
const controller = {};

// GET AVENGERS
controller.getAvengers = (req, res) => {
	let collection = AvengerModel.collection.get()
		.then((querySnapshot) => {
			if (!querySnapshot.empty) {
				let data = querySnapshot.docs.map((documentSnapshot) => documentSnapshot.data());
				res.send(data);
			} else {
				res.send('No records found');
			}
		})
		.catch((error) => {
			res.send('Unable to get records: ', error);
		});
};

// GET AVENGER BY ID
controller.getAvenger = (req, res) => {
	let id = req.params.id;
	let avenger = AvengerModel.collection.doc(id);
	avenger.get().then((documentSnapshot) => {
		if (documentSnapshot.exists) {
			let data = documentSnapshot.data();
			res.send(data);
		} else {
			res.send('Avenger with id: ' + id + ' does not exists');
		}
	})
	.catch((error) => {
		res.send('Unable to get record:', error);
	});
};

// CREATE AVENGER
controller.addAvenger = (req, res) => {
	let avenger = AvengerModel.avenger;
	req.body.created = new Date();

	avenger.set(req.body)
		.then(() => res.send('Avenger added to DB'))
		.catch((error) => res.send('Cannot add avenger: ', error));
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

// VALIDATE FIELDS IN REQUEST BODY
// Use only when there is no interface that can enforce the fields which we regard as required
controller.validateFields = (req, res, next) => {
	let requiredKeys = ['email', 'givenName', 'familyName'];
	let hasRequiredKeys = requiredKeys.every((k) => { return req.body.hasOwnProperty(k); });
	let reqBodyKeysLength = Object.keys(req.body).length;

	if (hasRequiredKeys && reqBodyKeysLength === requiredKeys.length) {
		next();
	} else {
		res.send('One or more of the fields are incorrect');
	}
};

module.exports = controller;