const express = require('express');
const validateJWT = require('../../auth/validateJWT');
const { create, getAll } = require('../../controllers/recipes');

const recipesRouter = express.Router();

recipesRouter.post('/', validateJWT, create);
recipesRouter.get('/', getAll);

module.exports = recipesRouter;
