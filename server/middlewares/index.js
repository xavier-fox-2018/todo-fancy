const Mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Todo = require('../models/todo')

class Middleware {
    static authenticate(req,res,next){
        let token = req.headers.token

        if(token){
            const decoded = jwt.verify(token, process.env.secret_key);

            req.userId = decoded.id
            next()

        }else{
            res.status(400).json({
                message : 'token not found'
            })
        }
    }

    static emailUnique(req,res,next){
        User.findOne({
            email : req.body.email
        })
        .then((result)=>{
            if(result){
                res.status(500).json({
                    message : 'Email Address Already in Use'
                })
            }else{
                next()
            }
        })
        .catch((err)=>{
            res.status(500).json({
                error : err,
                message : 'Internal Server Error'
            })
        })
    }

    static isOwner(req,res,next){
        Todo.findOne({
            _id : req.params.id
        })
        .then((task)=>{
            if(task.author._id.toString() === req.userId){
                next()
            }else{
                res.status(500).json({
                    message : `You can't modify other user task`
                })
            }
        })
        .catch((err)=>{
            res.status(500).json({
                message : `Middleware error, can't find specified task`
            })
        })
    }

    static isMember(req,res,next){
        
    }

    static findUser(req,res,next){
        User.findOne({
            email : req.body.invited
        })
        .then((user)=>{
            if(user){
                req.body.invited = user._id
                next() 
            }else{
                res.status(500).json({
                    message : 'Specified Email Not Found'
                })
            }
        })
        .catch((err)=>{
            res.status(500).json({
                message : `Middleware error`
            })
        })
    }
}

module.exports = Middleware