const Todo = require('../models/todo')
const User = require('../models/user')
const Group = require('../models/group')

class Controller {
    static groupCreate(req,res){
        console.log('masuk controller')
        let due_date = new Date(req.body.due_date)
        let today = new Date()

        console.log(req.body)

        if(req.body.name.length < 1 || req.body.description.length < 1){
            console.log('kena 1')
            res.status(500).json({
                message : 'Invalid Name / Description'
            })
        }else if(due_date < today){
            console.log('kena 2')
            res.status(500).json({
                message : 'Invalid Date'
            })
        }else{
            console.log('masuk ke else')
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
                        message : 'error in finding task creator from database'
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
                        message : 'error in finding task creator from database'
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
                message : 'Internal Server Error'
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
                message : 'Error in searching specified Task'
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
                message : 'Task Completed'
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
                message : 'Task Uncompleted'
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