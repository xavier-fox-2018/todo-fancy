const router = require('express').Router()
const controller = require('../controllers/groupController')
const middleware = require('../middlewares/index')


// read di rubah jadi my group saja nanti
router.get('/',controller.read)
router.get('/mygroup',middleware.authenticate,controller.mygroup)

router.post('/',middleware.authenticate,controller.create)
router.post('/invite',middleware.authenticate,controller.invite)
router.post('/accept/:id',middleware.authenticate,controller.accept)

module.exports = router