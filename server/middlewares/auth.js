const jwt = require('jsonwebtoken')
require('dotenv').config()
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID)
const User = require('../models/users')
const Group = require('../models/groups')
const Todo = require('../models/todos')

module.exports = {
    isLogin: (req, res, next) => {
        let token = req.headers.token
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                // next("Please Login first")
                res.status(400).json({err: err})
            } else {                
                User.findOne({
                    email: decoded.email
                })
                .then((result) => {
                    // console.log(decoded);
                    if(result){
                        req.decoded = decoded                                                
                        next()
                    } else {
                        res.status(400).json({msg: 'forbiden'})
                    }
                }).catch((err) => {
                    res.status(400).json({err: err})
                });
            }
        })
    },
    validGoogleToken: function(req, res, next){
        client.verifyIdToken({
            idToken: req.body.token,
            audience: CLIENT_ID
        }, function(err, result) {
            if(err){
                res.send(500).json(err)
            } else {
                const payload = result.getPayload();
                // console.log(payload);
                let user = {
                    email: payload.email,
                    name: payload.name,
                    picture: payload.picture
                }
                req.decoded = user
                next()
            }
        })
    },
    notExist: function(req, res, next){
        Group.findOne({
            _id: req.body.groupId
        })
        .then((result) => {
            let cek = true
            // for (let i = 0; i < result.users.length; i++) {
            //     if(String(result.users[i]) === req.body.userId){
            //         cek = false
            //     }
            // }
            result.users.forEach(user => {
                if(String(user) === req.body.userId){
                    cek = false
                }
            });
            if(cek){
                next()
            } else {
                res.status(400).json({msg: 'user has joined group'})
            }
        }).catch((err) => {
            res.status(400).json({ err: err})
        });
    },
    isOwnerTask: function(req, res, next){
        Todo.findOne({
            _id: req.params.id
        })
        .then((result) => {            
            if(String(result.owner) === req.decoded.id){                
                next()
            }
        }).catch((err) => {
            res.status(400).json({ err: err })
        });
    },
    isMemberGroup: function(req, res, next){
        Group.findOne({
            _id: req.body.idGroup
        })
        .then((result) => {
            for (let i = 0; i < result.users.length; i++) {
               if(String(result.users[i]) === req.decoded.id){
                   next()
                   break;
               }
            }
        }).catch((err) => {
            res.status(400).json({ err: err })
        });
    },
    isGroupNotOwner: function(req, res, next){
        Todo.findOne({
            _id: req.params.id
        })
        .then((result) => {
            if(!result.isGroup && String(result.owner) === req.decoded.id){
                next()
            } else if(result.isGroup && String(result.owner) !== req.decoded.id){
                next()
            }
        }).catch((err) => {
            res.status(400).json({ err: err })
        });
    },
    isGroupOwner: function(req, res, next){
        Group.findOne({
            _id: req.params.id
        })
        .then((result) => {
            // console.log(result);
            if(String(result.owner) === req.decoded.id){
                next()
            }
        }).catch((err) => {
            res.status(400).json({ err: err })
        });
    }
    
}