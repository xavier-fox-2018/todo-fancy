const router = require('express').Router()
const controller = require('../controllers/groupController')
const middleware = require('../middlewares/index')

// router.get('/',controller.read)
router.get('/mygroups',middleware.authenticate,controller.mygroup)
router.get('/myinvitation',middleware.authenticate,controller.myinvitation)

router.get('/:id',middleware.authenticate,middleware.isMember,controller.readOne)

router.post('/',middleware.authenticate,controller.create)
router.post('/invite',middleware.authenticate,middleware.findUser,controller.invite)
router.post('/accept/:id',middleware.authenticate,controller.accept)



module.exports = router