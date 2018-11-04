const User = require('../models/user.js');
const helper = require('../helper/helper.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('../models/task.js');
const isAuthorized = require('../middlewares/isAuthorized.js');

require('dotenv').config()

class userController {

  static createUser (req, res) {
    const hash = helper.hashPassword(req.body.password);
    User
      .create({
        username : req.body.username,
        email : req.body.email,
        password : hash
      })
      .then(() => {
        res.status(201).json({
          msg : 'User successfully created !'
        })
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  }

  static loginUser (req, res) {
    User.findOne({
      email : req.body.email
    })
      .then((user) => {
        const result = bcryptjs.compareSync(req.body.password, user.password);
        if (result) {
          userController.generateToken(user.email, user._id)
            .then((token) => {
              res.status(200).json({
                msg : 'login success',
                JWT_TOKEN : token
              })
            })
            .catch((err) => {
              res.status(500).json(err)
          })
        } else {
          res.status(500).json({
            msg : 'invalid email / password'
          })
        }
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({
          msg : 'Invalid email / password'
        })
      })
  }

  static loginGoogle (req, res) {
    User
      .findOne({
        email: req.decoded.email,
        isGoogle: true
      })
      .then((data) => {                                                
          if(!data){
              res.status(400).json({ msg: "user not found" })
          } else {        
              userController.generateToken(data.email, data._id)
                .then((token) => {
                  res.status(200).json({ token: token })
                })
                .catch((err) => {
                  res.status(500).json(err)
                })                        
          }
      })
      .catch((err) => {
          res.status(500).json({ msg: err })
      })
  }

  static generateToken (email, id) {
    return new Promise ((resolve, reject) => {
      const user = {
        'email' : email,
        'id' : id
      }
      const token = jwt.sign(user, process.env.JWT_SECRET);
      token ? resolve(token) : reject('generete token failed')
    }) 
  }

  static createTask(req, res) {
    try {
      const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
          Task
            .create({
              taskName : req.body.taskName,
              taskDescription : req.body.description,
              taskStatus : req.body.status,
              taskDate : req.body.dueDate,
              userId : decoded.id
            })
            .then(() => {
              res.status(200).json({
                msg : 'create task success'
              })
            })
            .catch((err) => {
              res.status(500).json(err)
            })
    } catch(err) {
        res.status(500).json(err)
    }
  }

  static getTask(req, res) {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
      Task
        .find({
          userId : decoded.id
        })
        .sort({taskDate: 'asc'})
        .then((data) => {
          const task = data.map(data => {
            const taskContent = {};
            taskContent.id = data._id;
            taskContent.name = data.taskName;
            taskContent.description = data.taskDescription;
            taskContent.date = String(data.taskDate).slice(4,15);
            taskContent.status = data.taskStatus;
            return taskContent;
          })
          console.log(task);
          
          res.status(200).json(task)
        })
        .catch(err => {
          res.status(500).json(err)
        })
  }

  static deleteTask(req, res) {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
        Task
          .findOne({
            _id : req.params.id
          })
          .then(task => {
            if (task.userId.equals(decoded.id)) {
              Task
                .deleteOne({
                _id : req.params.id
                })
                .then(() => {
                  res.status(200).json({
                    msg : 'success delete task'
                  })
                  console.log('delteeeee');
                })
                .catch((err) => {
                  res.status(500).json(err)
                })
            } else {
              res.status(500).json({
                msg : 'Unauthorized access'
              })
            }
           })
           .catch(err => {
             res.status(500).json(err);
           }) 
  }

  static getUserByEmail(email) {
    return new Promise ((resolve, reject) => {
      User
        .findOne({
        email : email
        })
        .then((user) => {
          resolve(user)
        })
        .catch(err => {
          reject(err)
        })
    }) 
  }

  static updateTask(req, res) {
    try {
          Task
            .findById(req.body.taskId)
            .then(data => {
              data.taskName = req.body.name;
              data.taskDescription = req.body.desc;
              data.taskStatus = req.body.status;
              data.taskDate = new Date(req.body.date);
              return data.save();
            })
            .then((result) => {
              res.status(200).json({
                msg: 'data update success'
              })
            })
            .catch(err => {
              res.status(500).json(err)
            })
    } catch(err) {
        res.status(500).json(err)
    }
  }

  static registerWithGoogle(req, res, next) {
      User.findOne({
          email: req.decoded.email
      })
      .then((result) => {
          if(!result){
              User.create({
                  email: req.decoded.email,
                  username: req.decoded.username,
                  isGoogle: true,
                  password: helper.hashPassword(process.env.PASS)
              })
              .then((result) => {
                next()
              })
              .catch((err) => {
                  res.status(500).json({err: err})
              });
          } else {
              next()
          }
      }).catch((err) => {
          res.status(500).json({err: err})
      });
  }
}

module.exports = userController;