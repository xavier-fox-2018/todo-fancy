const express = require('express'),
      routes = express.Router(),
      UserController = require('../controllers/user.js');

routes.post('/', UserController.create) // ? makes new user
routes.post('/google', UserController.googleCreate) // ? makes new user
routes.get('/', UserController.find) // ? get users
routes.post('/email', UserController.emailFindOne) // ? get user
routes.get('/verifytoken/:userToken', UserController.verifyToken) // ? verifies the token
routes.get('/verify/:id', UserController.verify) // ? verify user
routes.delete('/:id', UserController.delete) // ? deletes user
routes.get('/:id', UserController.findOne) // ? get user
routes.put('/:id', UserController.updateOne) // ? updates user


module.exports = routes