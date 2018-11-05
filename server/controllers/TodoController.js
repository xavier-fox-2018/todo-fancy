const TodoModel = require('../models/TodoModel.js');
const GroupModel = require('../models/GroupModel.js')
const UserModel = require('../models/UserModel.js')
const helpers = require('../helpers/helpers.js')
const mongoose = require('mongoose')

module.exports = {

    changeStatus : function (req,res) {
        TodoModel.findById(req.params.id)
        .then((Todo) => {
            let newStatus = ''
            Todo.status == 'pending' ? newStatus = 'done' : newStatus = 'pending'
            Todo.status = newStatus

            Todo.save(function (err, Todo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Todo.',
                        error: err
                    });
                }
                return res.json(Todo);
            });
        }).catch((err) => {
            return res.status(500).json({
                message: 'Error when getting Todo while updateting status.',
                error: err
            });
        });

    },


    list : function (req, res) {
        let userId = helpers.decodeToken(req.headers.token)._id
        GroupModel.find({
            'members': {
                $in: [
                    mongoose.Types.ObjectId(userId)
                ]
            }
        })
        .populate({path : 'groupTodos', populate : {path : 'inGroup'}})
        .then((groups) => {
            let todosToSend = []
            
            groups.forEach(group => {
                group.groupTodos.forEach(todo => {
                    todosToSend.push(todo)
                })
            })

            TodoModel.find({ 
                $or:[ 
                    { owner : userId },
                ]
            })
            .populate('inGroup','_id name').exec()
            .then((todos) => {
                todos.forEach(todo => {
                    todosToSend.push(todo)
                })
                
                let final = []
                final.push(todosToSend[0])
                
                todosToSend.forEach((todo) => {

                    let index = final.findIndex(val => {
                        return val._id == todo._id
                    });

                    if(index == -1 ) {
                        final.push(todo)
                    }
                })
                
                //knp duplikat terusssssssss ????????????????
                res.json(final)

            })
            .catch((err) => {
                    res.status(500).json({
                    message: 'Error when getting Todo.',
                    error: err
                });
                
            });

        }).catch((err) => {
            console.log(err);
        });

    },

    show : function (req, res) {
        var id = req.params.id;
        TodoModel.findOne({_id: id}, function (err, Todo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Todo.',
                    error: err
                });
            }
            if (!Todo) {
                return res.status(404).json({
                    message: 'No such Todo'
                });
            }
            return res.json(Todo);
        }).populate('owner', '_id name email')
    },

    create : function (req, res) {
        let id = helpers.decodeToken(req.headers.token)._id
        UserModel.findById(id)
        .then((user) => {
            var newTodo = {
                owner : user._id,
                title : req.body.title,
                deadline : req.body.deadline,
                priority : req.body.priority,
                note : req.body.note,
                inGroup : req.body.inGroup
            }

            TodoModel.create(newTodo)
            .then((todo) => {
                todo.populate('owner','_id name email').populate('inGroup','_id name').execPopulate()
                .then((result) => {
                    res.status(201).json(result)
                    
                })
            }).catch((err) => {
                res.status(500).json({
                    message: 'Error when creating Todo',
                    error: err
                });
            });
        }).catch((err) => {
            res.status(500).json(err)
        });

    },

    update : function (req, res) {
        var id = req.params.id;
        TodoModel.findOne({_id: id}, function (err, Todo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Todo',
                    error: err
                });
            }
            if (!Todo) {
                return res.status(404).json({
                    message: 'No such Todo'
                });
            }

            Todo.owner = req.body.owner ? req.body.owner : Todo.owner;
			Todo.title = req.body.title ? req.body.title : Todo.title;
			Todo.deadline = req.body.deadline ? req.body.deadline : Todo.deadline;
			Todo.priority = req.body.priority ? req.body.priority : Todo.priority;
			Todo.note = req.body.note ? req.body.note : Todo.note;
			
            Todo.save(function (err, Todo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Todo.',
                        error: err
                    });
                }

                return res.json(Todo);
            });
        });
    },

    remove : function (req, res) {
        var id = req.params.id;
        TodoModel.findByIdAndRemove(id, function (err, Todo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Todo.',
                    error: err
                });
            }
            return res.status(204).json()
        });
    }
};
