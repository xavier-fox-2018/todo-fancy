const Group = require('../models/groups')
const Todo = require('../models/todos')

module.exports = {
    create: function(req, res){
        console.log(req.body);
        
        Group.create({
            name: req.body.name,
            owner: req.decoded.id,
            users: req.decoded.id
        })
        .then((result) => {
            res.status(201).json({msg: 'Group Created', data: result})
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    edit: function(req, res){
        Group.updateOne({
            _id: req.params.id
        }, {
            name: req.body.name
        })
        .then((result) => {
            res.status(200).json({msg: 'Group Edited', data: result})
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    remove: function(req, res){
        Group.findOne({
            _id: req.params.id
        })
        .then((result) => {
            // console.log(result);
            result.tasks.forEach(task => { // remove all task on group
                Todo.deleteOne({
                    _id: String(task)
                })
                .then((result) => {})
            });
            Group.deleteOne({
                _id: req.params.id
            })
            .then((result) => {
                res.status(200).json({msg: 'Group Deleted', data: result})
            })
        })
        .catch((err) => {
            res.status(500).json(err)
        });   
    },
    getGroup: function(req, res){
        Group.find({
            users: req.decoded.id
        })
        .populate('users')
        .populate('tasks').exec()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    findGroup: function(req, res){
        // console.log(req.params.id)
        Group.findOne({
            _id: req.params.id
        })
        .populate('users').exec()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    addUser: function(req, res){
        console.log('masuk adduser');
        
        Group.updateOne({
            _id: req.body.groupId,
        }, { $push: {
            users: req.body.userId
                }
            }
        )
        .then((result) => {
            res.status(200).json({msg: 'Add User Success', data: result})
        }).catch((err) => {
            res.status(500).json(err)
        });
    }






}