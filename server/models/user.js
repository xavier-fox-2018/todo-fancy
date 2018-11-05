const mongoose = require('mongoose')
const crypto = require('crypto')
const Helper = require('../helper/index')

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    salt: {type: String}
})

userSchema.pre('save', function(next) {
    let salt = crypto.randomBytes(10).toString()
    let hash = Helper.encryp( this.password, salt)
    this.password = hash
    this.salt = salt
    next()
})

userSchema.pre('update', function() {
    let salt = crypto.randomBytes(10).toString()
    let hash = Helper.encryp( this.password, salt)
    console.log(`ini isi haaaaaaaaaaaaaash`+hash)
    // this.update({},{ $set:{ password : hash}})
    // next()
})

const User = mongoose.model('User', userSchema)

module.exports = User