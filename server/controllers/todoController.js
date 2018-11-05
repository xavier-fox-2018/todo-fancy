const Todo = require('../models/todo')
const User = require('../models/user')
const Group = require('../models/group')

class Controller {
    static groupCreate(req,res){
        let due_date = new Date(req.body.due_date)
        let today = new Date()
        today.setHours(0,0,0,0)

        if(req.body.name.length < 1 || req.body.description.length < 1){
            res.status(500).json({
                message : 'Invalid Name / Description'
            })
        }else if(due_date < today){
            res.status(500).json({
                message : 'Invalid Date'
            })
        }else{
            Todo.create({
                name : req.body.name,
                description : req.body.description,
                author : req.userId, //dapet dari middleware
                due_date : due_date
            })
            .then((todo)=>{
                Group.findOneAndUpdate({
                    _id : req.params.id
                },{
                    $push : {
                        todo_list : todo._id
                    }
                })
                .then((updated)=>{
                    // res.status(200).json(updated)
                    
                    res.status(201).json({
                        message : "Add Task Success",
                        data : todo
                    })
                })
                .catch((err)=>{
                    res.status(500).json({
                        message : 'Error in adding task to specified group'
                    })
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    message : 'Create Task Failed'
                })
            })
        } 
    }

    static create(req,res){
        let due_date = new Date(req.body.due_date)
        let today = new Date()
        today.setHours(0,0,0,0)

        if(req.body.name.length < 1 || req.body.description.length < 1){
            res.status(500).json({
                message : 'Invalid Name / Description'
            })
        }else if(due_date < today){
            res.status(500).json({
                message : 'Invalid Date'
            })
        }else{
            Todo.create({
                name : req.body.name,
                description : req.body.description,
                author : req.userId, //dapet dari middleware
                due_date : due_date
            })
            .then((todo)=>{
                User.findOneAndUpdate({
                    _id : req.userId
                },{
                    $push : {
                        todo_list : todo._id
                    }
                })
                .populate('todo_list')
                .then((updated)=>{
                    // res.status(200).json(updated)
                    
                    res.status(201).json({
                        message : "Add Task Success",
                        data : todo
                    })
                })
                .catch((err)=>{
                    res.status(500).json({
                        message : 'Error in finding task creator'
                    })
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    message : 'Create Task Failed'
                })
            })
        }
    }

    static read(req,res){
        Todo.find({})
        .then((resp)=>{
            res.status(200).json({
                data : resp
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'Failed to get all task list from database'
            })
        })
    }

    static readOne(req,res){
        Todo.findOne({
            _id : req.params.id
        })
        .then((task)=>{
            res.status(200).json(task)
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'Error in finding specified Task'
            })
        })
    }

    static update(req,res){
        if(req.body.name.length < 1 || req.body.description.length < 1){
            res.status(500).json({
                message : 'Invalid Name / Description'
            })
        }

        let due_date = new Date(req.body.due_date)
        let today = new Date()
        if(due_date < today){
            res.status(500).json({
                message : 'Invalid Date'
            })
        }

        Todo.findOneAndUpdate({
            _id : req.params.id
        },{
            name : req.body.name,
            description : req.body.description,
            due_date : due_date
        })
        .then((updated)=>{
            res.status(200).json({
                message : 'Edit Task Success',
                updated : updated
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'Edit Task Failed',
                error : err
            })
        })
    }

    static delete(req,res){
        Todo.findOneAndRemove({
            _id : req.params.id
        })
        .then((resp)=>{
            res.status(200).json({
                message : `Task deleted`
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'Failed to delete task'
            })
        })
    }

    static complete(req,res){
        Todo.findOneAndUpdate({
            _id : req.params.id
        },{
            status : true
        })
        .then((resp)=>{
            res.status(200).json({
                message : `${resp.name} Completed`
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'failed to complete task (error)'
            })
        })
        
    }

    static uncomplete(req,res){
        Todo.findByIdAndUpdate({
            _id : req.params.id
        },{
            status : false
        })
        .then((resp)=>{
            res.status(200).json({
                message : `${resp.name} Uncompleted`
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Uncomplete task failed (error)"
            })
        })

    }
}

module.exports = Controller