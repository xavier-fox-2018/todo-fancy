const router = require('express').Router()
const controller = require('../controllers/todoController')
const middleware = require('../middlewares/index')

router.post('/',middleware.authenticate,controller.create)
router.get('/:id',controller.readOne)
router.get('/',controller.read)
router.put('/:id',middleware.authenticate,middleware.isOwner,controller.update)
router.delete('/:id',middleware.authenticate,middleware.isOwner,controller.delete)

router.put('/complete/:id',middleware.authenticate,middleware.isOwner,controller.complete)
router.put('/uncomplete/:id',middleware.authenticate,middleware.isOwner,controller.uncomplete)

module.exports = router