require('dotenv').config()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const axios = require('axios')
const hash = require('../helpers/hash')
const emailSender = require('../helpers/emailSender')
const errSignUp = require('../helpers/errorFilter')

const { sendVerification, sendWellcomeEmail } = emailSender

module.exports = {
  getAll (req, res) {
    User.find({})
    .then((result) => {
      let data=[]
      result.forEach(user=>{
        var obj={
          username: user.username,
          email: user.email,
          id: user._id
        }
        data.push(obj)
      })
      res.status(200).json({
        status: 'success',
        data: data
      })
    }).catch((err) => {
      res.status(500).json({
        status: 'failed',
        message: 'Error in server when getting all users'
      })
    });
  },
  login (req, res) {
    User.find({ email: req.body.email})
    .then(data => {
      if (data.length == 1) {
        if (hash.decodePass(data[0].password, req.body.password)) {
            let token = jwt.sign({
              id: data[0]._id,
              username: data[0].username,
              email: data[0].email
            }, process.env.JWT_SECRET)

            res.status(200).json({
              token: token,
              username: data[0].username,
              userId: data[0]._id
            })
          
        } else {
          res.status(404).json({
            status: 'failed',
            message: 'Wrong password or email'
          })
        }
      } else {
        res.status(404).json({
          status: 'failed',
          message: 'Wrong password or email'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 'failed',
        message: err.message
      })
    })
    
  },

  register (req, res) {
    let newUser = {
      email: req.body.email,
      username: req. body.username,
      password: hash.hash(req.body.password)
    }

    let user = new User(newUser)

    user.save()
      .then(data => {

        let verifyToken = jwt.sign({
          email: data.email
        }, process.env.JWT_SECRET)
        sendWellcomeEmail(data.email, data.fname)
        sendVerification(data.email, data.fname, verifyToken)

        res.status(201).json({
          status: 'success',
          message: 'creating account success, please verify your email and login',
          data: data
        })
      })
      .catch(err => {
        let errMsg = err.message
        // if (err.message.indexOf('User validation failed') != -1) {
        //   errMsg = errSignUp(err.message.slice(24))
        // } else if (err.message.indexOf('E11000') !== -1 && err.message.indexOf('email') !== -1) {
        //   errMsg = ['Email already taken']
        // } else if (err.message.indexOf('E11000') !== -1 && err.message.indexOf('username') !== -1) {
        //   errMsg = ['Username already taken']
        // }
        res.status(500).json({
          status: 'failed',
          err
        })
      })
  },
  loginGoogle (req, res) {
    let token = req.headers.id_token
    axios({
      url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`,
      method: 'get'
    })
      .then(data => {
        console.log(data.data)
        User.find({
          email: data.data.email
        })
          .then(user => {
            if (user.length === 1) {
              const token = jwt.sign({
                id: user[0]._id,
                username: user[0].username,
                email: user[0].email
              }, process.env.JWT_SECRET)
  
              res.status(200).json({
                status: 'success',
                token: token,
                username: user[0].username,
                userId: user[0]._id
              })
            } else {
              let newData = {
                username: data.data.name,
                email: data.data.email,
                password: hash.hash(process.env.GOOGLE_LOGIN_PASS)
              }
              let user = new User(newData)
              user.save()
                .then(data => {
                  const token = jwt.sign({
                    id: data._id,
                    username: data.username,
                    email: data.email
                  }, process.env.JWT_SECRET)
                  res.status(200).json({
                    status: 'success',
                    token: token,
                    username: newData.username,
                    userId: data._id
                  })
                })
                .catch(err => {
                  res.status(500).json({
                    status: 'failed',
                    message: 'error when creating new data',
                    err: err.message
                  })
                })
            }
          })
          .catch(err => {
            res.status(500).json({
              status: 'failed',
              message: 'failed when sign up (internal server error)'
            })
          })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          err: err.message
        })
      })
    },

  verifyEmail (req, res) {
    let token = req.params.token
    let decoded = jwt.verify(token, process.env.JWT_SECRET)

    User.updateOne({ email: decoded.email}, { verified: 1 })
      .then(data => {
        res.status(200).json({
          status: 'success',
          message: 'verifying email success'
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: 'verifying email failed',
          err: err.message
        })
      })
  }
}
