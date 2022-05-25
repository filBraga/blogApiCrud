const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = require('./api');
const routes = require('./routes');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3001;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

// Filipe:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const apiRoutes = express.Router();

apiRoutes.post('/login', routes.login);

app.use(apiRoutes);

app.listen(port, () => console.log('ouvindo porta', port));
