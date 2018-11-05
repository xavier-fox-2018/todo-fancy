const router = require('express').Router()
const UserController = require('../controllers/user')

router.get('/', UserController.homePage)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googlelogin', UserController.googleLogin)

module.exports = router
