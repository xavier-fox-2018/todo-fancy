const router = require('express').Router()
const controller = require('../controllers/todoController')
const middleware = require('../middlewares/index')

router.post('/',middleware.authenticate,controller.create)
router.get('/:id',controller.readOne)
router.get('/',controller.read)
router.put('/:id',controller.update)
router.delete('/:id',controller.delete)

router.put('/:id/complete',controller.complete)
router.put('/:id/uncomplete',controller.uncomplete)

module.exports = router