const Todo = require('../models/todo')

module.exports = {
    insert: (req,res) => {
        const newTodo = new Todo ({
            title: req.body.title,
            date_time: req.body.date_time,
            description: req.body.description
        })
        newTodo.save()
        .then((todo) => {
            res.status(200).json({
                todo: todo,
                message: `Todo has been created`
            })
        })
        .catch((err) => {
            res.status(500).json({
                err,
                message: `Todo creation failed`
            })
        })
    },
    findAll: (req,res) => {
        Todo.find({})
        .then((todo) => {
            res.status(200).json({
                todo,
                message: `Todo has been found`
            })
        })
        .catch((err) => {
            res.status(500).json({
                err,
                message: `Todo can't be found`
            })
        })
    },
    findBy: (req,res) => {
        Todo.findById(req.params.id)
        .then((todo) => {
            res.status(200).json({
                Todo: todo,
                message: `a Todo has found `
            })
        })
        .catch((err) => {
            res.status(500).json({
                err,
                message: `Todo can't be found`
            })
        })
    },
    update: (req,res) => {
        Todo.updateOne(
            { _id: req.params.id},
            { 
                title: req.body.title,
                date_time: req.body.date_time,
                description: req.body.description
            },   
        )
        .then((todo) => {
            Todo.findOne({ _id: req.params.id})
            .then((result) => {
                res.status(200).json({
                    result,
                    message: `Todo detail has been updated`
                })
            })
        })
        .catch((err) => {
            res.status(500).json({
                err,
                message: `failed updating Todo detail`
            })
        })
    },
    remove: (req,res) => {
        Todo.findOne({ _id: req.params.id})
        .then((todo) => {
            Todo.deleteOne({ _id: req.params.id})
            .then((result) => {
                res.status(200).json({
                    todo,
                    message: `Todo detail has been deleted`
                })
            })
        })
        .catch((err) => {
            res.status(500).json({
                err,
                message: `Todo failed to delete`
            })
        })
    }
}