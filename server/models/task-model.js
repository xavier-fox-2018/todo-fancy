const mongoose = require ('mongoose');
Schema = mongoose.Schema;

const taskSchema = new Schema({ 
  taskName: String,
  description: String, 
  priority: String, 
  due: Date,
  group: {
    type: Schema.Types.ObjectId,
    ref: 'group'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

const task = mongoose.model('task', taskSchema);
module.exports = task;