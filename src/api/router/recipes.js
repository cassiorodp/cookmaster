const express = require('express');
const validateJWT = require('../../auth/validateJWT');
const {
  create,
  getAll,
  findById,
  update,
  deleteById,
  uploadImage,
} = require('../../controllers/recipes');
const upload = require('../../middlewares/uploadImage');

const recipesRouter = express.Router();

recipesRouter.post('/', validateJWT, create);
recipesRouter.get('/', getAll);
recipesRouter.get('/:id', findById);
recipesRouter.put('/:id', validateJWT, update);
recipesRouter.put('/:id/image', validateJWT, uploadImage, upload.single('image'));
recipesRouter.delete('/:id', validateJWT, deleteById);

module.exports = recipesRouter;
