const express = require('express')
const router = express.Router();
const {isLogin, notExist, isGroupOwner} = require('../middlewares/auth')
const {create, getGroup, findGroup, addUser, edit, remove} = require('../controllers/groups')

router.post('/', isLogin, create)
router.get('/', isLogin, getGroup)
router.get('/findbyid/:id', isLogin, findGroup)
router.post('/add', isLogin, notExist, addUser)
router.put('/:id', isLogin, isGroupOwner, edit)
router.delete('/:id', isLogin, isGroupOwner, remove)

module.exports = router;
