const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema ({
    name : {
        type : String
    },
    description : {
        type : String
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    status : {
        type : Boolean,
        default : false
    },
    due_date : {
        type : Date
    }
},{
    timestamps : true
})

const Todo = mongoose.model('Todo',todoSchema)

module.exports = Todo;