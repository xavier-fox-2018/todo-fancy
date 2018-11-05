var express = require('express');
var mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
mongoose.connect(process.env.DB_ONLINE, { useNewUrlParser: true })
// mongoose.connect('mongodb://localhost:27017/todofancy', { useNewUrlParser: true });

const db = mongoose.connection
mongoose.set('useCreateIndex', true)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('> DB Connected')
});

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos');
const groupsRouter = require('./routes/groups')
const quotesRouter = require('./routes/quotes')

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todos', todosRouter);
app.use('/groups', groupsRouter);
app.use('/quotes', quotesRouter);


module.exports = app;
