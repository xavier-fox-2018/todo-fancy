const express = require('express')
const app = express()
const routes = require('./routes')
const port = 3000;
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todoApp', { useNewUrlParser: true } );


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log(`we're connected`);
    
})


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', routes)


app.listen(port, () => {
    console.log((`listening on port ${port}`));
    
})



