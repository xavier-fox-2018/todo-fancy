require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/todo',{ useNewUrlParser: true })
mongoose.connect('mongodb://todoapp1:todoapp1@ds151463.mlab.com:51463/todoapp',{ useNewUrlParser: true })
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error"))
mongoose.connection.once("open", ()=> {console.log("MongoDB Connected!")})

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', require('./routes'));

app.use((req, res, next)=> {next(new Error("Not Found").status(404))})

module.exports = app;
