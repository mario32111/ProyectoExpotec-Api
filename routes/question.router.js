const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const QuestionService = require('../services/question.service');
const { createQuestionSchema, updateQuestionSchema, getQuestionSchema } = require('../schemas/question.schema');

const service = new QuestionService();
const router = express.Router();

// Obtener todas las preguntas
router.get('/', async (req, res) => {
  try {
    const questions = await service.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear una nueva pregunta
router.post('/',
  validatorHandler(createQuestionSchema, 'body'),
  async (req, res) => {
    try {
      const newQuestion = await service.create(req.body);
      res.status(201).json(newQuestion);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Endpoint para obtener una pregunta aleatoria por cada categoría
router.get('/random-by-category', async (req, res) => {
  try {
    const categories = [1, 2, 3, 4, 5]; // IDs de las categorías
    const randomQuestions = [];

    for (const categoryId of categories) {
      const randomQuestion = await getRandomQuestionByCategory(categoryId);
      if (randomQuestion) {
        randomQuestions.push(randomQuestion);
      }
    }

    if (randomQuestions.length === 0) {
      return res.status(404).json({ message: 'No se encontraron preguntas para las categorías' });
    }

    res.json(randomQuestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una pregunta por ID
router.get('/:id',
  validatorHandler(getQuestionSchema, 'params'),
  async (req, res) => {
    try {
      const question = await service.findOne(req.params.id);
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Actualizar una pregunta
router.put('/:id',
  validatorHandler(getQuestionSchema, 'params'),
  validatorHandler(updateQuestionSchema, 'body'),
  async (req, res) => {
    try {
      const updatedQuestion = await service.update(req.params.id, req.body);
      res.json(updatedQuestion);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Eliminar una pregunta
router.delete('/:id',
  validatorHandler(getQuestionSchema, 'params'),
  async (req, res) => {
    try {
      await service.delete(req.params.id);
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Función para obtener una pregunta aleatoria por categoría
async function getRandomQuestionByCategory(categoryId) {
  try {
    const questionsInCategory = await service.findByCategory(categoryId);
    if (questionsInCategory.length === 0) return null;
    return questionsInCategory[Math.floor(Math.random() * questionsInCategory.length)];
  } catch (error) {
    throw new Error(`Error al obtener preguntas de la categoría ${categoryId}: ${error.message}`);
  }
}

module.exports = router;
