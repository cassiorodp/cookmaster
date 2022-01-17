const jwt = require('jsonwebtoken');
const usersModel = require('../models/users');

const secret = 'mySecretToken';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await usersModel.findByEmail(decoded.data.email);

    if (!user) {
      return res
        .status(401)
        .json({ message: 'User not found.' });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
