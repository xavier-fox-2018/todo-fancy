const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user_controller')

/* GET users listing. */
router.post('/gSignIn', UserController.gSignIn );
router.post('/signIn', UserController.signIn );
router.post('/signUp', UserController.create );
/*router.put('/:id', UserController.update );*/

module.exports = router;
