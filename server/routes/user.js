const route = require('express').Router();

const UserController = require('../controllers/user.js');

route.post('/signup', UserController.signup);
route.post('/login', UserController.login);
route.get('/isLogin', UserController.isLogin);
route.get('/logout', UserController.logout);

module.exports = route;