const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    photo: String,
    todo: [],
    password: String
})

var User = mongoose.model('User', UserSchema)

module.exports = User