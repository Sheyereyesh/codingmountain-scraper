'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('coins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: false,
        allowNull: false
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: false,
        allowNull: false
      },
      code: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: false,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => { await queryInterface.dropTable('coins'); }
};
