const router = require('express').Router()
const controller = require('../controllers/todoController')
const middleware = require('../middlewares/index')

router.post('/',controller.create)
router.get('/:id',controller.readOne)
router.get('/',controller.read)
router.put('/:id',controller.update)
router.delete('/:id',controller.delete)

module.exports = router