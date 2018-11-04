const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser:true});

const Schema = mongoose.Schema
const toDoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date
    },
    due_date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
		required: true
    }  
})

const toDo = mongoose.model('Todo', toDoSchema, 'ToDos')

module.exports = toDo