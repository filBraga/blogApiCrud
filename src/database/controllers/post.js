const { BlogPost } = require('../models');
const { Category } = require('../models');
const { PostCategory } = require('../models');

const validateBody = (body, res) => {
  const { title, content, categoryIds } = body;
  if (!title || !content || !categoryIds) {
    res
      .status(400)
      .json({ message: 'Some required fields are missing' });
    return false;
  }
  return true;
};

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    if (!validateBody(req.body, res)) return;
    const category = await Category.findOne({ where: { id: categoryIds } });
    if (!category) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
    await BlogPost.create({ title, content });
    const userId = 1;
    const { id, updated, published } = await BlogPost.findOne({ where: { title } });
    const data = categoryIds.map((elem) => ({ postId: id, categoryId: elem }));
    await PostCategory.bulkCreate(data);
    const blogPostRes = { id, title, content, userId, updated, published };
    return res.status(201).json(blogPostRes);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid fields', error: err.message });
  }
};

// const getPosts = async (req, res) => {
//   try {
//     const posts = await Post.findAll({
//       attributes: {
//           exclude: ['password'],
//       },
//   });
//     return res.status(200).json(posts);
//   } catch (err) {
//     return res.status(400).json({ message: 'Expired or invalid token' });
//   }
// };

// const getPostsById = async (req, res) => {
//   try {
//     const PostId = req.params.id;
//     const post = await Post.findOne({
//       where: { id: PostId },
//       attributes: {
//         exclude: ['password'],
//       },
//     });
//     if (post) {
//       return res.status(200).json(post);
//     }
//     return res.status(404).json({
//       message: 'Post does not exist',
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message });
//   }
// };

module.exports = {
  createPost,
  // getPosts,
  // getPostsById,
}; 