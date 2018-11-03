const Group = require('../models/group')
const Invitation = require('../models/invitation')

class Controller {
    static read(req,res){
        Group.find({})
        .populate('members')
        .then((list)=>{
            res.status(200).json(list)
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'error in getting list of group from database'
            })
        })
    }

    static mygroup(req,res){
        Group.find({
            members : req.userId
        })
        .then((resp)=>{
            res.status(200).json(resp)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    }

    static create(req,res){
        Group.create({
            name : req.body.name,
            admin : req.userId,
        })
        .then((created)=>{
            // res.status(201).json(created)
            Group.findOneAndUpdate({
                _id : created._id
            },{
                $push : {
                    members : req.userId
                }
            })
            .then((updated)=>{
                res.status(201).json({
                    message : 'create group success',
                    created : created
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    message : 'error in inserting admin to members'
                })
            })
        })
        .catch((err)=>{
            res.status(500).json({
                error : err,
                message : 'create group failed'
            })
        })
    }

    static invite(req,res){
        if(req.body.message.length < 1){
            req.body.message = `Let's join my group!`
        }

        Invitation.create({
            sender : req.userId,
            receiver : req.body.invite,
            message : req.body.message,
            group : req.body.group
        })
        .then((created)=>{
            res.status(200).json(created)
        })
        .catch((err)=>{
            res.status(500).json('Invite error')
        })
    }

    static accept(req,res){
        Invitation.findOneAndUpdate({
            _id : req.params.id
        },{
            status : true
        })
        .then((invitation)=>{
            let invited = invitation.receiver
            let group = invitation.group

            Group.findOneAndUpdate({
                _id : group
            },{
                $push : {members : invited}
            })
            .then((done)=>{
                Invitation.findOneAndRemove({
                    _id : req.params.id
                })
                .then((resp)=>{
                    res.status(200).json({
                        message : `You are now member of group ${done.name}`,
                    })
                })
                .catch((err)=>{
                    res.status(500).json({
                        message : 'failed in deleting invitation after accept'
                    })
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    message : 'Error in adding member to group'
                })
            })

        })
    }

    static remove(req,res){

    }

}

module.exports = Controller