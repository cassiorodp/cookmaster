const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (userId, name, ingredients, preparation) => {
  const conn = await connect();

  const { insertedId } = await conn.collection('recipes')
    .insertOne({ userId, name, ingredients, preparation });
  
  return insertedId;
};

const getAll = async () => {
  const conn = await connect();

  const recipes = await conn.collection('recipes').find({}).toArray();

  return recipes;
};

const findById = async (id) => {
  const conn = await connect();
  
  const recipe = await conn.collection('recipes').findOne({ _id: ObjectId(id) });
  console.log(recipe);

  return recipe;
};

module.exports = {
  create,
  getAll,
  findById,
};
