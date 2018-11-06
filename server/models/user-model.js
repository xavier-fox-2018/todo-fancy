const mongoose = require ('mongoose');
Schema = mongoose.Schema;

const userSchema = new Schema({ 
  email: String,
  password: String, 
  role: String, 
  name: String,
})

const user = mongoose.model('User', userSchema);
module.exports = user;



