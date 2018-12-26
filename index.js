const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router');
const port = 8080;


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});