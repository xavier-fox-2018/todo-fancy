const Task = require('../models/task.js')

class taskController {
    static create(req, res) {
        Task.create({
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            username: req.body.username
        })
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            res.status(500).json({ message: err})
        })
    }

    static read(req, res) {
        Task.find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch( err => {
            res.status(500).json({message: err}) 
        })
    }

    static update(req, res) {
        console.log(req.body);
        
        Task.updateOne( {_id: req.params.taskID},
        {
            name: req.body.name,
            description: req.body.description,
            // status: req.body.status,
            due_date: req.body.due_date,
        })
        .then( data => {
            res.status(500).json(data)
        })
        .catch( err => {
            res.status(500).json({ message: err})
        })
    }

    static delete(req, res) {
        Task.deleteOne({
            _id: req.params.taskID 
        })
        .then( data => {
            res.status(200).json(data) // uah ke bntuk object?
        })
        .catch( err => {
            res.status(500).json({message: err})
        })
    }
}


module.exports = taskController