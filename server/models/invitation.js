const mongoose = require('mongoose')
const Schema = mongoose.Schema

const invitationSchema = new Schema ({
    sender : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    receiver : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    message : {
        type : String
    }
},{
    timestamps : true
})

const Invitation = mongoose.model('Invitation',invitationSchema)

module.exports = Invitation ;