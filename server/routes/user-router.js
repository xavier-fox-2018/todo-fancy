const express = require('express');
const router = express.Router();
const {signup, signin} = require('../controllers/user-controller')
const {facebook, google} = require('../controllers/socmed-controller')

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signinfb', facebook)
router.post('/gsignin', google)

module.exports = router