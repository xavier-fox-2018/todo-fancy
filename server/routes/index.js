const router = require("express").Router()
const UserController = require('../controllers/UserController.js')
const { googleAuth, isLogin } = require('../middlewares/auth')
const { googleSignUp } = require('../controllers/UserController.js')

router.get('/',(req,res)=>{res.status(200).send('Connected - Express App')})

router.post('/register',UserController.register);
router.post('/login',UserController.login);

router.post('/gsignin',googleAuth, googleSignUp)

router.use('/users', require('./UserRoutes.js'))
router.use('/todos', require('./TodoRoutes.js'))
router.use('/groups', require('./GroupRoutes.js'))


module.exports = router;
