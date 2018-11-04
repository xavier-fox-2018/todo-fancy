var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('dotenv').config()
const bcrypt = require('bcryptjs') 

var isEmail = function(val) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(val);
}

const userSchema = new Schema({
    name: {
      type: String,
      required: [true, 'name not null']
    },
    email: {
      type: String,
      unique: true,
      validate: isEmail,
      required: true
    },
    isGoogle: { 
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: true
    },
    picture: String
}, {
  timestamps: true
});

userSchema.pre('save', function(next){
  var salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(this.password, salt)
  // console.log(this.password); 
  next()
})

var User = mongoose.model('User', userSchema);

module.exports = User;