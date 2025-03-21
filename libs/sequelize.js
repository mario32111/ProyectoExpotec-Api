const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: config.env === 'production' ? false : console.log,
  dialectOptions: {
    ssl: {
      require: true, // Habilita SSL
      rejectUnauthorized: false, // Ignora errores de certificado autofirmado
    },
  },
});

setupModels(sequelize);

module.exports = sequelize;
