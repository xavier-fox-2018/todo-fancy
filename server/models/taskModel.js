const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String
    },
    isDone: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        required: [true, 'You need to set a deadline to create a task']
    },
    priority: {
        type: Number, 
        default: 1,
        max: [5, 'Max priority number is 5'],
        min: [1, 'Min priority number is 1']
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;