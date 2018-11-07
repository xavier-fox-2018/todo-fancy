var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/todo', { useNewUrlParser: true });
const Schema = mongoose.Schema;
var validator = require('validator');

const userSchema = new Schema({
    "name": String,
    "email": {
        type: String,
        validate: {
            validator: function(v) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: `Email is not a valid email!`,
        }
    },
    "password": String,
    "salt": String,
    "oauth": Boolean,
    "todolist": [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
})

const User = mongoose.model('User', userSchema)
    /*{
                isAsync: true,
                validator: function(v, cb) {
                    User.findOne({
                        email: this.email
                    }, function(err, doc) {
                        cb(doc === null)
                    })
                },
                message: `Email already taken`,
            }*/
module.exports = User