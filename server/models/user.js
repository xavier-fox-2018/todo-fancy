var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
const {isEmail} = require('validator');


var userSchema = new Schema({
  name: String,
  email: {
    type: String,
    validate: [{
      validator: isEmail,
      message: 'Invalid email format',
      error_code: 'INVALID_EMAIL'
    },{
      isAsync: true,
      validator: function(value, cb){
        User.findOne({email: value}, function(err, doc){
          cb(!doc)
        })
      },
      message: 'Email already exists!',
      error_code: 'EMAIL_NOT_UNIQUE'
    }]
  },
  password: {
    type: String,
    required: [true, 'EMPTY_PASSWORD'],
  },
  OAuth: Boolean,
  todo: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
});
userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 10)
  next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;