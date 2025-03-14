const express = require('express');

const questioneRouter = require('./question.router');


function routerApi (app){
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/question', questioneRouter);


}

module.exports = routerApi;
