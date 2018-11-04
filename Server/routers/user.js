const  express = require('express')
const router = express.Router()
const { findAll, insert, update, remove, findBy } = require('../controllers/user')


router.get('/', findAll)
router.post('/', insert)
router.put('/', update)
router.delete('/', remove)
router.get('/findBy', findBy)

module.exports = router