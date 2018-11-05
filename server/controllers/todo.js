const ToDo = require('../models/todo'),
      User = require('../models/user')

class Controller {

    static create(req, res) {
        const todo = new ToDo({
            title: req.body.title,
            about: req.body.about,
            status: false,
            due_date: req.body.due_date,
            author: req.data._id
        })

        todo.save(function(err, todo) {
            if (err) {
                console.log('salah di save nya, ' + err);
                res.status(500).json({message: err})
            }
            else {
                User.findOneAndUpdate({
                    _id: req.data._id
                }, {
                    $push: { todo_list: todo._id}
                })
                    .then(() => {
                        console.log('Added task to User');
                        res.status(201).json({
                            message: `Successfully added ${req.body.title} to ${req.data.title}'s list of tasks`
                        })
                    })
                    .catch(err => {
                        res.status(500).json({message: err})
                    })
            }
        })
    }

    static showAllTodo(req, res) {
        ToDo.find({
            author: req.data._id
        })
         .then( todos => {
            res.status(200).json({
                data: todos
            })
         })
         .catch(err => {
             console.log();
             
         })
    }

    static update(req,res) {
        ToDo.updateOne({_id: req.params.id }, {$set: {
            title: req.body.title,
            about: req.body.about,
            status: false,
            due_date: req.body.due_date,
            author: req.data._id
        }})
        .then(todo => {
            console.log('Berhasil update todo', todo);
            res.status(201).json({
                message: `todo has been successfully updated.`,
                data: todo
            })
        })
        .catch(err => {
            console.log('Error saat update todo', err);          
            res.status(500).json({
                message: 'Failed to update todo',
                error: err
            })
        })
    }

    static remove(req,res) {
        ToDo.deleteOne({_id: req.params.id})
        .then(() => {
            User.findOneAndUpdate({
                todo_list: req.data._id
            }, {
                $pull: { todo_list: req.params.id}
            })
                .then(() => {
                    console.log('Berhasil delete todo', todo);
                    res.status(201).json({
                        message: `todo has been successfully deleted.`
                    })
                })
                .catch(err => {
                    res.status(500).json({message: err})
                })

        })
        .catch(err => {
            console.log('Error saat remove todo', err)
            res.status(500).json({
                message: 'Error saat remove todo',
                error: err
            })
            
        })
    }

}

module.exports = Controller 