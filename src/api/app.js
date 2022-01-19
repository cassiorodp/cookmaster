const bodyParser = require('body-parser');
const express = require('express');
const router = require('./router');
const errorHandler = require('../middlewares/errorHandler');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(express.static(`${__dirname}/../uploads`));
app.use(bodyParser.json());
app.use(router);
app.use(errorHandler);

module.exports = app;
