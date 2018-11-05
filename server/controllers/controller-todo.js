const Todo = require('../models/todo')
const ObjectId = require('mongoose').Types.ObjectId
const User = require('../models/user')

module.exports = {
    read : (req, res) => {

        let userid = req._id
        User
            .findById( userid )
            .populate('todoes')
            .exec( function(err , userdata) {
                let user = {
                    todoes : userdata.todoes,
                    _id : userdata._id,
                    name : userdata.name,
                    email : userdata.email
                }
                
                if( err ) {
                    res.status(500).json( { message : 'Error while read data user', error: error.message})
                }else {
                    res.status(200).json( user )
                }
            })
    },
    create : (req, res) => {
       var createdNewTodo

        let userid = req._id
        let todo = new Todo({ name : req.body.name, description : req.body.description, due_status : req.body.due_status})
        todo
            .save()      
            .then( newtodo => {
                createdNewTodo = newtodo
               return User.findById( userid)
            })
            .then( user => {
                user.todoes.push(todo._id)
                return user.save()
            })
            .then( response_adding_todo_to_user => {
                res.status(200).json( createdNewTodo )
            })
            .catch( error => {
                
                res.status(500).json({ message : 'error while create todo list', error : error.message})
            })
    },
    update : (req, res) => {
        let id = ObjectId(req.params.id)
        let data = req.body
       
        Todo
            .findById(id)
            .then( todo => {
                if ( todo ) {
                    todo.set( data )
                    todo
                        .save()
                        .then( respose => {
                            res.status(200).json( respose )
                        })
                        .catch( error => {
                            res.status(500).json({ message : 'error while update todo list', error : error.message})
                        })        
                }else {
                    res.status(500).json({ error : 'Maaf Todo list tidak ditemukan!'})    
                }  
            })
            .catch( error => {
                res.status(500).json( { message : 'Error while creating todo', error:error.message})
            })
        
    },
    destroy : (req, res) => {
        let id = ObjectId(req.params.id)
        User
                    .findById(req._id)
                    .populate('todoes')
                    .then( user => {
                       let document = user.todoes.find( doc => {
                           return doc.equals(id)
                       })   
                       user.todoes.pull(document._id)
                       return user.save()
                    })
                    .then( response_pull => {
                       return Todo.findByIdAndRemove(id)
                    })
                    .then( response_remove => {
                        res.status(200).json(response_remove)
                    })
                    .catch( error => {
                        res.status(500).json( { message : 'Error while delete todo', error:error.message})                                    
                     })
    }   
}