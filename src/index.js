const PORT = 4000;
const express = require('express');
const bodyParser = require('body-parser');
const endpoint = require('./UnsingleEndpoint.js');
const app = express();

app.use(bodyParser.json());
app.use('', endpoint);

app.get('/', (req, res) => res.send('Unsingle App is running!'));

app.listen(PORT, () => console.log('Listening on port ' + PORT + '!'));
