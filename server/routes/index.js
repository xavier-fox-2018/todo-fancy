const express = require('express')
const Router = express.Router()
const TodoController = require('../controllers/TodoController')
const {isLogin} = require('../middlewares/middleware')

Router.post('/register', TodoController.register)
Router.post('/login', TodoController.login)
Router.get('/todo', isLogin ,TodoController.getAll)
Router.post('/todo', isLogin, TodoController.create)
Router.delete('/todo/:id', isLogin, TodoController.delete)
Router.patch('/todo/complete/:id', isLogin, TodoController.complete)
Router.patch('/todo/uncomplete/:id', isLogin, TodoController.uncomplete)
Router.put('/todo/:id', isLogin, TodoController.update)
Router.post('/googleLogin', TodoController.googleLogin)


module.exports = Router