const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = Mongoose.model('User', userSchema)