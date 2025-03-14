const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const CategoryService = require('../services/category.service');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/category.schema');

const service = new CategoryService();
const router = express.Router();

// ... (otros endpoints)

// Endpoint para sumar uno a usersQuantity de una categoría
router.patch('/:id/incrementUsers',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const updatedCategory = await service.incrementUsersQuantity(req.params.id);
      res.json(updatedCategory);
    } catch (error) {
      next(error); // Pasa el error al middleware de manejo de errores
    }
  }
);

router.get('/users-quantity', async (req, res, next) => {
  try {
    const usersQuantityByCategory = await service.getUsersQuantityByCategory();
    res.json(usersQuantityByCategory);
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
});


module.exports = router;
