const mongoose = require('mongoose')

const Schema = mongoose.Schema;
let today = new Date()

const todoSchema = new Schema({
    name :{
        type :  String,
        required : [true, 'Sorry, name must be filled!']
    },
    description :{
        type : String,
        required : [true, 'Sorry, description must be filled!']
    },
    status :{
        type : Boolean,
        default : false
    },
    due_status : {
        type : Date,
        required : [true, 'Sorry, due status must be filled!'],
        min : [Date.now(), `Sorry, due status minimun ${today.getFullYear()}-${today.getMonth()}-${today.getDate()} `]
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
