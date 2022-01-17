const recipeService = require('../services/recipes');
const { created, success } = require('../utils/dictionary');

const create = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;

    const newRecipe = await recipeService.create(_id, name, ingredients, preparation);

    return res.status(created).json(newRecipe);
  } catch (error) {
    console.log(`Create Recipe -> ${error.message}`);
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const recipes = await recipeService.getAll();

    return res.status(success).json(recipes);
  } catch (error) {
    console.log(`Get Recipes -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  create,
  getAll,
};
