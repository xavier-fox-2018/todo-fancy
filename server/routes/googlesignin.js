const router = require('express').Router(),
      {googleSignin} = require('../controllers/googlesignin')


router
    .post('/', googleSignin)

module.exports = router