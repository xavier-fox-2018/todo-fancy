var express = require('express');
var router = express.Router();
const {isLogin} = require('../middlewares/auth')
const {getQuote} = require('../controllers/quotes')

router.get('/', isLogin, getQuote)

module.exports = router;