const express = require('express');
const router = express.Router();
const controller = require('./controllers/avengerController');

// READ
router.get('/', (req, res) => res.redirect('/avengers'));

// READ
router.get('/avengers', controller.getAvengers);

// READ BY ID
router.get('/avengers/:id', controller.getAvenger);

// CREATE
router.post('/avengers', controller.validateFields, controller.addAvenger);

// UPDATE
router.put('/avengers', controller.updateAvenger);

// DELETE
router.delete('/avengers', controller.removeAvenger);

router.get('/form', controller.form);

module.exports = router;