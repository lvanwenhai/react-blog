'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nickName: {
        type: Sequelize.STRING
      },
      avatarImg: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.INTEGER
      },
      parent: {
        type: Sequelize.INTEGER
      },
      byAiteName: {
        type: Sequelize.STRING
      },
      isPass: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
      relateBlogId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Comments');
  }
};