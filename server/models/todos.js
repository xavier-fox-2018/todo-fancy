var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    priority: {
        type: Number,
        default: 0,
        required: true
    },
    dueDate: {
        type: Date,
        default: new Date(),
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    idGroup: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        default: null
    },
    location: {
        type: String,
        default: null
    },
    completedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    completedDate: {
        type: String
    }
}, {
    timestamps: true
})

// todoSchema.pre('remove', function(next) {
//     console.log(this);
//     console.log(this.idGroup)
//     console.log('masuk');
//     next();
// })

var Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo