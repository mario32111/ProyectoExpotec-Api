const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const CategoryService = require('../services/category.service');
const { updateCategoriesSchema } = require('../schemas/category.schema');

const service = new CategoryService();
const router = express.Router();

// Endpoint para incrementar `usersQuantity`
router.patch('/incrementUsers',
  validatorHandler(updateCategoriesSchema, 'body'),
  async (req, res, next) => {
    try {
      const { ids } = req.body;

      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'Debe proporcionar una lista de ids.' });
      }

      const updatedCategories = [];
      for (const id of ids) {
        const updatedCategory = await service.incrementUsersQuantity(id);
        updatedCategories.push(updatedCategory);
      }

      // Obtener todas las categorías actualizadas y enviarlas a los clientes
      const categories = await service.getUsersQuantityByCategory();

      console.log("📢 Emitiendo evento actualizarCategorias:", categories);
      req.io.emit("actualizarCategorias", categories);

      res.json(updatedCategories);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/users-quantity', async (req, res, next) => {
  try {
    const usersQuantityByCategory = await service.getUsersQuantityByCategory();
    res.json(usersQuantityByCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
