const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = require('./api');
const routes = require('./routes');
const validateUser = require('./database/middlewares/usersMiddleware');
// const validatePost = require('./database/middlewares/validatePost');
const authToken = require('./database/middlewares/authToken');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;
// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

// Filipe:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const apiRoutes = express.Router();

apiRoutes.post('/login', routes.login);

apiRoutes.post('/categories', authToken, routes.createCategory);
apiRoutes.get('/categories', authToken, routes.getCategories);

apiRoutes.post('/user', validateUser, routes.createUser);
apiRoutes.get('/user', authToken, routes.getUsers);
apiRoutes.get('/user/:id', authToken, routes.getUsersById);

apiRoutes.post('/post', authToken, routes.createPost);

app.use(apiRoutes);
app.listen(port, () => console.log('ouvindo porta', port));
