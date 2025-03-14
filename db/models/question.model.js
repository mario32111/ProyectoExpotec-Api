const { Model, DataTypes } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');

const QUESTION_TABLE = 'questions';

const QuestionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  text: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true,
  },
};

class Question extends Model {
  static associate(models) {
    // Una pregunta pertenece a una categoría
    this.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });

    // Una pregunta tiene muchas opciones
    this.hasMany(models.Option, {
      foreignKey: 'questionId',
      as: 'options',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: QUESTION_TABLE,
      modelName: 'Question',
      timestamps: false,
    };
  }
}

module.exports = { QUESTION_TABLE, QuestionSchema, Question };
