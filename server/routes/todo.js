const express = require('express'),
      router = express.Router(),
      Controller = require('../controllers/todo'),
      { authenticate, authorize } = require('../middlewares/auth')


router
    .post('/add', authenticate, authorize, Controller.create)
    .get('/', authenticate, authorize, Controller.showAllTodo )

module.exports = router