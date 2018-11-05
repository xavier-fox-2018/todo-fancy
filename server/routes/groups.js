var express = require('express');
var router = express.Router();
const auth = require('../middlewares/authentication')
const groupAuth = require('../middlewares/groupAuth')
const Controller = require('../controllers/group')

/* GET home page. */
router.get('/', auth, Controller.findAll);
router.get('/:id', auth, Controller.findById);
router.post('/', auth, Controller.create)
router.put('/:id', auth, Controller.update)

module.exports = router;
