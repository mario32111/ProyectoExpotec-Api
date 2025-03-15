const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const CategoryService = require('../services/category.service');
const { updateCategoriesSchema } = require('../schemas/category.schema');

const service = new CategoryService();
const router = express.Router();

// ... (otros endpoints)

// Endpoint para sumar uno a usersQuantity de una categoría
router.patch('/incrementUsers',
  validatorHandler(updateCategoriesSchema, 'body'), // Asegúrate de que la validación sea correcta
  async (req, res, next) => {
    try {
      const { ids } = req.body; // Recibimos un array de ids en el cuerpo

      // Validación adicional si no se pasa un array de ids
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'Debe proporcionar una lista de ids.' });
      }

      const updatedCategories = [];
      for (const id of ids) {
        const updatedCategory = await service.incrementUsersQuantity(id); // Se actualiza cada categoría
        updatedCategories.push(updatedCategory);
      }
      res.json(updatedCategories); // Se devuelve la lista de categorías actualizadas
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
