const AvengerModel = require('../models/avengerModel');
const Constants = require('../constants');
const controller = {};

// GET AVENGERS
controller.getAvengers = (req, res) => {
	let collection = AvengerModel.get()
		.then((querySnapshot) => {
			if (!querySnapshot.empty) {
				let data = querySnapshot.docs.map((documentSnapshot) => {
					let docSnapshot = documentSnapshot.data();
					let docId = documentSnapshot.id;
					docSnapshot.id = docId;

					return docSnapshot;
				});

				res.render('../views/index', {avengers: data});
			} else {
				res.send(Constants.messages.noRecordsFound);
			}
		})
		.catch((error) => {
			res.send(Constants.messages.cannotGetRecords + error);
		});
};

// GET AVENGER BY ID
controller.getAvenger = (req, res) => {
	let id = req.params.id;
	let avenger = AvengerModel.doc(id);
	avenger.get().then((documentSnapshot) => {
		if (documentSnapshot.exists) {
			let data = documentSnapshot.data();
			let docId = documentSnapshot.id;
			data.id = docId;
			
			res.render('../views/form', {avenger: data});
		} else {
			res.send(Constants.messages.recordDoesNotExist);
		}
	})
	.catch((error) => {
		res.send(Constants.messages.cannotGetRecords + error);
	});	
};

// CREATE AVENGER
controller.addAvenger = (req, res) => {
	let avenger = AvengerModel.doc();

	req.body.created = new Date();
	avenger.set(req.body)
		.then(() => res.send(Constants.messages.recordAdded))
		.catch((error) => res.send(Constants.messages.cannotAddRecord + error));
};

// UPDATE AVENGER
controller.updateAvenger = (req, res) => {
	let id = req.body.id;
	let avenger = AvengerModel.doc(id);
	delete req.body.id;

	avenger.update(req.body)
		.then(() => res.send(Constants.messages.recordUpdated))
		.catch((error) => res.send(Constants.messages.cannotUpdateRecord + error));
};

// REMOVE AVENGER
controller.removeAvenger = (req, res) => {
	let id = req.params.id;
	let avenger = AvengerModel.doc(id);

	avenger.delete()
		.then(() => res.send(Constants.messages.recordRemoved))
		.catch((error) => res.send(Constants.messages.cannotRemoveRecord + error));
};

// SANITIZE INPUT FIELDS AND REMOVE THOSE WHICH DO NOT PASS THE SANITIZATION
controller.sanitizeFields = (req, res, next) => {
	for(let prop in req.body) {
		req.body[prop] = req.sanitize(req.body[prop]);
		if (!req.body[prop].length) {
			delete req.body[prop];
		}
	}

	next();
};

// VALIDATE FIELDS IN REQUEST BODY
controller.validateFields = (req, res, next) => {
	let requiredKeys = ['email', 'givenName', 'familyName'];
	
	// When we update a record, we need the id
	if (req.body.hasOwnProperty('id')) {
		requiredKeys.push('id');
	}

	let hasRequiredKeys = requiredKeys.every((k) => { return req.body.hasOwnProperty(k)	});
	let reqBodyKeysLength = Object.keys(req.body).length;

	if (hasRequiredKeys && reqBodyKeysLength === requiredKeys.length) {
		next();
	} else {
		res.status(400).send(Constants.messages.validationError);
	}
};

// RENDER ADD/EDIT FORM
controller.form = (req, res) => {
	res.render('../views/form', {avenger : {}});
};

module.exports = controller;