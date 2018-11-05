var express = require('express');
var router = express.Router();
const Controller = require('../controllers/user')
const User = require('../models/user')
const auth = require('../middlewares/authentication')

/* GET users listing. */

router.post('/login', Controller.login)
router.post('/register', Controller.register)
router.get('/login/google', Controller.loginGoogle)

router.get('/',auth, Controller.getAll)

module.exports = router;
