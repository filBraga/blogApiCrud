const Category = (sequelize, DataTypes) => {
  const Category =  sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING
  }, {
		timestamps: false
	});

  return Category;
};

module.exports = Category;