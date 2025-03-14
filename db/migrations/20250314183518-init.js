'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Crear la tabla `categories`
    await queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      usersQuantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });

    // 2. Crear la tabla `questions`
    await queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categoryId: {
        field: 'category_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'categories', // Nombre de la tabla referenciada
          key: 'id',           // Columna referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      image: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true,
      },
    });

    // 3. Crear la tabla `options`
    await queryInterface.createTable('options', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      questionId: {
        field: 'question_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'questions', // Nombre de la tabla referenciada
          key: 'id',          // Columna referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // 1. Eliminar la tabla `options` (primero, porque depende de `questions`)
    await queryInterface.dropTable('options');

    // 2. Eliminar la tabla `questions` (segundo, porque depende de `categories`)
    await queryInterface.dropTable('questions');

    // 3. Eliminar la tabla `categories` (último, porque es independiente)
    await queryInterface.dropTable('categories');
  },
};
