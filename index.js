const express = require('express');
const app = express();
const port = 8080;

const router = require('./router');

app.use('/', router);

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});