const Joi = require('joi');

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().required(),
});

const validateUser = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (!error) return next();

  // console.log(error.details[0].type);
  return res.status(400).json({ message: error.details[0].message });
};

module.exports = validateUser; 