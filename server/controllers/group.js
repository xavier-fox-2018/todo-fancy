require('dotenv').config()
const Task = require('../models/task')
const User = require('../models/user')
const Group = require('../models/group')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const axios = require('axios')

module.exports = {
  findAll: function(req, res) {
    Group.find({})
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },

  findById: function(req, res) {
    Group.findById(req.params.id)
    .populate('userId')
    .populate('groupAdmin')
    .then((result) => {
      res.status(201).json({
        message:'Success get a group by id',
        status: 'success',
        result
      })
    }).catch((err) => {
      res.status(500).json({
        message: err.message,
        status: 'fail'
      })
    });
  },

  create: function(req, res) {
    // console.log(req.body.userId)
    Group.create({
      name:req.body.name,
      userId: req.body["userId[]"],
      groupAdmin: req.body.groupAdmin
    })
    .then((result) => {
      res.status(201).json({
        message:'Success created new group',
        status: 'success'
      })
    }).catch((err) => {
      res.status(500).json({
        err,
        status: 'fail'
      })
    });
  },

  update: function(req, res) {
    console.log('update body group---', req.body)
    Group.findByIdAndUpdate(req.params.id, {
      userId:req.body['userId[]']
    })
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },

  delete: function(req, res) {
    Group.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },

  patch: function(req, res) {
    Group.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  }
}