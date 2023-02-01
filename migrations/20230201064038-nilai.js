'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nilai', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_mahasiswa: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_matakuliah: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nilai: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nilai');
  }
};
