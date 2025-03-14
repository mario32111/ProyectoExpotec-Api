'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('options', 'isCorrect', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Puedes poner el valor por defecto como false si es necesario
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('options', 'isCorrect');
  },
};
