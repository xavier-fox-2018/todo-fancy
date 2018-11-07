const gSignin = require('../helper/gSignIn')
const Todo = require('../models/todo')

module.exports = {
    insert: (req,res) => {
        const newTodo = new Todo ({
            title: req.body.title,
            date_time: req.body.date_time,
            description: req.body.description
        })
        newTodo.save()
        .then((Todo) => {
            res.status(200).json({
                Todo: Todo,
                message: `Todo has been created`
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `Todo creation failed`
            })
        })
    },
    findAll: (req,res) => {
        Todo.find({})
        .then((Todo) => {
            res.status(200).json({
                Todo,
                message: `Todo has been found`
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `Todo can't be found`
            })
        })
    },
    findBy: (req,res) => {
        Todo.findById(req.params.id)
        .then((Todo) => {
            res.status(200).json({
                Todo: Todo,
                message: `a Todo has found `
            })
        })
        .catch((err) => {
            res.status(500).json({
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
                message: `Todo failed to delete`
            })
        })
    },
    signIn: (req,res) => {
        Todo.findOne({where: {
            email: req.body.email,
        }})
        .then((Todo) => {
            if (bcrypt.compareSync(req.body.password, Todo.password) === true ) {
                const token = jwt.sign({Todo}, process.env.JWT_SECRET)
                res.status(201).json({
                    Todo: Todo,
                    token: token
                })
            }
            else {
                let err = {
                    message: 'Username or password wrong'
                }
                res.status(400).json(err)
            }
        })
        .catch((err)=> {
            // console.log(err)
            res.status(400).json({
                message: err.message
            })
        })
    },
    gSignin,
}