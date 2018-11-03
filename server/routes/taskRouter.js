const taskRouter = require('express').Router();
const TaskController = require('../controllers/taskController.js');
const isLogin = require('../middlewares/isLogin.js');

taskRouter.get('/:id', isLogin, TaskController.getOne);
taskRouter.get('/', isLogin, TaskController.getAll);
taskRouter.post('/', isLogin, TaskController.create);
taskRouter.put('/:id', isLogin, TaskController.update);
taskRouter.delete('/:id', isLogin, TaskController.delete);
taskRouter.patch('/markdone/:id', isLogin, TaskController.markAsDone);
taskRouter.patch('/markundone/:id', isLogin, TaskController.markAsUndone);

module.exports = taskRouter;