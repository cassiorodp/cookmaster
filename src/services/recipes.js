const Joi = require('joi');
const recipesModel = require('../models/recipes');
const { badRequest, notFound } = require('../utils/dictionary');
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

const findById = async (id) => {
  if (id.length < 24) throw errorConstructor(notFound, 'recipe not found');

  const recipe = await recipesModel.findById(id);

  if (!recipe) throw errorConstructor(notFound, 'recipe not found');

  return recipe;
};

const update = async (id, updatedInfo) => {
  const { name, ingredients, preparation } = updatedInfo;

  const recipe = await recipesModel.findById(id);

  await recipesModel.update(id, name, ingredients, preparation);

  return {
    _id: id,
    name,
    ingredients,
    preparation,
    userId: recipe.userId,
  };
};

module.exports = {
  create,
  getAll,
  findById,
  update,
};
