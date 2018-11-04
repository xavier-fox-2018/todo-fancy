var express = require('express');
var router = express.Router();
const {addTask, showTask, finishTask, deleteTask, editTask, taskDetail, addTaskgroup} = require('../controllers/todos')
const {isLogin, isOwnerTask, isMemberGroup, isGroupNotOwner} = require('../middlewares/auth')


router.get('/', isLogin, showTask)
router.post('/', isLogin, addTask)
router.post('/group', isLogin, isMemberGroup, addTaskgroup)
router.put('/:id', isLogin, isOwnerTask, editTask)
router.delete('/:id', isLogin, isOwnerTask, deleteTask)
router.get('/:id', isLogin, taskDetail)
router.put('/finish/:id', isLogin, isGroupNotOwner, finishTask)

module.exports = router;
