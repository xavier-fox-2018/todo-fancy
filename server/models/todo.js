const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/todo_fancy', { useNewUrlParser: true })

const TodoSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please input the name of your task']
  },
  description: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  },
  due_date: {
    type: Date
  },  
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo
