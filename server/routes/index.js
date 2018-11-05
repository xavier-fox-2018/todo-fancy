const express = require('express'),
      router = express.Router(),
      todoController = require('../controllers/todo_controller'),
      auth = require('../middlewares/auth.js')

      
      /*router.get('/', (req, res) => {
          res.send('test')
      });*/
      router.get('/all',  auth, todoController.readAll );
      router.post('/',  auth, todoController.create );
      router.put('/:id', auth, todoController.update );
      router.delete('/:id', auth, todoController.delete );
      
module.exports = router;
