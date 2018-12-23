const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
const router = require('./router');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});