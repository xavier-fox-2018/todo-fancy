const  express = require('express')
const router = express.Router()
const { findAll, insert, update, remove, findBy, gSignin } = require('../controllers/todo')
const {isLogin} = require('../middleware/isLogin')


router.get('/', isLogin, findAll)
router.post('/', isLogin, insert)
router.put('/:id', isLogin, update)
router.delete('/:id', isLogin, remove)
router.get('/:id', isLogin, findBy)
// router.post('/gsignin', gSignin)


module.exports = router