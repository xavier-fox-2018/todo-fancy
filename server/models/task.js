const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
  taskName: String,
  taskDescription : String,
  taskStatus: String,
  taskDate: Date,
  userId : { type: Schema.Types.ObjectId, ref: 'User' }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;