const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class QuestionService {
  // Obtener todas las preguntas
  async find() {
    try {
      const questions = await models.Question.findAll({
        include: ['category', 'options'],
      });
      return questions;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw new Error('Error al obtener las preguntas');
    }
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
  async findByCategory(categoryId) {
    try {
      const questionsInCategory = await models.Question.findAll({
        where: { categoryId }, // Filtra por categoría
        include: ['category', 'options'], // Incluye relaciones si es necesario
      });

      if (questionsInCategory.length === 0) {
        throw new Error(`No se encontraron preguntas para la categoría ${categoryId}`);
      }

      return questionsInCategory;
    } catch (error) {
      throw new Error(`Error al buscar preguntas por categoría: ${error.message}`);
    }
  }
}

module.exports = QuestionService;
