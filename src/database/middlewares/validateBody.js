const { Category } = require('../models');

const isValidPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }

  const allCategories = await Category.findAll();
  const allCategoriesId = allCategories.map((elem) => elem.dataValues.id);
  const containsAll = categoryIds.every((id) => allCategoriesId.includes(id));

  if (containsAll === false) {
    return res
      .status(400)
      .json({ message: '"categoryIds" not found' });
  }

  next();
};

module.exports = {
  isValidPost,
};