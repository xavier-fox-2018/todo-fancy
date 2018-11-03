const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    oauth : {
        type : Boolean
    },
    todo_list : [{
        type : Schema.Types.ObjectId,
        ref : 'Todo'
    }]
},{
    timestamps : true
})

const User = mongoose.model('User',userSchema)

module.exports = User