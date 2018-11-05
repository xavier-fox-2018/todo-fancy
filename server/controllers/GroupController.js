const GroupModel = require('../models/GroupModel.js');
const UserModel = require('../models/UserModel.js')
const helpers = require('../helpers/helpers.js')
const mongoose = require('mongoose')

module.exports = {

    create: function (req, res) {
        const token = req.headers.token
        const userId = helpers.decodeToken(token)._id

        var Group = new GroupModel({
            name: req.body.name,
            owner: userId,
            members: [userId],
            groupTodos : []
        });

        Group.save(function (err, Group) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Group',
                    error: err
                });
            }
            return res.status(201).json(Group);
        });
    },

    list: function (req, res) {

        const token = req.headers.token
        const userId = helpers.decodeToken(token)._id

        GroupModel.find({
            'members': {
                $in: [
                    mongoose.Types.ObjectId(userId)
                ]
            }
        }, function (err, Groups) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Group.',
                    error: err
                });
            }
            return res.json(Groups);
        }).populate('members').sort('-createdAt')
    },

    getNonMembers : function (req, res) {

        let groupId = req.params.groupId
        
        GroupModel.findById(groupId)
        .then((group) => {
            let groupMembers = group.members

            UserModel.find({ 
                _id : { "$nin": groupMembers } 
            })
            .then((users) => {
                res.json(users)
            }).catch((err) => {
                res.status(500).json(err)
            });

        }).catch((err) => {
            res.status(500).json(err)
        });

    },

    addToGroup : function (req, res) {

        GroupModel.update(
            { _id: req.params.groupId }, 
            { $push: { members: req.params.userId } }
        )
        .then((result) => {
            res.json({
                info : result,
                message : 'add member succes' 
            })
        }).catch((err) => {
            res.status(500).json(err)
        });

    },

    addTaskInGroup : function (req, res) {

        let groupId = req.params.groupId
        let todoId = req.params.todoId

        GroupModel.update(
            { _id: groupId }, 
            { $push: { groupTodos: todoId } }
        )
        .then((result) => {
            res.json({
                info : result,
                message : 'add group todo succes' 
            })
        }).catch((err) => {
            res.status(500).json(err)
        });

    }

};