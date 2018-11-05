const router = require('express').Router()

//controller
const { read, create, update, destroy } = require('../controllers/controller-todo')

//midleware
const { isLogin, isTokenStillValid, isAuthorize } = require('../midleware/authenticate')

router.get('/', isLogin,isTokenStillValid, read )
router.post('/',isLogin, isTokenStillValid, create)
router.put('/:id',isLogin, isTokenStillValid, isAuthorize, update)
router.delete('/:id',isLogin, isTokenStillValid, isAuthorize, destroy)

module.exports = router