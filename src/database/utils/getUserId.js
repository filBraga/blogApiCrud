const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const { User } = require('../models');

const getUserIdWithToken = async (token) => {
  const { data: { email } } = jwt.verify(token, JWT_SECRET);

  const user = await User.findOne({ where: { email } });

  return user.dataValues.id;
};

module.exports = getUserIdWithToken;