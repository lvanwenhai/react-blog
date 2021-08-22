'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Statistics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      currentTime: {
        type: Sequelize.STRING
      },
      blogTotal: {
        type: Sequelize.INTEGER
      },
      messageTotal: {
        type: Sequelize.INTEGER
      },
      commentTotal: {
        type: Sequelize.INTEGER
      },
      pvTotal: {
        type: Sequelize.INTEGER
      },
      currentVisitors: {
        type: Sequelize.INTEGER
      },
      whichVisitor: {
        type: Sequelize.INTEGER
      },
      ip: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      navigator: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Statistics');
  }
};