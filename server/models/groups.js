var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    users: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    tasks: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Todo'
    }]
}, {
    timestamps: true
})

var Group = mongoose.model('Group', groupSchema)

module.exports = Group