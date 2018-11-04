var express = require('express');
var router = express.Router();
const auth = require('../middlewares/authentication')
const groupAuth = require('../middlewares/groupAuth')
const Controller = require('../controllers/group')

/* GET home page. */
router.get('/', auth, groupAuth, Controller.findAll);
router.get('/:id', auth, groupAuth, Controller.findById);
router.post('/', auth, groupAuth, Controller.create)
router.put('/:id', auth, groupAuth, Controller.update)

module.exports = router;
