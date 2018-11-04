const express = require('express');
const router = express.Router();
const {TodoController} = require('../controllers')

router.get('/list', TodoController.readTodo)
router.post('/create/', TodoController.createTodo)
router.patch('/complete/:id', TodoController.completeTodo)
router.delete('/delete/:id', TodoController.deleteTodo)

module.exports = router;