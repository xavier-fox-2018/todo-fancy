var express = require('express');
var router = express.Router();
var GroupController = require('../controllers/GroupController.js');

router.post('/', GroupController.create);
router.get('/', GroupController.list);
router.get('/nonMembers/:groupId', GroupController.getNonMembers);
router.get('/addMember/:groupId/:userId', GroupController.addToGroup);
router.get('/addTodo/:groupId/:todoId', GroupController.addTaskInGroup)

module.exports = router;
