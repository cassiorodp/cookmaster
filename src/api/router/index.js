const express = require('express');
const loginRouter = require('./login');
const recipesRouter = require('./recipes');
const usersRouter = require('./users');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/login', loginRouter);
router.use('/recipes', recipesRouter);

module.exports = router;
