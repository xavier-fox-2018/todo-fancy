const Todo = require('../models/todo')

class TodoController {

    static create ( req, res ) {
        var todo = new Todo ({
            name: req.body.name,
            desc: req.body.desc,
            status: req.body.status || "not done",
            dueDate: req.body.dueDate,
            UserId: '5bddbd1349f103185c377202'
        })
        todo.save( (err, data) => {
            if (err) {
                console.log( err )
                res.status(500).json({ "error found" : err})
            } if ( data ) {
                res.status(200).json( data )
            }
        })
    }

    static readAll ( req, res ) {
        Todo.find(/*{UserId:'5bddbd1349f103185c377202'}*/)
            .then( todos => {
                console.log( todos )
                res.status(200).json( todos )
            })
            .catch( err => {
                res.status(500).json( err )
            })
    }

    static update ( req, res ) {
        Todo.updateOne({_id: req.params.id},{
            name: req.body.name,
            desc: req.body.desc,
            dueDate: req.body.dueDate,
            status: req.body.status || "not done",
        })
            .then( todo => {
                res.status(200).json( todo )
            })
            .catch( err => {
                res.status(500).json( err )
            })
    }

    static delete ( req, res ) {
        Todo.deleteOne({_id: req.params.id})
            .then( result => {
                res.status(200).json( result )
            })
            .catch( err => {
                res.status(500).json( err )
            })
    }
}

module.exports = TodoController