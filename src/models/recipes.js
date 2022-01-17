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

module.exports = {
  create,
  getAll,
};
