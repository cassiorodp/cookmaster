const Joi = require('joi');
const recipesModel = require('../models/recipes');
const { badRequest } = require('../utils/dictionary');
const errorConstructor = require('../utils/errorConstructor');

const recipeSchema = Joi.object({
  userId: Joi.required(),
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const create = async (userId, name, ingredients, preparation) => {
  const { error } = recipeSchema.validate({ userId, name, ingredients, preparation });
  
  if (error) throw errorConstructor(badRequest, 'Invalid entries. Try again.');

  const id = await recipesModel.create(userId, name, ingredients, preparation);

  const recipe = {
    name,
    ingredients,
    preparation,
    userId,
    _id: id,
  };

  return { recipe };
};

const getAll = async () => {
  const recipes = await recipesModel.getAll();

  return recipes;
};

module.exports = {
  create,
  getAll,
};
