require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const indexRouter = require('./routes/indexRouter.js');
const userRouter = require('./routes/userRouter.js');
const taskRouter = require('./routes/taskRouter.js');

mongoose.connect('mongodb://localhost/todo-more-fancy', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.listen(port, function() {
    console.log('Listening on port', port);
});