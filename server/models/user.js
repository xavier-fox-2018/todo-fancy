const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const userSchema = new Schema({
  validated: Boolean,
  name: String,
  email: String,
  password: String,
  salt: String,
  googleId: Number,
  signIn: Boolean,
  tasksId: [{ type: Schema.Types.ObjectId, ref: 'Task' } ] //! REMEMBER TO MAKE THE MODEL FOR TASK AS "TASK"
});

const User = mongoose.model('User', userSchema);

module.exports = User