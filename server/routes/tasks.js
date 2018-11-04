var express = require('express');
var router = express.Router();
const Controller = require('../controllers/task')
const User = require('../models/user')
const auth = require('../middlewares/authentication')
const groupAuth = require('../middlewares/groupAuth')

/* GET users listing. */
router.get('/', auth, Controller.findAll);
router.get('/:id', Controller.findById)
router.post('/', auth, Controller.create)
router.put('/:id', auth, Controller.update)
router.patch('/:id', auth, Controller.patch)
router.delete('/:id', auth, Controller.delete)
router.get('/group/:groupId', auth, groupAuth, Controller.findByGroup)
// router.get('/getMap/:address', Controller.getMap)


module.exports = router;
