const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({ 
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    name: { type: String, required: [true, 'Name is required'] },
    description: String,
    status: { type: String, default: 'do' },
    dueDate: { type: Date, required: true },
    deleteAt: { type: Date, default: null},    
},{
    timestamps:true     
});


const Task = mongoose.model('Task', taskSchema);
module.exports = Task