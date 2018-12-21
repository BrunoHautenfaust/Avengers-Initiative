const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.redirect('/avengers'));

router.get('/avengers', (req, res) => res.send('hi, there!'));

module.exports = router;