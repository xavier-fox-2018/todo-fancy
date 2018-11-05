const ModelTask = require('../models/tasks')

class Task {
    static create(req, res){
        console.log(req.body.name)
        let task = new ModelTask({
            name : req.body.name,
            description : req.body.description,
            dueDate : req.body.dueDate
        })
        task.save((err, data)=>{
            if(err){
                res.status(500).json({
                    message: 'Fail'
                })
            } else {
                res.status(200).json({
                    data: data
                })
            }
        })
        
    }

    static all(req,res){
        console.log('hi from all list')
        ModelTask.find({})
        .then((data)=>{
            res.status(200).json({
                message: 'Success show all data',
                value: data
            })
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                message:'server error'
            })
        })
    }

    static complete(req,res){
        ModelTask.findOneAndUpdate({_id: req.params.id},{status: 'Completed'},function(err,response){
            if (err) {
               res.status(500).json({
                    message: 'fail'
               })
            } else {
                res.status(200).json({
                    message: 'success '
                })
            }
        })
        // console.log('update disini dgn id', req.params.id)
    }

    static edit(req, res){
        console.log('masuk controller edit')
        ModelTask.findByIdAndUpdate({_id:req.body.id},{
            name: req.body.name,
            description: req.body.description,
            dueDate: req.body.dueDate,
        },function(err, response){
            if (err) {
                res.status(500).json({
                    message: 'fail'
                })
             } else {
                 res.status(200).json({
                     message: 'EDIT DATA BERHASIL '
                 })
             }
        })
    }

    static delete(req, res){
        ModelTask.findByIdAndDelete({_id:req.params.id},function(err, response){
            if (err) {
                res.status(500).json({
                     message: 'fail'
                })
             } else {
                 res.status(200).json({
                     message: 'success '
                 })
             }
        })
    }

    

    // static uncomplete(req,res){
    //     ModelTask.findOneAndUpdate({_id: req.params.id},{status: 'Completed'},function(err,response){
    //         if (err) {
    //            res.status(500).json({
    //                 message: 'fail'
    //            })
    //         } else {
    //             res.status(200).json({
    //                 message: 'success '
    //             })
    //         }
    //     })
        
    // }
}

module.exports = Task