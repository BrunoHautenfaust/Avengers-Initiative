const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');
const Constants = require('../constants');

firebase.initializeApp({
  apiKey: Constants.dbConfig.apiKey,
  authDomain: Constants.dbConfig.authDomain,
  projectId: Constants.dbConfig.projectId
});

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

module.exports = db;



