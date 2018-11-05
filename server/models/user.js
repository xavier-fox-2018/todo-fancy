const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: String,
    email: String,
    password: String,
    isGoogle: Boolean
})

const User = mongoose.model('User', taskSchema)


module.exports = User;