const Todo = require('../models/todo')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


class TodoController{
  static readTodo(req, res, next) {
    Todo.find()
    .populate('user', 'name email')
    .then(data => {
      res.status(200).json({
        result: data,
        error: null
      })
    })
    .catch(error => {
      res.status(500).json({
        result: null,
        error: {
          status_code: 'SERVER_ERROR',
          message: error.message
        }
      })
    })
  }
  static createTodo(req, res, next) {
    let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
    if(decoded){
      Todo.create({
        user: decoded.id,
        name: req.body.name,
        description: req.body.description,
        dueDate: new Date(req.body.dueDate)
      })
      .then(todo => {
        return User.findOneAndUpdate({_id: todo.user}, {$push: {todo: todo._id}}, {new: true})
                .populate('todo', '_id name dueDate description status', null, {sort: {dueDate: 1}})
                .select('-password')
      })
      .then(user => {
        res.status(201).json({
          result: user,
          error: null
        })
      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: {
            error_code: 'SERVER_ERROR',
            message: 'Something went wrong'
          }
        })
      })
    }else{
      res.status(500).json({
        result: null,
        error: {
          error_code: 'SERVER_ERROR',
          message: 'Something went wrong'
        }
      })
    }
    
  }
  static completeTodo(req, res, next) {
    Todo.findOneAndUpdate({_id: req.params.id}, {status: 'completed'}, {new: true})
    .then(doc => {
      if(doc){
        res.status(200).json({
          result: doc,
          error: null
        })
      }else{
        res.status(404).json({
          result: null,
          error: {
            error_code: 'NOT_FOUND',
            message: 'Something went wrong'
          }
        })
      }
    })
    .catch(error => {
      res.status(500).json({
        result: null,
        error: {
          error_code: 'SERVER_ERROR',
          message: 'Something went wrong'
        }
      })
    })
  }
  static deleteTodo(req, res, next) {
    Todo.findOneAndDelete({_id: req.params.id})
    .then(doc => {
      res.status(200).json({
        result: doc,
        error: null
      })
    })
    .catch(error => {
      res.status(500).json({
        result: null,
        error: {
          error_code: 'SERVER_ERROR',
          message: 'Something went wrong'
        }
      })
    })
  }
}

module.exports = TodoController;