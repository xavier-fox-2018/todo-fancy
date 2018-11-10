const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    name: String,
    email: {
        type: String,
        required: [true, 'Please input valid email'],
        validate:{
            validator: function(is){
                let mail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return mail.test(is);
            }
        },
        unique: true,
    },
    password: { type: String, required: [true, 'Password is required'] },
    role: { type: String, default: 'member' },
    deleteAt: { type: Date, default: null},    
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User