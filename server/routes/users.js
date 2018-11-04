const express = require('express');
const router = express.Router();
const {UserController} = require('../controllers');

router.get('/', UserController.readUser);
router.post('/', UserController.createUserLocal);
router.post('/login', UserController.loginUserLocal);
router.post('/oauth', UserController.loginUserGoogle);
router.get('/dashboard', UserController.dashboard)
module.exports = router;
