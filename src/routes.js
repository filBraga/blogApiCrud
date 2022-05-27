const login = require('./database/controllers/login');
const { createCategory, getCategories } = require('./database/controllers/categories');
const { 
  createUser,
  getUsers,
  getUsersById,
} = require('./database/controllers/user');

module.exports = {
  login,
  createCategory,
  getCategories,
  createUser,
  getUsers,
  getUsersById,
};