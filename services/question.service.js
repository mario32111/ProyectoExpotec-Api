const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class QuestionService {
  // Obtener todas las preguntas
  async find() {
    const questions = await models.Question.findAll({
      include: ['category', 'options'],
    });
    return questions;
  }

  // Crear una nueva pregunta
  async create(data) {
    const newQuestion = await models.Question.create(data);
    return newQuestion;
  }

  // Obtener una pregunta por ID
  async findOne(id) {
    const question = await models.Question.findByPk(id, {
      include: ['category', 'options'],
    });
    if (!question) {
      throw boom.notFound('Question not found');
    }
    return question;
  }

  // Actualizar una pregunta
  async update(id, changes) {
    const question = await this.findOne(id);
    const updatedQuestion = await question.update(changes);
    return updatedQuestion;
  }

  // Eliminar una pregunta
  async delete(id) {
    const question = await this.findOne(id);
    await question.destroy();
    return { id };
  }
}

module.exports = QuestionService;
