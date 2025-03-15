const Joi = require('joi');

const id = Joi.number().integer().positive(); // Validación de id
const name = Joi.string().min(3).max(50); // Nombre de la categoría
const usersQuantity = Joi.number().integer().min(0); // Cantidad de usuarios

// Esquema para crear categorías
const createCategorySchema = Joi.object({
  name: name.required(),
  usersQuantity: usersQuantity.required(),
});

// Esquema para actualizar categorías
const updateCategorySchema = Joi.object({
  name: name,
  usersQuantity: usersQuantity,
});

// Esquema para obtener una categoría
const getCategorySchema = Joi.object({
  id: id.required(),
});

// Esquema para actualizar múltiples categorías (este es el que usas en tu ruta)
const updateCategoriesSchema = Joi.object({
  ids: Joi.array().items(Joi.number().integer().positive().required()).required(), // Validación de ids
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema, updateCategoriesSchema };
