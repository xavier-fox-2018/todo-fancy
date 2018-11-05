// ! BASIC CONFIG
const express = require('express'),
  app = express(),
  port = process.env.PORT || 4000,
  routes = require('./routes'),
  cors = require('cors'),
  gal = require('google-auth-library'), // kemungkinan ini ga dipake sekarang, tapi buat nanti
  mongoose = require('mongoose')

app.use(cors())
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.use(routes)

// mongoose.connect('mongodb://allUser:!90997Sncm@ds249503.mlab.com:49503/testing')
mongoose.connect('mongodb://localhost:27017/maso')

app.listen(port, () => console.log(`Listening on ${port}`))