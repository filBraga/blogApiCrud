const { BlogPost, PostCategory } = require('../models');
const getUserIdWithToken = require('../utils/getUserId');

const create = async (token, title, content, categoryIds) => {
  const userId = await getUserIdWithToken(token);

  const newPost = await BlogPost.create({
    title,
    content,
    userId,
    // published,
    // updated,
  });

  const postId = newPost.id;

  const data = categoryIds.map((elem) => ({ postId, categoryId: elem })); 
  await PostCategory.bulkCreate(data);

  return newPost;
};

// const getAll = async () => {
//   const posts = await BlogPost.findAll();
//   return posts;
// };

// const remove = async (id) => {
//   await BlogPost.destroy({
//     where: { id },
//   });
//   return true;
// };

// const edit = async (id, name, description) => {
//   await BlogPost.update({ id, name, description }, { where: { id } });
//   return true;
// };

module.exports = {
  create,
};
