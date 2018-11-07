const  express = require('express')
const router = express.Router()
const { findAll, insert, update, remove, findBy, gSignin } = require('../controllers/todo')


router.get('/', findAll)
router.post('/', insert)
router.put('/:id', update)
router.delete('/:id', remove)
router.get('/:id', findBy)
// router.post('/gsignin', gSignin)


module.exports = router