const taskRouter = require('express').Router();
const TaskController = require('../controllers/taskController.js');
const isLogin = require('../middlewares/isLogin.js');
const isAuthorizedUser = require('../middlewares/isAuthorizedUser.js');
const isInGroup = require('../middlewares/isInGroup.js');

taskRouter.get('/group/:groupId', isLogin, isInGroup, TaskController.getTasksinGroup);
taskRouter.get('/:id', isLogin, isAuthorizedUser, TaskController.getOne);
taskRouter.get('/', isLogin, TaskController.getAll);
taskRouter.post('/group', isLogin, isInGroup, TaskController.createForGroup);
taskRouter.post('/', isLogin, TaskController.create);
taskRouter.put('/:id', isLogin, isAuthorizedUser, TaskController.update);
taskRouter.delete('/:id', isLogin, isAuthorizedUser, TaskController.delete);
taskRouter.patch('/markdone/:id', isLogin, isAuthorizedUser, TaskController.markAsDone);
taskRouter.patch('/markundone/:id', isLogin, isAuthorizedUser, TaskController.markAsUndone);

module.exports = taskRouter;