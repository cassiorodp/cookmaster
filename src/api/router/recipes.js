const express = require('express');
const validateJWT = require('../../auth/validateJWT');
const { create, getAll, findById, update, deleteById } = require('../../controllers/recipes');

const recipesRouter = express.Router();

recipesRouter.post('/', validateJWT, create);
recipesRouter.get('/', getAll);
recipesRouter.get('/:id', findById);
recipesRouter.put('/:id', validateJWT, update);
recipesRouter.delete('/:id', validateJWT, deleteById);

module.exports = recipesRouter;
