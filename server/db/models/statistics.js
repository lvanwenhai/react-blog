'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Statistics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Statistics.init({
    currentTime: DataTypes.STRING,
    blogTotal: DataTypes.INTEGER,
    messageTotal: DataTypes.INTEGER,
    commentTotal: DataTypes.INTEGER,
    pvTotal: DataTypes.INTEGER,
    currentVisitors: DataTypes.INTEGER,
    whichVisitor: DataTypes.INTEGER,
    ip: DataTypes.STRING,
    city: DataTypes.STRING,
    navigator: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Statistics',
  });
  return Statistics;
};