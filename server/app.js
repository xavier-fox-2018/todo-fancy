require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Routes = require('./routes/')


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/', Routes)


app.listen(3000, () => {
    console.log('server started on port 3000')
    mongoose.connect('mongodb://localhost/todo-fancy', {useNewUrlParser: true})
        .then(() => {
            console.log('mongodb started')
        })
        .catch(err => {
            console.log('db error', err)
        })
})