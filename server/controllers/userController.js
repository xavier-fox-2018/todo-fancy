const User = require('../models/user.js');
const helper = require('../helper/helper.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('../models/task.js');

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
      const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
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
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
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

}

module.exports = userController;