'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('watch_list', {
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
      min_price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      max_price: {
        type: Sequelize.FLOAT,
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

  down: async (queryInterface, Sequelize) => {
    async (queryInterface, Sequelize) => { await queryInterface.dropTable('watch_list'); }
  }
};
