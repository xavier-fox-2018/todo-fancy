const bcrypt = require('bcryptjs')
const bcryptPassword = require('../helper/bcryptPass')
const User = require('../models/user')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GCLIENT_ID);
const jwt = require('jsonwebtoken')

const gSignin = function (req,res) {
    let token = req.body.gToken // ini dari req.body {token: valueToken}
    let clientId = process.env.GCLIENT_ID
    client.verifyIdToken({
        idToken : token,
        audience: clientId
    }, function(err, response) {
        if(!err){
            let emailUser = response.payload.email // ini dari payload email
            User.findOne({
                email: emailUser
            },function(error,response) {
                if (response) {
                    // console.log(process.env.JWT_SECRET);
                    // console.log(response.email);
                    // console.log(response);
                    const token = jwt.sign(response.email, process.env.JWT_SECRET)
                    
                    res.status(200).json({
                        email: response.email,
                        role: response.role,
                        token: token
                    })
                }
                else {
                    User.create({
                        email: emailUser,
                    }, function(error, response) {
                        if (response) {
                            const token = jwt.sign({emailUser}, process.env.JWT_SECRET)
                            res.status(201).json({
                                email: emailUser,
                                role: response.role,
                                token: token
                            })
                        }
                        else{
                            res.status(400).json({
                                message: `ini error create gsignin`
                            })
                        }
                    })
                }
            })
        }
    })
}



module.exports = {
    insert: (req,res) => {
        const newUser = new User ({
            email: req.body.email,
            password: req.body.password
        })
        bcryptPassword(newUser)
        newUser.save()
        .then((user) => {
            res.status(200).json({
                user: user,
                message: `User has been created`
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `User creation failed`
            })
        })
    },
    findAll: (req,res) => {
        User.find({})
        .then((user) => {
            res.status(200).json({
                user,
                message: `user has been found`
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `user can't be found`
            })
        })
    },
    findBy: (req,res) => {
        User.findById(req.params.id)
        .then((user) => {
            res.status(200).json({
                user: user,
                message: `a User has found `
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `User can't be found`,
                err: err
            })
        })
    },
    update: (req,res) => {
        User.updateOne(
            { _id: req.params.id},
            { 
                email: req.body.email,
                password: req.body.password
            },   
        )
        .then((user) => {
            User.findOne({ _id: req.params.id})
            .then((result) => {
                res.status(200).json({
                    result,
                    message: `User detail has been updated`
                })
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `failed updating User detail`
            })
        })
    },
    remove: (req,res) => {
        User.findOne({ _id: req.params.id})
        .then((user) => {
            User.deleteOne({_id: req.params.id})
            .then((result) => {
                res.status(200).json({
                    user,
                    message: `User detail has been deleted`
                })
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `User failed to delete`
            })
        })
    },
    signIn: (req,res) => {
        User.findOne({
            email: req.body.email,
        })
        .then((user) => {

            if (bcrypt.compareSync(req.body.password, user.password) === true ) {
                const token = jwt.sign({user}, process.env.JWT_SECRET)
                res.status(201).json({
                    id: user._id,
                    email: user.email,
                    role: user.role,
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