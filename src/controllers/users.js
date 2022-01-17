const usersService = require('../services/users');
const { created } = require('../utils/dictionary');

const create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await usersService.create(name, email, password);

    return res.status(created).json(newUser);
  } catch (error) {
    console.log(`Create User -> ${error}`);
    next(error);
  }
};

module.exports = {
  create,
};
