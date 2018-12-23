const firebase = require('../database/db');
const collection = firebase.collection('avengers');
let avenger = collection.doc();

module.exports = { collection, avenger };