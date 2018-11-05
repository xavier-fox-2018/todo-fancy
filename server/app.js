require('dotenv').config()
const express = require('express'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      port = process.env.PORT || 3000,

      app = express(),
      dbURI = `mongodb://${process.env.dbuser}:${process.env.dbpassword}@ds145093.mlab.com:45093/todo`

mongoose.connect(dbURI, {useNewUrlParser: true})

const userRouter = require('./routes/user')

app
    .use(express.urlencoded({ extended: false}))
    .use(express.json())

    .use(cors())

    .use('/', userRouter)

    .listen(port, () => {
        console.log(`I'm running on port ${port}!`);
    })