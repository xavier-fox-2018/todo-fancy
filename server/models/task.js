const mongoose = require('mongoose')

var TaskSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
    date: String
})

module.exports= TaskSchema