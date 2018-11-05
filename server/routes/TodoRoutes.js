var express = require('express');
var router = express.Router();
var TodoController = require('../controllers/TodoController.js');

// todos
router.post('/', TodoController.create);
router.get('/', TodoController.list);
router.get('/:id', TodoController.show);
router.put('/:id', TodoController.update);
router.delete('/:id', TodoController.remove);
router.put('/:id/status', TodoController.changeStatus);


module.exports = router;
