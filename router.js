const express = require('express');
const router = express.Router();
const controller = require('./controllers/avengerController');

// READ
router.get('/', (req, res) => redirect('/avengers'));

// READ
router.get('/avengers', controller.getAvengers);

// READ BY ID

// CREATE
router.post('/avengers', controller.addAvenger);

// UPDATE
// router.post('/avengers/', (req, res) => res.send('hi, there!'));

// DELETE
// router.get('/avengers', (req, res) => res.send('hi, there!'));

module.exports = router;