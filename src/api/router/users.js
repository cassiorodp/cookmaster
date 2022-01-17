const express = require('express');
const { create } = require('../../controllers/users');

const usersRouter = express.Router();

usersRouter.post('/', create);

module.exports = usersRouter;
