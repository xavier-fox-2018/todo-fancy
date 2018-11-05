const router = require('express').Router()

const { gSignIn } = require('../controllers/controller-user')

router.post('/gsignin', gSignIn)


module.exports = router