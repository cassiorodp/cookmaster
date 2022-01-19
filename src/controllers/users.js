const usersService = require('../services/users');
const { created } = require('../utils/dictionary');

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await usersService.create(name, email, password);

    return res.status(created).json(newUser);
  } catch (error) {
    console.log(`Create User -> ${error.message}`);
    next(error);
  }
};

const createAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { role } = req.user;

    const newUser = await usersService.createAdmin(name, email, password, role);

    return res.status(created).json(newUser);
  } catch (error) {
    console.log(`Create Admin -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  createUser,
  createAdmin,
};
