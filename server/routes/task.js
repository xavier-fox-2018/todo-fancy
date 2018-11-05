const express = require('express'),
      routes = express.Router(),
      TaskController = require('../controllers/task.js');

routes.post('/:userId', TaskController.create) // ? makes new task
routes.get('/', TaskController.find) // ? get users
routes.delete('/:id', TaskController.deleteOne) // ? deletes a task
routes.get('/:id', TaskController.findOne) // ? get a task
routes.put('/:id', TaskController.updateOne) // ? updates user


module.exports = routes