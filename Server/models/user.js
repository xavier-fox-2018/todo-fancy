const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    }
}, {
    timestamps : true
})

const User = mongoose.model('User', userSchema)

module.exports = User