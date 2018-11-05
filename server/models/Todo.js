const mongoose = require('mongoose')
const schema = mongoose.Schema
const todoSchema = new schema({
    name: String,
    description: String,
    status:  Boolean,
    due_date: Date,
    progress: Number
})

todoSchema.pre('save', function(next){
    this.status = false
    this.progress = 0
    next()
})
const Todo = mongoose.model('Todo', todoSchema)

module.exports= Todo