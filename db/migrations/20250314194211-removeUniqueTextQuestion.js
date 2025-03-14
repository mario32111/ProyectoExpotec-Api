'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remueve la restricción 'unique' del campo 'text' de la tabla 'options'
    await queryInterface.changeColumn('options' , 'text', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Vuelve a agregar la restricción 'unique' al campo 'text' de la tabla 'options'
    await queryInterface.changeColumn('options', 'text', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  }
};
