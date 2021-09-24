'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      coin_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DataTypes.FLOAT,
        defaultValue: false,
        allowNull: false
      },
      market_cap: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: false,
        allowNull: false
      },
      change: {
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

  down: async (queryInterface, Sequelize) => { await queryInterface.dropTable('prices'); }
};
