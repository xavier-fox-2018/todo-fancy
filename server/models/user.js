const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser:true});

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: function(value) {
                return /\w+@+\w+\.\w/.test(value)
            },
            message: "Please insert a valid mail"
        },
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema, 'Users')

module.exports = User