const router = require('express').Router()
const UserController = require('../controllers/userController.js')
 
router.get('/', UserController.readAll)


 
module.exports = router
