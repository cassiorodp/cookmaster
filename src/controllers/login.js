const jwt = require('jsonwebtoken');
const loginServices = require('../services/login');
const { success } = require('../utils/dictionary');

const secret = 'mySecretToken';

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await loginServices.login(email, password);

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: user }, secret, jwtConfig);

    return res.status(success).json({ token });
  } catch (error) {
    console.log(`Login -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  login,
};
