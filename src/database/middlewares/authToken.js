const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const authToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    const userIsValid = await User.findOne({ where: { email: decoded.data.email } });
    
    if (!userIsValid) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = authToken;