const Joi = require('joi');

const id = Joi.number().integer().positive();
const categoryId = Joi.number().integer().positive();
const text = Joi.string().min(5).max(255);
const image = Joi.string().uri(); // Asumimos que la imagen es una URL válida

const createQuestionSchema = Joi.object({
  categoryId: categoryId.required(),
  text: text.required(),
  image: image.optional(), // La imagen puede ser opcional
});

const updateQuestionSchema = Joi.object({
  categoryId: categoryId,
  text: text,
  image: image,
});

const getQuestionSchema = Joi.object({
  id: id.required(),
});

module.exports = { createQuestionSchema, updateQuestionSchema, getQuestionSchema };
