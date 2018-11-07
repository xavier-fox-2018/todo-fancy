var models = require('../models/todo.js');
class TodoController {
    static createTodo(req, res) {
        models.create({
            name: req.body.name,
            description: req.body.description,
            status: "pending",
            due_date: new Date(req.body.due_date)
        })

        .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(err) {
                res.status(500).json('error dari todos/create')
            })
    }
    static getTodo(req, res) {
        models.find()
            .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(err) {
                res.status(500).json({ message: 'error dari server routes/todos.js router get baris 22' })
            })
    }
    static updateTodo(req, res) {
        models.updateOne({ _id: req.params.id }, {
                name: req.body.name,
                description: req.body.description,
                status: "pending",
                due_date: new Date(req.body.due_date)
            })
            .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }
    static completedTodo(req, res) {
        models.updateOne({ _id: req.params.id }, {
                status: "completed"
            })
            .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }
    static deleteTodo(req, res) {
        models.deleteOne({ _id: req.params.id })
            .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(err) {
                res.status(500).json({ message: 'error dari server routes/todos.js router delete baris 49' })
            })
    }
}
module.exports = TodoController