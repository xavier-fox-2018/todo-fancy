const  express = require('express')
const router = express.Router()
const { findAll, insert, update, remove, findBy, gSignin, signIn } = require('../controllers/user')
const {isLogin} = require('../middleware/isLogin')


router.get('/', findAll)
router.post('/', insert)
router.put('/:id', update)
router.delete('/:id', remove)
router.get('/:id', findBy)
router.post('/gsignin', gSignin)
router.post('/signin', signIn)
// router.post('/signin', (req,res) => {
//     console.log('masuk pak eko');
// })

module.exports = router