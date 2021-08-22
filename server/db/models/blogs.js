'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Blogs.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.TEXT,
    imgUrl: DataTypes.STRING,
    author: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    msgs: DataTypes.INTEGER,
    views: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Blogs',
  });
  return Blogs;
};