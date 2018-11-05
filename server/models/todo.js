var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/todo', { useNewUrlParser: true });

const Schema = mongoose.Schema;
const todoSchema = new Schema({
    "name": String,
    "description": String,
    "status": String,
    "due_date": Date
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo