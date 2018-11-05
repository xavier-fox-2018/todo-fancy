const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo