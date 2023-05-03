'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(320), // username@hostname 255 chars for username, 64 chars for hostname + 1 for '@'
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(1024),
        allowNull: false,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        }
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};