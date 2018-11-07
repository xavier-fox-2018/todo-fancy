var express = require('express');
var router = express.Router();
var controller = require('../controllers/todos.js');
var models = require('../models/todo.js');

// router.delete('/deleteall', function(req, res) {
//     models.deleteMany({}, function(err) {
//         if (err) {
//             res.send('error')
//         } else {
//             res.send('deleted all')
//         }
//     })
// })
router.post('/create', controller.createTodo);
router.get('/', controller.getTodo);
router.post('/update/:id', controller.updateTodo);
router.get('/completed/:id', controller.completedTodo);
router.delete('/delete/:id', controller.deleteTodo);
//     router.delete('/deleteall', function(req, res) {
//     models.deleteMany({}, function(err) {
//         if (err) {
//             res.send('error')
//         } else {
//             res.send('deleted all')
//         }
//     })
// })
// router.post('/create', function(req, res, next) {
//     models.create({
//             name: req.body.name,
//             description: req.body.description,
//             status: "pending",
//             due_date: new Date(req.body.due_date)
//         })
//         .then(function(data) {
//             res.status(200).json(data)
//         })
//         .catch(function(err) {
//             res.status(500).json('error dari todos/create')
//         })

// });
// router.get('/', function(req, res, next) {
//     models.find()
//         .then(function(data) {
//             res.status(200).json(data)
//         })
//         .catch(function(err) {
//             res.status(500).json({ message: 'error dari server routes/todos.js router get baris 22' })
//         })
// });
// router.post('/update/:id', function(req, res, next) {
//     // res.status(500).json('eeddwdwd')
//     models.updateOne({ _id: req.params.id }, {
//             name: req.body.name,
//             description: req.body.description,
//             status: "pending",
//             due_date: new Date(req.body.due_date)
//         })
//         .then(function(data) {
//             res.status(200).json(data)
//         })
//         .catch(function(err) {
//             res.status(500).json(err)
//         })
// });
// router.get('/completed/:id', function(req, res, next) {
//     models.updateOne({ _id: req.params.id }, {
//             status: "completed"
//         })
//         .then(function(data) {
//             res.status(200).json(data)
//         })
//         .catch(function(err) {
//             res.status(500).json(err)
//         })
// });
// router.delete('/delete/:id', function(req, res, next) {
//     models.deleteOne({ _id: req.params.id })
//         .then(function(data) {
//             res.status(200).json(data)
//         })
//         .catch(function(err) {
//             res.status(500).json({ message: 'error dari server routes/todos.js router delete baris 49' })
//         })
// });


module.exports = router;