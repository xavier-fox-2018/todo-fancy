var models = require('../models/user.js');
var crypto = require("crypto");
var jwt = require('jsonwebtoken');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const request = require('request');
class UserController {
    static signup(req, res) {
        let _salt = crypto.randomBytes(256).toString('hex')
        let pass = crypto.createHmac('sha256', _salt).update(req.body.password).digest('hex')
        models.findOne({ email: req.body.email })
            .then(function(data) {
                if (!data) {
                    models.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: pass,
                        oauth: false,
                        salt: _salt
                    }, function(err) {
                        if (err) {
                            console.log(err);
                            res.status(500).json(err.message)
                        } else {
                            res.status(200).json('Signup successfull')
                        }
                    })
                } else {
                    res.status(400).json('Email already taken')
                }
            })
            .catch(function(err) {
                res.status(400).json(err)
            })
    }
    static signin(req, res) {
        models.findOne({ email: req.body.email })
            .then(function(data) {
                if (data) {
                    let pass = crypto.createHmac('sha256', data.salt).update(req.body.password).digest('hex')
                    if (data.password === pass) {
                        let obj = {
                            id: data.id,
                            email: req.body.email,
                            password: pass
                        }
                        let token = jwt.sign(obj, process.env.JWT_SECRET);
                        res.status(200).json(token)
                    } else {
                        res.status(400).json(`Incorrect password`)
                    }
                } else {
                    res.status(400).json(`Incorrect Email`)
                }
            })
            .catch(function(err) {
                res.status(500).json({
                    message: "err",
                    err: err
                })
            })
    }
    static gsignin(req, res) {
        client.verifyIdToken({
            idToken: req.body.gtoken,
            audience: process.env.CLIENT_ID
        }, function(err, result) {
            if (err) {
                console.log('error sini')
                res.status(500).json('error from server routes/users.js gsignin')
            } else {
                const payload = result.getPayload(); //udah bisa dapet name sama Email
                const userid = payload['sub'];
                models.findOne({ email: payload.email })
                    .then(function(data) {
                        let obj = {
                            email: payload.email
                        }
                        let token = jwt.sign(obj, process.env.JWT_SECRET);
                        if (data) {
                            res.json(token)
                        } else {
                            models.create({
                                    name: payload.name,
                                    email: payload.email,
                                    password: null,
                                    oauth: true,
                                    salt: null
                                })
                                .then(function() {
                                    res.status(200).json(token)
                                })
                        }
                    })
                    .catch(function(err) {
                        res.status(500).json('error from server routes/users.js gsignin')
                    })
            }
        });
    }
    static getTodos(req, res) {
        let token = req.headers["token"];
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        models.findOne({ email: decoded.email }).populate('todolist')
            .then(function(data) {
                if (data.password === decoded.password || data.oauth === true) {
                    if (!data) {
                        res.json(null)
                    } else {
                        res.json(data.todolist)
                    }
                }
            })
            .catch(function(err) {
                res.status(400).json(err)
            })
    }
    static createTodos(req, res) {
        let token = req.headers["token"];
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let now = new Date()
        let input = new Date(req.body.due_date)
        if (input < now) {
            res.status(401).json('Invalid Date')
        } else {
            request.post("http://localhost:3000/todos/create", {
                json: {
                    name: req.body.name,
                    description: req.body.description,
                    due_date: new Date(new Date(req.body.due_date))
                }
            }, function(err, response, body) {
                if (err || response.statusCode !== 200) {
                    console.log(err);
                    res.status(500).json(body)
                } else {
                    models.updateOne({ email: decoded.email }, { $push: { todolist: { _id: body._id } } })
                        .then(function(data) {
                            res.status(200).json('created')
                        })
                        .catch(function(err) {
                            res.status(500).json('server route create todo error')
                        })
                }
            });
        }
    }
    static deleteTodos(req, res) {
        let token = req.headers["token"];
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.delete(`http://localhost:3000/todos/delete/${req.params.id}`, function(err, response, body) {
            if (err || response.statusCode !== 200) {
                console.log(err);
                res.status(500).json(body)
            } else {
                models.updateOne({ email: decoded.email }, { $pull: { todolist: { _id: req.params.id } } })
                    .then(function(data) {
                        res.status(200).json('Deleted')
                    })
                    .catch(function(err) {
                        res.status(500).json('server route users/delete error')
                    })
            }
        });
    }
    static getTodosCompleted(req, res) {
        let token = req.headers["token"];
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        models.findOne({ email: decoded.email }).populate('todolist')
            .then(function(data) {
                if (data.password === decoded.password || data.oauth === true) {
                    if (!data) {
                        res.json(null)
                    } else {
                        var result = data.todolist.filter(datum => datum.status === "completed");
                        res.json(result)
                    }
                }

            })
            .catch(function(err) {
                res.status(400).json(err)
            })
    }
}
module.exports = UserController