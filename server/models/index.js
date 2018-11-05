var mongoose = require('mongoose');
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/todo';
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(CONNECTION_URI, {
        useNewUrlParser: true,
        useMongoClient: true
    })
    .then(function() {
        console.log('Connected to mongodb');
    })
    .catch(function(err) {
        console.log(err);
    })
exports.User = require('./user.js')
exports.Todo = require('./todo.js')