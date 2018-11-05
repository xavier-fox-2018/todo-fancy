const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    status: {type: String, required: true, default:"not done"},
    dueDate: {type: Date, required: true},
    UserId: {type: String, required: true}
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo