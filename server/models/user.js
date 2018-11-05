const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/todo_fancy', { useNewUrlParser: true })

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please input your name']
  },
  email: {
    type: String,
    required: [true, 'please input your email']
  },
  password: {
    type: String,
    minlength: [6, 'Minimum password length is 6']
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
