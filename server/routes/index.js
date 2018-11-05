const router = require('express').Router()
const task = require('./task.js')
const user = require('./user.js')
const UserController = require('../controllers/userController.js')

router.post('/googleLogin', UserController.googleLogin) // di router index atoo task??
 
router.use('/task', task)
router.use('/user', user)
 
 
module.exports = router