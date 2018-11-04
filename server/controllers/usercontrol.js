require('dotenv').config()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);

class UserController {
  static readUser(req, res, next) {
    User.find().populate('todo', '_id name dueDate description status', null, {sort: {dueDate: 1}}).select('-password')
      .then(data => {
        res.status(200).json({
          result: data,
          error: null
        })
      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: {
            status_code: 'SERVER_ERROR',
            message: error.message
          }
        })
      })
  }
  static createUserLocal(req, res, next) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      OAuth: false
    })
      .then(user => {
        res.status(201).json({
          result: user,
          error: null
        })
      })
      .catch(error => {
        if (error.errors.email) {
          res.status(400).json({
            result: null,
            error: {
              error_code: error.errors.email.properties.error_code,
              message: error.errors.email.message
            }
          })
        } else if (error.errors.password) {
          res.status(400).json({
            result: null,
            error: {
              error_code: error.errors.password.message,
              message: 'password cannot be empty'
            }
          })
        } else {
          res.status(500).json({
            result: null,
            error: error
          })
        }
      })
  }
  static loginUserLocal(req, res, next) {
    User.findOne({ email: req.body.email })
      .then(data => {
        if (data) {
          if (bcrypt.compareSync(req.body.password, data.password)) {
            let token = jwt.sign({
              id: data._id,
              name: data.name,
              email: data.email
            }, process.env.JWT_SECRET)
            res.status(200).json({
              result: {
                message: 'successfully logged in',
                token
              },
              error: null
            })
          } else {
            res.status(400).json({
              result: null,
              error: {
                error_code: 'WRONG_PASSWORD',
                message: 'wrong password'
              }
            })
          }
        } else {
          res.status(404).json({
            result: null,
            error: {
              message: 'email is not registered'
            }
          })
        }

      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: error
        })
      })
  }
  static loginUserGoogle(req, res, next) {
    client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.GOOGLE_CLIENTID
    }, (error, response) => {
      const payload = response.getPayload();
      console.log(payload)
      User.findOne({ email: payload.email })
        .then(data => {
          console.log(data)
          if (data) {
            res.status(200).json({
              result: data,
              token: jwt.sign({ 
                id: data._id,
                name: data.name,
                email: data.email 
              }, process.env.JWT_SECRET),
              error: null
            })
         } else {
            User.create({
              name: payload.name,
              email: payload.email,
              password: 'q1w2e3r4',
              OAuth: true
            })
              .then(data => {
                res.status(200).json({
                  result: data,
                  token: jwt.sign({ 
                    id: data._id,
                    name: data.name,
                    email: data.email }, process.env.JWT_SECRET),
                  error: null
                })
              })
              .catch(error => {
                res.status(500).json({
                  result: null,
                  error: error
                })
              })
          }
        })
        .catch(error => {
          res.status(500).json({
            result: null,
            error: {
              error_code: error
            }
          })
        })
    });

  }
  static updatePassword(req, res, next) {

  }
  static dashboard(req, res, next) {
    let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
    if(decoded){
      User.findOne({
        _id: decoded.id
      })
      .populate('todo', '_id name dueDate description status', null, {sort: {dueDate: 1}})
      .select('-password')
      .then(data => {
        if(data){
          res.status(200).json({
            result: data,
            error: null
          })
        }else{
          res.status(404).json({
            result: null,
            error: {
              message: 'no such user'
            }
          })
        }
      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: {
            error_code: error
          }
        })
      })
    }else{
      res.status(500).json({
        result: null,
        error: {
          error_code: error
        }
      })
    }
    
  }
}

module.exports = UserController;