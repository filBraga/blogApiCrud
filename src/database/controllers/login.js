const { User } = require('../models');
const generateToken = require('../utils/generateJWT');

const validateBody = (body, res) => {
  const { email, password } = body;
  if (!email || !password) {
    res
      .status(400)
      .json({ message: 'Some required fields are missing' }); 
    return false;
  }
  return true;
};

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateBody(req.body, res)) return;

    const user = await User.findOne({ where: { email } });
    const userData = user.dataValues;

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    // console.log('USER:', userData);
    const { password: passDB, ...userWithoutPass } = userData;
    const token = generateToken(userWithoutPass);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid fields', error: err.message });
  }
};