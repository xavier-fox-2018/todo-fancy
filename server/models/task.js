const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: String,
    description: String,
    status: Boolean,
    dueDate: Date,
    UserId: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;