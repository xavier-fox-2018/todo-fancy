const userRouter = require('express').Router();
const UserController = require('../controllers/userController.js');
const isLogin = require('../middlewares/isLogin.js');
const isInGroup = require('../middlewares/isInGroup.js');

userRouter.get('/group/:groupId', isLogin, isInGroup, UserController.getUsersinGroup);
userRouter.get('/profile', isLogin, UserController.getProfile);
userRouter.get('/search/:keyword', isLogin, UserController.searchUsers);
userRouter.get('/', isLogin, UserController.getAllUsers);
userRouter.patch('/invite', isLogin, UserController.sendInvitation);
userRouter.patch('/accept', isLogin, UserController.acceptInvitation);
userRouter.post('/group', isLogin, UserController.createGroup);

module.exports = userRouter;