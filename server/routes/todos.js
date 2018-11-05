var express = require('express');
var router = express.Router();
var TodoController = require('../controllers/TodoController')

router.post('/', TodoController.create)
router.get('/', TodoController.index)
router.get('/:id', TodoController.show)

module.exports = router