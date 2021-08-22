'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Messages.init({
    nickName: DataTypes.STRING,
    avatarImg: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    parent: DataTypes.INTEGER,
    byAiteName: DataTypes.STRING,
    isPass: DataTypes.BOOLEAN,
    ip:DataTypes.STRING,
    city: DataTypes.STRING,
    navigator: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Messages',
  });
  return Messages;
};