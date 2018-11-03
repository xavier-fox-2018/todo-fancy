const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, index: true, unique: true, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
userSchema.plugin(uniqueValidator);

module.exports = User;