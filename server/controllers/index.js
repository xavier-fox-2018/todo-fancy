//Models
const User = require('../models/user.js');
const toDo = require('../models/todo.js');
//Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
//JWT Token
const jwt = require('jsonwebtoken')
require('dotenv').config()
//Google Sign in
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = "1032017412855-ql6tievj34f1p5mpa4thb45l9vqigvu9.apps.googleusercontent.com"
//Helpers
const createJWTToken = require('../helpers/createJWT_Token.js')
const getTasks = require('../helpers/getTasks.js')

class Controller {
    static signUp(req, res) {
        //check if email is unique
        User
            .findOne({
                email: req.body.email
            })
            .then(data => {
                //if email found, state that email is not unique
                if (data) {
                    res.status(400).json({ message: 'Email already taken' })
                    //email is not taken ('data' is null)
                } else {
                    //encrypt password
                    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                        if (err) {
                            console.log(err)
                            res.status(500).json({ message: err.message, note: 'Please see console log for details' })
                        } else {
                            //add user to database
                            let hashedPass = ''
                            if (req.body.password) {
                                hashedPass = hash
                            } else {
                                hashedPass = req.body.password
                            }
                            let newUser = new User({
                                email: req.body.email,
                                password: hashedPass,
                            })
                            newUser.save(function (err) {
                                if (err) {
                                    console.log(err)
                                    res.status(400).json({ message: err.message, note: 'Please see console log for details' })
                                } else {
                                    res.status(201).json({ message: `You have successfully signed up` })
                                }
                            })
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message, note: 'Please see console log for details' })
            })
    }
    static signIn(req, res) {
        // find in databse user with email given
        User
            .findOne({
                email: req.body.email
            })
            .then(data => {
                //check password
                let hash = data.password
                bcrypt.compare(req.body.password, hash, function (err, result) {
                    if (err) {
                        console.log(err)
                        res.status(500).json({ message: err.message, note: 'Please see console log for details' })
                    } else {
                        if (result) {
                            return createJWTToken(data)
                                .then(token => {
                                    res.status(200).json({ message: 'Successfully signed in. Please take note of your token', token: token })
                                })

                        } else {
                            res.status(400).json({ message: 'Password is incorrect' })
                        }

                    }
                });
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(
                    {
                        message: err.message,
                        note: 'Please see console log for further details'
                    })
            })
    }
    static google_signin(req, res) {
        const client = new OAuth2Client(CLIENT_ID);
        client.verifyIdToken({
            idToken: req.body.google_token,
            audience: CLIENT_ID
        }, function (err, result) {
            if (err) {
                console.log(err)
                res.status(500).json(
                    {
                        message: err.message,
                        note: 'Please see console log for further details'
                    })
            } else {
                const payload = result.getPayload()
                //check if the email is already in database
                User
                    .findOne({
                        email: payload.email
                    })
                    .then(data => {
                        if (data) {
                            //create token if user is already registered
                            return createJWTToken(data)
                                .then(token => {
                                    res.status(200).json({ message: 'Successfully signed in. Please take note of your token', token: token })
                                })
                        } else {
                            //create new User and save to DB
                            //hash password
                            bcrypt.hash(payload.email, saltRounds, function (err, hash) {
                                if (err) {
                                    console.log(err)
                                    res.status(500).json({ message: err.message, note: 'Please see console log for details' })
                                } else {

                                    let newUser = new User({
                                        email: payload.email,
                                        password: hash // since password is required, we will default it as the Googleuser's email 
                                    })
                                    return newUser.save()
                                        .then(data => {
                                            //make JWT Token
                                            return createJWTToken(data)
                                        })
                                        .then(token => {
                                            res.status(201).json({ message: 'User successfully created. Please take note of your token', token: token })
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            res.status(500).json(
                                                {
                                                    message: err.message,
                                                    note: 'Please see console log for further details'
                                                })
                                        })
                                }
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json(
                            {
                                message: err.message,
                                note: 'Please see console log for further details'
                            })
                    })
            }
        })
    }
    static decode(req, res) {
        let decoded = jwt.verify(req.body.token, process.env.JWT_secret)
        res.status(200).json({ data: decoded })
    }

    //To Do Methods
    static addToDo(req, res) {
        let split = req.body.description.split("\n")
        let join = split.join(" ")
        let newtoDo = new toDo({
            name: req.body.name,
            description: join,
            status: false,
            created_date: new Date(),
            due_date: req.body.due_date,
            user: req.body.user
        })
        newtoDo.save(function (err) {
            if (err) {
                console.log(err)
                res.status(500).json({ message: err.message, note: 'Please see console log for details' })
            } else {
                res.status(201).json({ message: 'Task succesfully added' })
            }
        })
    }
    static getToDo(req, res) {
        let id = Object.keys(req.body)
        User
            .findById(id[0])
            .then(data => {
                //get list of todo based on id
                return toDo
                    .find({
                        user: data._id
                    })
            })
            .then(tasks => {
                return getTasks(tasks)
            })
            .then(formattedTasks => {
                res.status(200).json({ tasks: formattedTasks })
            })
            .catch(err => {
                console.log('err')
                res.status(500).json({ message: err.message, note: 'Please see console log for details' })
            })
    }
    static editToDo(req, res) {
        let split = req.body.description.split("\n")
        let join = split.join(" ")
        toDo
            .update(
                {
                    _id: req.body.id
                },
                {
                    name: req.body.name,
                    description: join,
                    status: req.body.status
                }
            )
            .then(data => {
                res.status(200).json({ message: "Data has been updated" })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message, note: 'Please see console log for details' })
            })
    }
    static deleteToDo(req, res) {
        toDo
            .deleteOne({
                _id: req.body.id
            })
            .then(data => {
                res.status(200).json({ message: "Task deleted" })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message, note: 'Please see console log for details' })
            })
    }
    static getByDue(req, res) {
        let id = Object.keys(req.body)
        User
            .findById(id[0])
            .then(data => {
                //get list of todo based on id
                return toDo
                    .find({
                        user: data._id
                    })
                    .sort(
                        {
                            due_date: 1
                        }
                    )
            })
            .then(tasks => {
                return getTasks(tasks)
            })
            .then(formattedTasks => {
                res.status(200).json({ tasks: formattedTasks })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message, note: 'Please see console log for details' })
            })
    }
    static getByCreated(req, res) {
        let id = Object.keys(req.body)
        User
            .findById(id[0])
            .then(data => {
                //get list of todo based on id
                return toDo
                    .find({
                        user: data._id
                    })
                    .sort(
                        {
                            created_date: 1
                        }
                    )
            })
            .then(tasks => {
                return getTasks(tasks)
            })
            .then(formattedTasks => {
                res.status(200).json({ tasks: formattedTasks })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message, note: 'Please see console log for details' })
            })
    }
    static getByName(req, res) {
        let id = Object.keys(req.body)
        User
            .findById(id[0])
            .then(data => {
                //get list of todo based on id
                return toDo
                    .find({
                        user: data._id
                    })
                    .sort(
                        {
                            name: 1
                        }
                    )
            })
            .then(tasks => {
                return getTasks(tasks)
            })
            .then(formattedTasks => {
                res.status(200).json({ tasks: formattedTasks })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message, note: 'Please see console log for details' })
            })
    }
    static getByDescription(req, res) {
        let id = Object.keys(req.body)
        User
            .findById(id[0])
            .then(data => {
                //get list of todo based on id
                return toDo
                    .find({
                        user: data._id
                    })
                    .sort(
                        {
                            description: 1
                        }
                    )
            })
            .then(tasks => {
                return getTasks(tasks)
            })
            .then(formattedTasks => {
                res.status(200).json({ tasks: formattedTasks })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message, note: 'Please see console log for details' })
            })
    }
    static getByStatus(req, res) {
        let id = Object.keys(req.body)
        User
            .findById(id[0])
            .then(data => {
                //get list of todo based on id
                return toDo
                    .find({
                        user: data._id
                    })
                    .sort(
                        {
                            status: 1
                        }
                    )
            })
            .then(tasks => {
                return getTasks(tasks)
            })
            .then(formattedTasks => {
                res.status(200).json({ tasks: formattedTasks })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message, note: 'Please see console log for details' })
            })
    }
}

module.exports = Controller