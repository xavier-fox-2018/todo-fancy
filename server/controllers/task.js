const Task = require('../models/task.js');

class TaskController {

    static create(req, res) {
        Task.create({
            name: req.body.name,
            description: req.body.description,
            status: false,
            dueDate: req.body.dueDate,
            UserId: req.body.UserId
        })
            .then(function(resolve) {
                res.status(201).json(resolve)
            })
            .catch(function(reject) {
                res.status(500).json(reject)
            });
    }

    static getAll(req, res) {
        Task.find({
            UserId: req.params.UserId
        })
            .then(function(resolve) {
                res.status(201).json(resolve)
            })
            .catch(function(reject) {
                res.status(500).json(reject)
            });
    }

}

module.exports = TaskController;