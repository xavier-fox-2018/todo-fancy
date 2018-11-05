const express = require('express');
const router = express.Router();
const task = require('./task-router')
const user = require('./user-router')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Khairul Baharuddin');
});
router.use('/task', task)
router.use('/user', user)



module.exports = router;
