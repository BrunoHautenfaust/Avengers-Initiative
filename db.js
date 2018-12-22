const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

firebase.initializeApp({
  apiKey: 'AIzaSyCVn1oAM0-Go1yKsvIrZUzr54EV96AQVPk',
  authDomain: 'avengers-initiative-fa89b.firebaseapp.com',
  projectId: 'avengers-initiative-fa89b'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

module.exports = db;



