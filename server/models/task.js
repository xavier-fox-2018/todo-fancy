const mongoose = require('mongoose')

const Schema = mongoose.Schema
const User = require('./user')

const taskSchema = new Schema({
  category: {
    type: String,
    required: [true, 'task category is required']
  },
  title: {
    type: String,
    required: [true, 'title is required']
  },
  description: {
    type: String,
    default: 'No Description'
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  priority: {
    type: String,
    default: 'medium'
  },
  location: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'userId is required']
  },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
  },
  done: {
    type: Number,
    default: 0
  },
  late: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

taskSchema.post('save', doc => {
  User.updateOne({ _id: doc.userId }, {$push: {taskId: doc._id}})
    .then(data => {
      
    })
    .catch(err => {
      throw new Error('error when create user task')
    })
})


const Task = mongoose.model('Task', taskSchema)

module.exports = Task