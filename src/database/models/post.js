const Post = (sequelize, DataTypes) => {

  const Post =  sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    updated: DataTypes.STRING,
    published: DataTypes.STRING
	}, {
		timestamps: false
	});

  // Post.associate = (models) => {
	// 	Post.hasMany(models.BlogPost, {foreignKey: 'id',  as: 'BlogPost' });
	// };

  return Post;
};

module.exports = Post;