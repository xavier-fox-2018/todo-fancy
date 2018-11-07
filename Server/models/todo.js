const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {
        type: String,
    },
    date_time: Date,
    description: {
        type: String,
    },
}, {
    timestamps : true
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo