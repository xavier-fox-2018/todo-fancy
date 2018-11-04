const Todo = require('../models/todo')
const User = require('../models/user')
const {hashPassword, generateSalt, comparePassword} = require('../helpers/helper')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');

class TodoController {

   static login(req, res) {
        User.findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    const pwd = comparePassword(req.body.password, user.password)
                    if (pwd) {
                        const data = {
                            name: user.fullName,
                            email: user.email,
                            todos: user.todos
                        }
                        const token = jwt.sign(data, process.env.JWT_TOKEN)

                        res.status(200).json({token: token})
                    } else {
                        res.status(400).json({message: 'invalid password'})
                    }
                } else {
                    res.status(400).json({message: 'no user found'})
                }
               
            })
            .catch(err => {
                res.status(500).json({err})
            })
    }

    static register(req, res) {       
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                res.status(400).json({
                    message: 'email already registered'
                })
            } else {
                let salt = generateSalt(10)
                let password = hashPassword(req.body.password, salt)
                User.create({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: password
                })
                .then(user => {
                    res.status(201).json({message: 'registration successfull'})
                })
                .catch(err => {
                    res.status(500).json({err})
                })
            }
            
        })
    }
 

    static googleLogin(req, res) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        client.verifyIdToken({
            idToken: req.body.gToken,
            audience: process.env.CLIENT_ID
        }, (err, data) => {
            if (err) throw err
            const payload = data.getPayload()
            const userId = payload['sub'] 
            // console.log(payload)
            User.findOne({
                email: payload.email
            })
            .then(user => {
                if (user) {
                    const token = jwt.sign({
                        id: user._id,
                        fullName: user.fullName,
                        email: user.email
                     }, process.env.JWT_TOKEN)
                    res.status(201).json({token: token})
                }else {
                    User.create({
                        fullName: payload.name,
                        email: payload.email,
                        password: process.env.USER_PASSWORD
                    })
                    .then(user => {
                        const token = jwt.sign({
                            id: user._id,
                            fullName: user.fullName,
                            email: user.email
                         }, process.env.JWT_TOKEN)
                        res.status(201).json({token: token})
                    })
                    .catch(err => {
                        res.status(500).json({err})
                    })
                }
            })
            .catch(err => {
                res.status(500).json({err})
            })

        })
    }

    static getAll(req, res) {
        Todo.find({
            user: req.user._id
        })
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(err => {
            res.status(500).json({err})
        })
           
    }

    static create(req, res) {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            user: req.user._id
        })
        .then(todo => {
            User.findByIdAndUpdate(req.user._id, {
                $push: {
                    todos: todo._id
                }
            })
            .then(user => {
                res.status(200).json({message: 'succ create todo'})
            })                
            
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static delete(req, res) {
        Todo.deleteOne({
            _id: req.params.id,
            user: req.user._id
        })
        .then(() => {
            User.findByIdAndUpdate(req.user._id, {
                $pull: {
                    todos: req.params.id
                }
            })
            .then(() => {
                res.status(200).json({message: 'success delete todo'})
            })
            .catch(err => {
                res.status(500).json({err})
            })
        })
    }

    static complete(req, res) {
        Todo.findByIdAndUpdate(req.params.id, {
            isComplete: true
        })
        .then(() => {
            res.status(200).json({message: 'succ complete a task'})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static uncomplete(req, res) {
        Todo.findByIdAndUpdate(req.params.id, {
            isComplete: false
        })
        .then(() => {
            res.status(200).json({message: 'succ UnComplete a task'})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static update(req, res) {
        Todo.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority
        })
        .then(() => {
            res.status(201).json({message: 'succ update a task'})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }

}

module.exports = TodoController