const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const encryptPassword = require('../helpers/encryptPassword.js');

const userSchema = new Schema({
    username: {
        type: String, 
        required: [true, 'Username is required to register your account'],
        unique: [true, 'This username is already exists']
    },
    email: {
        type: String,
        required: [true, 'Email is required to register your account'],
        unique: [true, 'This email is already exists']
    },
    password: {
        type: String, 
        required: [true, 'Password is required to register your account'],
        minlength: [4, 'Minimum required characters for password is 4']
    }, 
    viaThirdParty: {
        type: Boolean, 
        default: false
    }, 
    taskList: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    groupList: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }],
    invitationList: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }]
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    this.password = encryptPassword(this.password);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;