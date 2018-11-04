const Todo = require('../models/todos')
const Group = require('../models/groups')

module.exports = {
    addTask: function(req, res){
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            location: req.body.location,
            owner: req.decoded.id
        })
        .then((result) => {
            res.status(201).json({ msg: 'Add Task Sucess', data: result })
        })
        .catch((err) => {
            res.status(500).json( err )
        });
    },
    editTask: function(req, res){
        Todo.updateOne({_id: req.params.id},
            {$set: {
                title: req.body.title,
                description: req.body.description,
                dueDate: req.body.dueDate,
                priority: req.body.priority,
                location: req.body.location
                }
            })
            .then((result) => {
                res.status(200).json({ msg: 'Update Task Sucess', data: result })
            })
            .catch((err) => {
                res.status(500).json( err )
            });
    },
    deleteTask: function(req, res){
        Todo.findOne({
            _id: req.params.id
        })
        .then((result) => {
            console.log(result);
            if(result.isGroup){
                Group.findOneAndUpdate({
                    tasks: req.params.id
                }, {
                    $pull: {
                        tasks: req.params.id
                    }
                })
                .then((result) => { 
                })
            }
            Todo.deleteOne({
                _id: req.params.id
            })
            .then(result => {
                res.status(200).json({ msg: 'delete Task Sucess', data: result })
            })
        })
        .catch((err) => {
            res.status(500).json( err )            
        });
    },
    showTask: function(req, res){
        Todo.find({
            owner: req.decoded.id,
            isGroup: false
        })
        .then(result => {
            res.status(200).json({data: result})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },
    finishTask: function(req, res){
        Todo.updateOne({_id: req.params.id},
            {$set: {
                status: true,
                completedBy: req.decoded.id,
                completedDate: new Date().toISOString()
            }
        })
        .then((result) => {
            res.status(200).json({ msg: "Task finished", data: result })
        })
        .catch((err) => {
            res.status(500).json(err)
        });
    },
    taskDetail: function(req, res){
        Todo.findOne({
            _id: req.params.id
        })
        .populate('owner')
        .populate('completedBy').exec()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    addTaskgroup: function(req, res){
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            owner: req.decoded.id,
            location: req.body.location,
            isGroup: true,
            idGroup: req.body.idGroup
        })
        .then(result => {
            Group.updateOne({
                _id: req.body.idGroup
            },{ 
                $push: {
                    tasks: result._id
                }
            })
            .then((data) => {
                res.status(201).json({msg: 'Task Created', data})
            })
        }).catch((err) => {
            res.status(500).json({ msg: err })
        });   
    }   
}