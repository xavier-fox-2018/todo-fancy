const userModel = require('../models/user')
const Helpers = require('../helper/index')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')
const saltRounds = 10;

class Controller {

    static userLogin(req, res) {
        Helpers.getUserData(req.body.data)
            .then(data => {
                return userModel.findOne({
                    email: data.email
                })
            })
            .then(user => {
                if (user === null) {
                    return Helpers.createUser(req.body.data)
                } else {
                    return user
                }
            })
            .then(data => {
                res.status(200).json({
                    token: jwt.sign(JSON.stringify(data), process.env.JWT_Secret)
                })
            })
            .catch(err => {
                res.status(500).send(err.message)
            })
    }

    static loginManual(req, res) {
        // console.log()
        userModel.findOne({
            email: req.body.email
        })
            .then(data => {
                let checker = bcrypt.compareSync(req.body.password, data.password)
                if (checker == true) {
                    res.status(200).json({
                        token: jwt.sign(JSON.stringify(data), process.env.JWT_Secret)
                    })
                } else {
                    res.status(401).send(err.message)
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    static signup(req, res) {
        let pass = bcrypt.hashSync(req.body.password, saltRounds)
        let input = {
            name: req.body.name,
            email: req.body.email,
            password: pass,
            photo: req.body.photo
        }
        userModel.create(input)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }

    static userData(req, res) {
        Helpers.getUserDataServer(req.body.token)
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => {
                res.status(500).send(err.message)
            })
    }

    static createTask(req, res) {
        let updated = {
            name: req.body.name,
            descrpition: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate,
            isComplete: false
        }
        userModel.updateOne({
            email: jwt.verify(req.body.token, process.env.JWT_Secret).email
        }, {
                $push: { todo: updated }
            })
            .then(data => {
                res.send('success')
            })
            .catch(err => {
                res.status(500).send(err, message)
            })
    }

    static deleteTask(req, res) {
        Helpers.getUserDataServer(req.body.token)
            .then(data => {
                let filtered = data.todo.filter((value, index, arr) => {
                    return value.name != req.body.value
                })
                return userModel.update({
                    email: data.email
                }, {
                        todo: filtered
                    })
            })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }

    static updateTask(req, res) {
        let updatedTask = {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate,
            isComplete: false
        }
        Helpers.getUserDataServer(req.body.token)
            .then(data => {
                var userUpdate = data
                let filtered = data.todo.filter((value, index, arr) => {
                    return value.name != req.body.willUpdated
                })
                filtered.push(updatedTask)
                return userModel.updateOne({
                    email: data.email
                }, {
                        todo: filtered
                    })
            })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    static completeTask(req, res) {
        console.log(req.body)
        Helpers.getUserDataServer(req.body.token)
            .then(data => {
                let origin = data.todo.filter(function (value, index, arr) {
                    return value.name != req.body.val
                })
                let filtered = data.todo.filter(function (value, index, arr) {
                    return value.name == req.body.val
                })
                if (filtered[0].isComplete == false) {
                    filtered[0].isComplete = true
                    origin.push(filtered[0])
                } else {
                    filtered[0].isComplete = false
                    origin.push(filtered[0])
                }
                return userModel.updateOne({
                    email: data.email
                }, {
                        todo: origin
                    })
            })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send(err.message)
            })
    }

    static listComplete(req, res) {
        Helpers.getUserDataServer(req.body.token)
            .then(data => {
                let filtered = data.todo.filter(function (value, index, arr) {
                    return value.isComplete == true
                })
                res.json({
                    todo: filtered
                })
            })
            .catch(err => {
                res.status(500).send(err.message)
            })
    }

    static listIncomplete(req, res) {
        Helpers.getUserDataServer(req.body.token)
            .then(data => {
                let filtered = data.todo.filter(function (value, index, arr) {
                    return value.isComplete == false
                })
                res.json({
                    todo: filtered
                })
            })
            .catch(err => {
                res.status(500).send(err.message)
            })
    }

}

module.exports = Controller