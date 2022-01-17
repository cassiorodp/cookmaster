const Joi = require('joi');
const usersModel = require('../models/users');
const { unauthorized } = require('../utils/dictionary');
const errorConstructor = require('../utils/errorConstructor');

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const login = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });

  if (error) throw errorConstructor(unauthorized, 'All fields must be filled');

  const user = await usersModel.findByEmail(email);

  if (!user || user.password !== password) {
    throw errorConstructor(unauthorized, 'Incorrect username or password');
  }

  return user;
};

module.exports = {
  login,
};
