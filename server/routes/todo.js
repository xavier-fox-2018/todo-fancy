const express = require('express'),
      router = express.Router(),
      Controller = require('../controllers/todo'),
      { authenticate, authorize } = require('../middlewares/auth')


router
    .post('/', authenticate, authorize, Controller.create)
    .get('/', authenticate, authorize, Controller.showAllTodo)
    .put('/:id', authenticate, authorize, Controller.update)
    .delete('/', authenticate, authorize, Controller.remove)

module.exports = router