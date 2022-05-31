const postServices = require('../services/postService');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const token = req.headers.authorization;

    const newPost = await postServices.create(token, title, content, categoryIds);

    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid fields', error: err.message });
  }
};

module.exports = {
  createPost,
}; 