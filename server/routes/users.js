var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
var isAuthorized = require('../middlewares/isAuthorized.js')

/* GET users listing. */
router.post('/', userController.createUser);
router.post('/login', userController.loginUser)
router.post('/addTask', isAuthorized, userController.createTask)
router.get('/task', isAuthorized, userController.getTask)
router.delete('/delete/:id', isAuthorized, userController.deleteTask)
router.put('/task/update', isAuthorized, userController.updateTask)
module.exports = router;
