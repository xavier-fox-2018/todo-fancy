const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Controller {
    static register(req,res){
        let checkname = req.body.name.length
        let checkemail = validateEmail(req.body.email)
        let checkpassword = req.body.password.length

        // cek panjang input name dan password
        if(checkname < 4 || checkpassword < 4){
            res.status(400).json({
                message : 'Minimum name & password length is 4'
            })
        }

        // cek format email
        if(checkemail !== true){
            res.status(400).json({
                message : 'Invalid email format'
            })
        }
        
        bcrypt.hash(req.body.password, 10).then(function(hash) {
            User.create({
                name : req.body.name,
                email : req.body.email,
                password : hash,
                oauth : false
            })
            .then((result)=>{
                res.status(201).json({
                    data : result,
                    message : 'Register Success' 
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    error : err,
                    message : 'Internal Server Error, Register Failed'
                })
            })
        });
    }

    static login(req,res){
        User.findOne({
            email : req.body.email
        })
        .then((user)=>{
            bcrypt.compare(req.body.password, user.password)
            .then(function(result) {
                if(result === true){
                    let token = jwt.sign({
                        id : user._id,
                        name : user.name,
                        email : user.email
                    },process.env.secret_key)   

                    res.status(200).json({
                        token : token
                    })
                }else{
                    res.status(500).json({
                        message : 'Invalid Password'
                    })
                }
            })
            .catch((err)=>{
                res.status(500).json({
                    error : err,
                    message : 'Internal Server Error'
                })
            })
        })
        .catch((err)=>{
            res.status(500).json({
                error : err,
                message : `Invalid Email`
            })
        })
    }
}



module.exports = Controller