const jwt = require('jsonwebtoken');
const usersModel = require('../models/users');
const { unauthorized } = require('../utils/dictionary');

const secret = 'mySecretToken';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(unauthorized).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await usersModel.findByEmail(decoded.data.email);

    if (!user) {
      return res
        .status(unauthorized)
        .json({ message: 'User not found.' });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(unauthorized).json({ message: error.message });
  }
};
