const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/To-Do-Fancy');
const taskModel = require('../models/task-model.js')

class Task {

  static create (req,res) {
    taskModel.create({
      taskName: req.body.name,
      description: req.body.description,
      due: req.body.due,
      priority: req.body.priority,
      group: req.body.groupId || null,
      user: res.locals.authorization.id
    })
    .then( data => {
      res.status(200).json(data);
    })
    .catch (err => res.status(500).json(err))
  }
  static update (req,res) {
    taskModel.findByIdAndUpdate( 
      req.body.id, 
    {
      taskName: req.body.taskName,
      description: req.body.description,
      due: req.body.due,
      priority: req.body.priority,
      group: req.body.groupId || null,
    } , 
    {
      new:true
    }
    )
    .then( data => {
      res.status(200).json(data);
    })
    .catch (err => res.status(500).json(err))
  }
  static getAll (req,res) {
    taskModel.find({
      user: res.locals.authorization.id
    })
    .then( data => {
      res.status(200).json(data);
    })
    .catch (err => res.status(500).json(err))
  }
  
  static delete (req,res) {
    taskModel.findOneAndDelete({
      _id: req.body.id
    })
    .then( data => res.status(200).json(data))
    .catch (err => res.status(500).json(err))
  }
  static getOne (req,res) {
    taskModel.findOne({
      _id: req.body.id
    })
    .then( data => res.status(200).json(data))
    .catch (err => res.status(500).json(err))
  }
}

module.exports = Task;