var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserControllers')
const TaskController = require('../controllers/TaskController')
const checkLogin = require('../middleware/auth')
/* GET users listing. */
router.post('/login' , UserController.login)
router.post('/create', checkLogin ,TaskController.create)
router.get('/tasks',checkLogin ,TaskController.all)
router.post('/tasks/complete/:id', checkLogin ,TaskController.complete)
router.patch('/tasks/edit/:id' , checkLogin,TaskController.edit)
router.delete('/tasks/delete/:id',checkLogin ,TaskController.delete)

module.exports = router;
