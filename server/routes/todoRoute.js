const router = require('express').Router()
const controller = require('../controllers/todoController')
const middleware = require('../middlewares/index')

router.post('/',middleware.authenticate,controller.create)
router.get('/:id',controller.readOne)
router.get('/',controller.read)
router.put('/:id',middleware.authenticate,controller.update)
router.delete('/:id',middleware.authenticate,controller.delete)

router.put('/:id/complete',middleware.authenticate,controller.complete)
router.put('/:id/uncomplete',middleware.authenticate,controller.uncomplete)

module.exports = router