const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoryService {
  // ... (otros métodos)

  async incrementUsersQuantity(id) {
    const category = await this.findOne(id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    category.usersQuantity += 1;
    await category.save();
    return category;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async getUsersQuantityByCategory() {
    try {
      const categories = await models.Category.findAll({
        attributes: ['id', 'name', 'usersQuantity'], // Selecciona solo los atributos necesarios
      });
      return categories;
    } catch (error) {
      throw boom.internal('Error al obtener la cantidad de usuarios por categoría');
    }
  }

}

module.exports = CategoryService;
