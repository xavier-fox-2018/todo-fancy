const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'is required']
    },
    password: {
        type: String,
        required: [true, 'is required']
    }
}, {
    timestamps : true
})

const User = mongoose.model('User', userSchema)

module.exports = User