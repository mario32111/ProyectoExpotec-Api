"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Eliminar la restricción UNIQUE de la columna `image`
    await queryInterface.removeConstraint("questions", "questions_image_key");
  },

  down: async (queryInterface, Sequelize) => {
    // Agregar la restricción UNIQUE a la columna `image`
    await queryInterface.addConstraint("questions", {
      fields: ["image"], // Columna a la que se aplicará la restricción
      type: "unique",    // Tipo de restricción (UNIQUE)
      name: "questions_image_key", // Nombre de la restricción
    });
  },
};
