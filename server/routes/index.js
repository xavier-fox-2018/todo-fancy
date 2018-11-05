const express = require('express');
const routes = express.Router();
const User = require('../controllers/user.js');
const Task = require('../controllers/task.js');
const verifyToken = require('./verifyToken.js');
const bodyParser = require('body-parser');
const cors = require('cors')
// app.use(
//   session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized:true
//   })
// );
// Middleware 

routes.use('/main', verifyToken)
routes.use("/main", Task.getAll)
routes.post("/main/getOne", Task.getOne)
routes.post("/main/create", Task.create)
routes.post("/main/edit", Task.update)
routes.post("/main/delete", Task.delete)
routes.post("/register", User.register)
routes.post("/signIn", User.signIn)


module.exports=routes;




