const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const todoRoutes = require('./todos')
const {Controller} = require('../controllers');

router.get('/', Controller.home);
router.use('/users', userRoutes);
router.use('/todos', todoRoutes);

module.exports = router;
