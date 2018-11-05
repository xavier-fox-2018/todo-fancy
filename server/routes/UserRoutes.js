var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController.js');

router.get('/verify',UserController.verify)
router.get('/:id',UserController.findOneById)
router.put('/:id', UserController.update);
router.delete('/:id', UserController.remove);
router.get('/', UserController.list)

module.exports = router;
