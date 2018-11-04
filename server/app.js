const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const cors = require('cors')
//routes
const toDoRoute = require('./routes/index.js')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//connect mongoose
mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser:true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(('You are Mongected'));
});

//path
app.use('/todo', toDoRoute)

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})


