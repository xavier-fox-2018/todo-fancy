var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

/* GET users listing. */
router.post('/', userController.createUser);
router.post('/login', userController.loginUser)
router.post('/addTask', userController.createTask)
router.get('/task', userController.getTask)
router.delete('/delete/:id', userController.deleteTask)
module.exports = router;
