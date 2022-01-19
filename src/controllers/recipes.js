const recipeService = require('../services/recipes');
const { created, success, noContent } = require('../utils/dictionary');

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

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await recipeService.findById(id);

    return res.status(success).json(recipe);
  } catch (error) {
    console.log(`Get Recipe By Id -> ${error.message}`);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedRecipe = await recipeService.update(id, req.body);
  
    return res.status(success).json(updatedRecipe);
  } catch (error) {
    console.log(`Update Recipe -> ${error.message}`);
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    await recipeService.deleteById(req.user, id);

    return res.status(noContent).json();
  } catch (error) {
    console.log(`Update Recipe -> ${error.message}`);
    next(error);
  }
};

const uploadImage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedRecipe = await recipeService.uploadImage(req.user, id);

    res.status(success).json(updatedRecipe);
    next();
  } catch (error) {
    console.log(`Update Image -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  deleteById,
  uploadImage,
};
