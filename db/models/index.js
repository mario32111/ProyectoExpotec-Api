const { Category, CategorySchema } = require('./category.model');
const { Question, QuestionSchema } = require('./question.model');
const { Option, OptionSchema } = require('./option.model');


function setupModels(sequelize) {
  Category.init(CategorySchema, Category.config(sequelize));
  Question.init(QuestionSchema, Question.config(sequelize));
  Option.init(OptionSchema, Option.config(sequelize));

  // También hay que correr las asociaciones y enviarle los modelos
  Category.associate(sequelize.models);
  Question.associate(sequelize.models);
  Option.associate(sequelize.models);
}

module.exports = setupModels;
