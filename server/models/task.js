const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const taskSchema = new Schema({
  name: String,
  description: String,
  priority: Number,
  status: String,
  dueDate: Date
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task