const jwt = require('jsonwebtoken')
const User = require('../models/user')

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

    }

    static isMember(req,res,next){
        
    }
}

module.exports = Middleware