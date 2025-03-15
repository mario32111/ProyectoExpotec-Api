const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoryService {
  async incrementUsersQuantity(id) {
    const category = await this.findOne(id);
    if (!category) {
      throw boom.notFound('Categoría no encontrada');
    }
    category.usersQuantity += 1;
    await category.save();
    return category;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound('Categoría no encontrada');
    }
    return category;
  }

  async getUsersQuantityByCategory() {
    try {
      return await models.Category.findAll({
        attributes: ['id', 'name', 'usersQuantity'],
      });
    } catch (error) {
      throw boom.internal('Error al obtener las categorías');
    }
  }
}

module.exports = CategoryService;
