require('dotenv').config()
const Todo = require('../models/todo')
const jwt = require('jsonwebtoken')

class TodoController {
  static create (req, res) {
    let token = jwt.verify(req.headers.token, process.env.JWT_SECRET)
    let todo = new Todo({
      name: req.body.name,
      description: req.body.description,
      due_date: new Date(req.body.due_date),
      user_id: token.id
    })
    
    todo.save()
      .then(() => {
        res.status(201).json({ message: 'New Task has been created!' })
      })
      .catch(error => {
        console.log(error)
        res.status(500).json(error)
      })
  }
  
  static read (req, res) {
    let token = jwt.verify(req.headers.token, process.env.JWT_SECRET)
    Todo.find({ user_id: token.id })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(error => {
        console.log(error)
        res.status(500).json(error)
      })
  }

  static readOne (req, res) {
    Todo.findOne({ _id: req.headers.id })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(error => {
        console.log(error)
        res.status(500).json(error)
      })
  }

  static update (req, res) {
    Todo.findByIdAndUpdate(req.headers.id, req.body)
      .then(data => {
        console.log('suksesssssssssss')
        res.status(201).json(data)
      })
      .catch(error => {
        console.log(error)
        res.status(500).json(error)
      })
  }

  static check (req, res) {
    Todo.findOne({ _id: req.body.id })
      .then(data => {
        console.log(data.status)
        if (data.status) {
          data.updateOne({ status: false })
          .then(data => {
            res.status(200).json(data)
          })
          .catch(error => {
            res.status(500).json(error)
          })
        } else {
          data.updateOne({ status: true })
          .then(data => {
            res.status(200).json(data)
          })
          .catch(error => {
            res.status(500).json(error)
          })
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json(error)
      })
  }

  static delete (req, res) {
    Todo.findByIdAndDelete(req.headers.id)
      .then(data => {
        console.log('deleted!')
        res.status(200).json(data)
      })
      .catch(error => {
        console.log(error)
        res.status(500).json(error)
      })
  }
}

module.exports = TodoController
