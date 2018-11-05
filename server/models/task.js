const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: String,
    description: String,
    status: {
        type: String,
        default: 'pending'
    },
    due_date: Date,
    username: String
})

const Task = mongoose.model('Task', taskSchema)


module.exports = Task;

