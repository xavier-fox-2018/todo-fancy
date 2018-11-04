const express  = require('express')
const mongoose = require('mongoose')
const cors     = require('cors')
require('dotenv').config()
const app = express()
const indexRouter   = require('./routers/index')
const userRouter = require('./routers/user')

mongoose.connect(process.env.DB_MONGO, { useNewUrlParser: true });
// mongoose.connect(URL_MONGO_MLAB , { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongo connected')
});

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use('/', indexRouter)
app.use('/user', userRouter)

const port = process.env.PORT || 3000
app.listen(port, function(){
    console.log('Listening on port', port)
})