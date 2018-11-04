const mongoose = require('mongoose')
const Schema = mongoose.Schema

const invitationSchema = new Schema ({
    group : {
        type : Schema.Types.ObjectId,
        ref : 'Group'
    },
    sender : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    receiver : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    status : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

const Invitation = mongoose.model('Invitation',invitationSchema)

module.exports = Invitation ;