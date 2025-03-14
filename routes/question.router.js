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

  module.exports = router;
