const firebase = require('../db');

var collection = firebase.collection('avengers');
var avenger = collection.doc();

module.exports = {
	collection : collection,
	avenger: avenger
};