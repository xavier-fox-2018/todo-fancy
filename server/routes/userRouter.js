const userRouter = require('express').Router();
const UserController = require('../controllers/userController.js');
const isLogin = require('../middlewares/isLogin.js');

userRouter.get('/profile', isLogin, UserController.getProfile);

module.exports = userRouter;