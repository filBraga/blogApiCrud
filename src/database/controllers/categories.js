const { Category } = require('../models');

const validateBody = (body, res) => {
  const { name } = body;
  if (!name) {
    res
      .status(400)
      .json({ message: '"name" is required' });
    return false;
  }
  return true;
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!validateBody(req.body, res)) return;

    const categoryInDb = await Category.findOne({ where: { name } });

    // check if exist category
    if (categoryInDb !== null) {
      return res.status(409).json({ message: 'Category already registered' });
    }
    // Creating on db
    await Category.create({ name });

    const categoryInDbWithId = await Category.findOne({ where: { name } });

    return res.status(201).json(categoryInDbWithId);
  } catch (err) {
    return res.status(400).json({ message: 'Invalid fields', error: err.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(400).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  createCategory,
  getCategories,
}; 