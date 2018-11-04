var express = require('express');
var router = express.Router();
const {create, login, getUser, loginGoogle, getDataUser, createTaskgroup} = require('../controllers/users')
const {isLogin, validGoogleToken} = require('../middlewares/auth')
const {registerWithGoogle} = require ('../helpers/index')

router.post('/', create)
router.get('/', isLogin, getUser)
router.post('/login', login)
router.post('/Glogin', validGoogleToken, registerWithGoogle, loginGoogle )
router.get('/find/:email', isLogin, getDataUser)

module.exports = router;
