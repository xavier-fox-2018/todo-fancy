var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', UserController.register)
router.post('/signin', UserController.signin)
router.post('/gsignin', UserController.gsignin)

module.exports = router;
