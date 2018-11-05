const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: String,
    email: String,
    password:  String,
})

userSchema.pre('save', function(next){
    if(this.password){
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(this.password, salt)
        this.password = hash
        next()
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports= User