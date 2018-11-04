const router = require('express').Router()
const Controller = require('../controllers/index.js')

router.post('/signup', Controller.signUp)
router.post('/signin', Controller.signIn)
router.post('/google_signin', Controller.google_signin)
router.post('/decode', Controller.decode)
router.post('/add', Controller.addToDo)
router.post('/list', Controller.getToDo)
router.put('/edit', Controller.editToDo)
router.delete('/delete', Controller.deleteToDo)
//sorting routes
router.post('/list/due_date', Controller.getByDue)
router.post('/list/created_date', Controller.getByCreated)
router.post('/list/name', Controller.getByName)
router.post('/list/description', Controller.getByDescription)
router.post('/list/status', Controller.getByStatus)


module.exports = router;