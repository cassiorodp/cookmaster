const connect = require('./connection');

const create = async (userId, name, ingredients, preparation) => {
  const conn = await connect();

  const { insertedId } = await conn.collection('users')
    .insertOne({ userId, name, ingredients, preparation });
  
  return insertedId;
};

module.exports = {
  create,
};
