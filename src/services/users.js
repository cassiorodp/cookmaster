const Joi = require('joi');
const usersModel = require('../models/users');
const { badRequest, conflict, forbidden } = require('../utils/dictionary');
const errorConstructor = require('../utils/errorConstructor');

const usersSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const create = async (name, email, password, role = 'user') => {
  const { error } = usersSchema.validate({ name, email, password });

  if (error) throw errorConstructor(badRequest, 'Invalid entries. Try again.');

  const foundUser = await usersModel.findByEmail(email);

  if (foundUser) throw errorConstructor(conflict, 'Email already registered');

  const id = await usersModel.create(name, email, password, role);
  
  const user = {
    _id: id,
    name,
    email,
    role,
  };
  
  return { user };
};

const createAdmin = async (name, email, password, role) => {
  if (role !== 'admin') throw errorConstructor(forbidden, 'Only admins can register new admins');

  const foundUser = await usersModel.findByEmail(email);

  if (foundUser) throw errorConstructor(conflict, 'Email already registered');

  const id = await usersModel.create(name, email, password, role);

  const user = {
    _id: id,
    name,
    email,
    role,
  };

  return { user };
};

module.exports = {
  create,
  createAdmin,
};
