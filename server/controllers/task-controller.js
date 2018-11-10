const Task = require('../models/task')

module.exports = {
    addTask: (req, res) =>{
        Task.create({
            author: req.decoded.id,
            name: req.body.name,
            description: req.body.description,
            dueDate: req.body.dueDate
        })
        .then(result =>{
            res.status(201).json({task: result})
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },

    allTask: (req, res) =>{
        Task.find({
            author: req.decoded.id,
            deleteAt: null,
            status: 'do'
        })
        .sort([['updatedAt', 'descending']])
        .populate('author')
        .then(result =>{
            res.status(201).json({task: result})
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },

    taskDone: (req, res) =>{
        Task.find({
            author: req.decoded.id,
            deleteAt: null,
            status: 'done'
        })
        .sort([['updatedAt', 'descending']])
        .populate('author')
        .then(result =>{
            res.status(201).json({task: result})
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },

    updateOne: (req, res) =>{
        Task.findOne({
            author: req.decoded.id,
            deleteAt: null,
            status: 'do'
        })
        .sort([['updatedAt', 'descending']])
        .populate('author')
        .then(result =>{
            res.status(201).json({
                task: result
            })
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },

    updateTask: (req, res) =>{
        Task.findOneAndUpdate({
            _id: req.params.id,
            author: req.decoded.id
        },{
           author: req.decoded.id,
           name: req.body.name,
           description: req.body.description,
           dueDate: req.body.dueDate 
        })
        .then(result =>{
            res.status(201).json({task: result})
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },

    setDone: (req, res) =>{
        Task.findOneAndUpdate({
            _id: req.params.id,
            author: req.decoded.id
        },{
            status: 'done'
        })
        .then(result =>{
            res.status(201).json({task: result})
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },

    setDo: (req, res) =>{
        Task.findOneAndUpdate({
            _id: req.params.id,
            author: req.decoded.id
        },{
            status: 'do'
        })
        .then(result =>{
            res.status(201).json({task: result})
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },


    deleteTask: (req, res) =>{
        Task.deleteOne({
            _id: req.params.id,
            author: req.decoded.id
        })
        .then(result =>{
            res.status(201).json({task: result})
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }

}