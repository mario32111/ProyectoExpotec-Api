const { Model, DataTypes } = require('sequelize');
const { QUESTION_TABLE } = require('./question.model');

const OPTION_TABLE = 'options';

const OptionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  questionId: {
    field: 'question_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: QUESTION_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  text: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  isCorrect: {
    field: 'is_correct',
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Valor por defecto para el campo
  },
};

class Option extends Model {
  static associate(models) {
    // Una opción pertenece a una pregunta
    this.belongsTo(models.Question, {
      foreignKey: 'questionId',
      as: 'question',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: OPTION_TABLE,
      modelName: 'Option',
      timestamps: false,
    };
  }
}

module.exports = { OPTION_TABLE, OptionSchema, Option };
