const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      hash = require('bycjwt')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    todo_list: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }],
    group_list: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }]
}, {
    timestamps:true
})

userSchema.pre('validate', function(next) {
    if (this.password.length < 6) {
        next(new Error('Password must be more than 5 characters'));
    } else {
        next();
    }
});

userSchema.post('validate', function(next) {
    this.password = hash.bcencode( this.password)
});

const User = mongoose.model('User', userSchema)
module.exports = User