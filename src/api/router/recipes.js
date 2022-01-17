const express = require('express');
const validateJWT = require('../../auth/validateJWT');
const { create } = require('../../controllers/recipes');

const recipesRouter = express.Router();

recipesRouter.post('/', validateJWT, create);

module.exports = recipesRouter;
