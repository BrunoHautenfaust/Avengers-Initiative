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

// ADD AN AVENGER
controller.addAvenger = (req, res) => {
	let avenger = AvengerModel.avenger;

	let data = {
		email: req.body.email,
		givenName: req.body.givenName,
		familyName: req.body.familyName,
		created: new Date()
	};
	// console.log(data.created);
	avenger.set(data)
		.then(() => console.log('Document written to DB'))
		.catch((error) => console.error('Error adding document: ', error));
	res.end();
};

module.exports = controller;