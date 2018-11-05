const router = require('express').Router()
const TodoController = require('../controllers/todo')
const isLogin = require('../middlewares/isLogin')

router.post('/task', isLogin, TodoController.create)
router.get('/task', isLogin, TodoController.read)
router.get('/onetask', isLogin, TodoController.readOne)
router.put('/task', isLogin, TodoController.update)
router.put('/check', isLogin, TodoController.check)
router.delete('/task', isLogin, TodoController.delete)

module.exports = router
