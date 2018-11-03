const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_LOCAL, {useNewUrlParser: true})
const bcryptjs = require('bcryptjs')
const indexRouter = require('./router/index')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connected')
})


app.use('/', indexRouter)




const port = process.env.PORT || 3000
app.listen(port, (req,res) => {
    console.log(`Server is running on port: ${port}`);
})