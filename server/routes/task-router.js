const express = require('express');
const router = express.Router();
const {isLogin} = require('../middlewares/isLogin')
const {addTask, allTask, taskDone, updateOne, updateTask, setDone, setDo, deleteTask} = require('../controllers/task-controller')


router.post('/', isLogin, addTask)
router.get('/', isLogin, allTask)
router.get('/done',isLogin, taskDone)
router.get('/:id', isLogin,updateOne)
router.put('/:id', isLogin, updateTask)
router.delete('/:id', isLogin, deleteTask)
router.patch('/:id/done', isLogin, setDone)
router.patch('/:id/do', isLogin, setDo)

module.exports = router;
