const route = require('express').Router();

const TaskController = require('../controllers/task.js');

route.post('/create', TaskController.create);
route.get('/getAll/:UserId', TaskController.getAll);

module.exports = route;