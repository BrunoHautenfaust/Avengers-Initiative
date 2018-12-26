const AvengerModel = require('../models/avengerModel');
const Constants = require('../constants');
const controller = {};

// GET AVENGERS
controller.getAvengers = (req, res) => {
	let collection = AvengerModel.collection.get()
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

	let avenger = AvengerModel.collection.doc(id);
	avenger.get().then((documentSnapshot) => {
		if (documentSnapshot.exists) {
			let data = documentSnapshot.data();
			res.send(data);
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
	let avenger = AvengerModel.avenger;
	req.body.created = new Date();

	avenger.set(req.body)
		.then(() => res.send(Constants.messages.recordAdded)) // res.redirect('/avengers'))
		.catch((error) => res.send(Constants.messages.cannotAddRecord + error));
};

// UPDATE AVENGER
controller.updateAvenger = (req, res) => {
	let id = req.body.id;
	let avenger = AvengerModel.collection.doc(id);
	delete req.body.id;

	avenger.update(req.body)
		.then(() => res.send(Constants.messages.recordUpdated))
		.catch((error) => res.send(Constants.messages.cannotUpdateRecord + error));
};

// REMOVE AVENGER
controller.removeAvenger = (req, res) => {
	let id = req.body.id;
	let avenger = AvengerModel.collection.doc(id);

	avenger.delete()
		.then(() => res.send(Constants.messages.recordRemoved))
		.catch((error) => res.send(Constants.messages.cannotRemoveRecord + error));
};

// VALIDATE FIELDS IN REQUEST BODY
// Use only when there is no interface that can enforce the fields which we regard as required
controller.validateFields = (req, res, next) => {
	let requiredKeys = ['email', 'givenName', 'familyName'];
	let hasRequiredKeys = requiredKeys.every((k) => { return req.body.hasOwnProperty(k); });
	let reqBodyKeysLength = Object.keys(req.body).length;
console.log(reqBodyKeysLength);
	if (hasRequiredKeys && reqBodyKeysLength === requiredKeys.length) {
		next();
	} else {
		res.send(Constants.messages.validationError);
	}
};

// RENDER ADD FORM
controller.form = (req, res) => {
	res.render('../views/form');
};

module.exports = controller;