const User = require('../models/User')
const jwt = require('../helpers/jwtEncoder')
const hash = require('../helpers/hashBcrypt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
    static register(req,res){
        User.find({
            email: req.body.email
        })
        .then(user=>{
            if(user.length === 0){
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                .then(newUser=>{
                    res.status(200).json({
                        user: newUser,
                        message: "success register"
                    })
                })
                .catch(err=>{
                    res.status(500).json({
                        message: "can not register"
                    })
                })
            } else {
                res.status(400).json({
                    message: "Email is already taken, choose another or signin"
                })
            }
        })
        .catch(err=>{
            res.status(401).json({
                error: err.message
            })
        })
    }

    static signin(req,res){
        // console.log(typeof req.body.email)
        User.findOne({
            email : req.body.email
        })
        .then(user =>{
            if(hash.decode(req.body.password, user.password)){
                let data = {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
                res.status(200).json({
                    name: user.name,
                    token: jwt.encode(data)
                })
            } else {
                res.status(401).json({
                    message: "Email and Password mismatch!"
                })
            }
        })
        .catch(err=>{
            res.status(401).json({
                message: "Your email doesn't match our records",
                error : err.message
            })
        })
    }

    static gsignin(req,res){
        client.verifyIdToken({
            idToken: req.body.gtoken,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        }).then(ticket => {
            const payload = ticket.getPayload();
            console.log('payload: ', payload)
            User.findOne({
                email: payload.email
            }).then(user =>{
                // console.log(!user, '====user')
                if(!user){
                    User.create({
                        name: payload.name,
                        email:payload.email
                    })
                    .then(newUser=>{
                        let userData = {
                            name: newUser.name,
                            email: newUser.email
                        }
                        res.status(200).json({
                            token:jwt.encode(userData)
                        })
                    })
                    .catch(error=>{
                        console.log(error)
                        res.status(500).json({
                            error: error.message
                        })
                    })
                } else {
                    let userData = {
                        name : user.name,
                        email: user.email
                    }
                    res.status(200).json({
                        token:jwt.encode(userData)
                    })
                }
            })
        })
        .catch(err=>{
            res.status(500).json({
                err: err.message
            })
        })
    
    }
}

module.exports = UserController