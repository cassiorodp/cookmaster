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

  return recipe;
};

const update = async (id, name, ingredients, preparation) => {
  const conn = await connect();
  
  await conn.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  );

  return true;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
};
