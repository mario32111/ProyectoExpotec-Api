const { ValidationError } = require('sequelize');
const boom = require('@hapi/boom');
const { func } = require('joi');
function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
};

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    //el stack permite saber donde sucedio el error
    stack: err.stack,
  });
};

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }else{
    next(err);
  }
};

function ormErrorHandler (err, req, res, next) {
  if(err instanceof ValidationError){
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };

