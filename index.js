const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('hi, there!'));

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});