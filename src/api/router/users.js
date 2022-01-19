const express = require('express');
const validateJWT = require('../../auth/validateJWT');
const { createUser, createAdmin } = require('../../controllers/users');

const usersRouter = express.Router();

usersRouter.post('/', createUser);
usersRouter.post('/admin', validateJWT, createAdmin);

module.exports = usersRouter;
