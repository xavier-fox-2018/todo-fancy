const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    googleAccount: {
        type: Boolean,
        default: false
    },

    todos: [{
        type: Schema.Types.ObjectId, ref: 'Todo'
    }]
    // bookList: [{type: Schema.Types.ObjectId, ref: 'Book'}]
})


const User = mongoose.model('User', userSchema)

module.exports = User