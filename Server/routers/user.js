const  express = require('express')
const router = express.Router()
const { findAll, insert, update, remove, findBy, gSignin, isLogin } = require('../controllers/user')


router.get('/', findAll)
router.post('/', isLogin, insert)
router.put('/', update)
router.delete('/:id', remove)
router.get('/:id', findBy)
router.post('/gsignin', gSignin)
// router.post('/gsignin', (req,res) => {
//     console.log('masukk');
// })

module.exports = router