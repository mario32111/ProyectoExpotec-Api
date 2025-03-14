const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().min(3).max(50);
const usersQuantity = Joi.number().integer().min(0);

const createCategorySchema = Joi.object({
  name: name.required(),
  usersQuantity: usersQuantity.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
  usersQuantity: usersQuantity,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema };
