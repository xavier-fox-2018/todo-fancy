const Todo = require('../models/Todo')

class TodoController{
    static create(req,res){
        Todo.create({
            name: req.body.name,
            description: req.body.description,
            due_date: req.body.due_date
        })
        .then(todo=>{
            res.status(200).json({
                message: "Success add task To do!", 
                todo: todo
            })
        })
        .catch(err=>{
            res.status(500).json({
                message: "Can not add task todo!",
                error: err.message
            })
        })
    }

    static index(req,res){
        Todo.find({},{},{
            skip: 0,
            limit: 10,
            sort: {
                due_date:1
            }
        })
        .then(todos=>{
            res.status(200).json({
                todos: todos
            })
        })
        .catch(err=>{
            console.log(err.message)
            res.status(500).json({
                error : err.message
            })
        })
    }

    static show(req,res){
        Todo.findOne({
            _id: req.params.id
        })
        .then(todo=>{
            res.status(200).json({
                todo: todo
            })
        })
        .catch(err=>{
            res.status(500).json({
                err
            })
        })
    }

}

module.exports = TodoController