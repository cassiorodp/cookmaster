const recipeService = require('../services/recipes');
const { created } = require('../utils/dictionary');

const create = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;

    const newRecipe = await recipeService.create(_id, name, ingredients, preparation);

    return res.status(created).json(newRecipe);
  } catch (error) {
    console.log(`Create User -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  create,
};
