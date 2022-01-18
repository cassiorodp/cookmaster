const express = require('express');
const validateJWT = require('../../auth/validateJWT');
const { create, getAll, findById } = require('../../controllers/recipes');

const recipesRouter = express.Router();

recipesRouter.post('/', validateJWT, create);
recipesRouter.get('/', getAll);
recipesRouter.get('/:id', findById);

module.exports = recipesRouter;
