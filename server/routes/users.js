var express = require('express');
var router = express.Router();
const Controller = require('../controllers/users')
const Middleware = require('../middleware/index')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', Controller.userLogin)
router.post('/login-manual', Controller.loginManual)
router.post('/signup', Controller.signup)
router.post('/user-data',Middleware.checkLogin, Controller.userData)
router.post('/create-task', Controller.createTask)
router.delete('/delete-task', Controller.deleteTask)
router.post('/update-task', Controller.updateTask)
router.put('/complete-task', Controller.completeTask)
router.post('/list-complete', Controller.listComplete)
router.post('/list-incomplete', Controller.listIncomplete)


module.exports = router;
