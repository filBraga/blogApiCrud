const { Aaaa } = require('../models');

const create = async (nome) => {
  const newAaaa = await Aaaa.create({ nome });

  return newAaaa;
};

const getAll = async () => {
  const bbbbb = await Aaaa.findAll();

  return bbbbb;
};

const remove = async (id) => {
  await Aaaa.destroy({
    where: { id },
  });
  return true;
};

const edit = async (id, name, description) => {
  await Aaaa.update({ id, name, description }, { where: { id } });
  return true;
};

module.exports = {
  getAll,
  create,
  remove,
  edit,
};
