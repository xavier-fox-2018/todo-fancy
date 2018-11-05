const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const taskSchema = new Schema({
    name: String,
    description: String,
    createdAt:{
        type:Date,
        default:Date.now
    },
    dueDate:Date,
    status:{
        type:String,
        default:'Uncompleted'
    }
    ,
    user: [{type: Mongoose.Schema.Types.ObjectId, ref:'User'}]
})

module.exports = Mongoose.model('Task', taskSchema)

