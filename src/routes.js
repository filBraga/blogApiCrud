const login = require('./database/controllers/login');
const { 
  createUser,
  getUsers,
  getUsersById,
} = require('./database/controllers/user');

module.exports = {
  login,
  createUser,
  getUsers,
  getUsersById,
};