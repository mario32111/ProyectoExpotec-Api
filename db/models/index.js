const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize)); // Usa Product.init aquí
}

module.exports = setupModels;
