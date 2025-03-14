const { Model, DataTypes } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  usersQuantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
};

class Category extends Model {
  static associate(models) {
    // Una categoría tiene muchas preguntas
    this.hasMany(models.Question, {
      foreignKey: 'categoryId',
      as: 'questions',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false,
    };
  }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };
