const Task = require('../models/taskModel.js');
const User = require('../models/userModel.js');

class TaskController {
    static create(req, res) {
        Task.create({
            title: req.body.title,
            description: req.body.description, 
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            user: req.user._id
        })
            .then(function(task) {
                User.findByIdAndUpdate(req.user._id, {
                    $push: {
                        taskList: task._id
                    }
                })
                    .then(function(result) {
                        const response = {
                            task: task,
                            message: `Successfully created task ${task.title}`
                        }
                        res.status(201).json(response);
                    })
                    .catch(function(err) {
                        res.status(500).json(err);
                    });
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static createForGroup(req, res) {
        Task.create({
            title: req.body.title,
            description: req.body.description, 
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            user: req.user._id,
            group: req.body.group
        })
            .then(function(task) {
                User.findByIdAndUpdate(req.user._id, {
                    $push: {
                        taskList: task._id
                    }
                })
                    .then(function(result) {
                        const response = {
                            task: task,
                            message: `Successfully created task ${task.title}`
                        }
                        res.status(201).json(response);
                        
                    })
                    .catch(function(err) {
                        res.status(500).json(err);
                    });
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static getAll(req, res) {
        Task.find({user: req.user._id})
            .then(function(tasks) {
                res.status(200).json(tasks);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static getOne(req, res) {
        Task.findOne({_id: req.params.id, user: req.user._id})
            .then(function(task) {
                if (task) {
                    res.status(200).json(task);
                } else {
                    const error = {
                        message: `Task with that ID didn't exists`
                    }
                    res.status(404).json(error);
                }
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static update(req, res) {
        Task.update({_id: req.params.id, user: req.user._id}, {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority
        })
            .then(function(task) {
                res.status(200).json({
                    message: `Successfully updated task`
                });
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static delete(req, res) {
        Task.deleteOne({_id: req.params.id, user: req.user._id})
            .then(function(result) {
                User.findByIdAndUpdate(req.user._id, {
                    $pull: {
                        taskList: req.params.id
                    }
                })
                    .then(function(result) {
                        res.status(200).json({
                            message: `Successfully deleted task with ID ${req.params.id}`
                        });
                    })
                    .catch(function(err) {
                        res.status(500).json(err);
                    });
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static markAsDone(req, res) {
        Task.findOneAndUpdate({_id: req.params.id, user: req.user._id}, {
            $set: {
                isDone: true
            }
        })
            .then(function(result) {
                res.status(200).json({
                    message: `Good job! You just finish this task!`
                });
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static markAsUndone(req, res) {
        Task.findOneAndUpdate({_id: req.params.id, user: req.user._id}, {
            $set: {
                isDone: false
            }
        })
            .then(function(result) {
                res.status(200).json({
                    message: `Task is marked as undone`
                });
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static getTasksinGroup(req, res) {
        Task.find({group: req.params.groupId})
            .then(function(tasks) {
                res.status(200).json(tasks);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }
}

module.exports = TaskController;