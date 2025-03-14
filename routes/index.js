const express = require('express');

const questionRouter = require('./question.router');
const categoryRouter = require('./category.router')

function routerApi (app){
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/question', questionRouter);
  router.use('/category', categoryRouter);


}

module.exports = routerApi;
