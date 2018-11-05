const router = require('express').Router()
const taskController = require('../controllers/taskController.js')
 
router.get('/', taskController.read)
router.post('/', taskController.create)
router.put('/:taskID', taskController.update)
router.delete('/:taskID', taskController.delete)

 
module.exports = router