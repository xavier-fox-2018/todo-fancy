const router = require('express').Router(),
      { login, register } = require('../controllers/user')

router
    .post('/register', register)
    .post('/login', login)

module.exports = router