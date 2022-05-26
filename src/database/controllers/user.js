const { User } = require('../models');
const generateToken = require('../utils/generateJWT');

const validateBody = (body, res) => {
  const { displayName, email, password, image } = body;
  if (!displayName || !email || !password || !image) {
    res
      .status(400)
      .json({ message: 'Some required fields are missing' });
    return false;
  }
  return true;
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    if (!validateBody(req.body, res)) return;

    const user = await User.findOne({ where: { email } });
    // check if exist user
    if (user !== null) {
      return res.status(409).json({ message: 'User already registered' });
    }
    // removing password from token
    const userData = req.body;
    const { password: passDB, ...userWithoutPass } = userData;
    const token = generateToken(userWithoutPass);
    // Creating on db
    await User.create({ displayName, email, password, image });

    return res.status(201).json({ token });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid fields', error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
          exclude: ['password'],
      },
  });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  createUser,
  getUsers,
}; 