const Joi = require('joi');

const id = Joi.number().integer().positive();
const questionId = Joi.number().integer().positive();
const text = Joi.string().min(1).max(255);

const createOptionSchema = Joi.object({
  questionId: questionId.required(),
  text: text.required(),
});

const updateOptionSchema = Joi.object({
  questionId: questionId,
  text: text,
});

const getOptionSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOptionSchema, updateOptionSchema, getOptionSchema };
