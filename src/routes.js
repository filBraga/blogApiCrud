const login = require('./database/controllers/login');
const { createUser, getUsers } = require('./database/controllers/user');

module.exports = {
  login,
  createUser,
  getUsers,
};