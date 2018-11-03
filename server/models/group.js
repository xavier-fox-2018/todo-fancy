const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new Schema ({
    name : {
        type : String
    },
    admin : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    members : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    todo_list : [{
        type : Schema.Types.ObjectId,
        ref : 'Todo'
    }]
},{
    timestamps : true
})

const Group = mongoose.model('Group',groupSchema)

module.exports = Group;