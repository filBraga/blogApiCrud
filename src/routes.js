const login = require('./database/controllers/login');
const { createCategory } = require('./database/controllers/categories');
const { 
  createUser,
  getUsers,
  getUsersById,
} = require('./database/controllers/user');

module.exports = {
  login,
  createCategory,
  createUser,
  getUsers,
  getUsersById,
};