const connect = require('./connection');

const create = async (name, email, password, role) => {
  const conn = await connect();

  const { insertedId } = await conn.collection('users').insertOne({ name, email, password, role });

  return insertedId;
};

const findByEmail = async (email) => {
  const conn = await connect();

  const user = await conn.collection('users').findOne({ email });

  return user;
};

module.exports = {
  create,
  findByEmail,
};
