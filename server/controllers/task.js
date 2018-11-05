require('dotenv').config()
const Task = require('../models/task')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const axios = require('axios')

module.exports = {
  findAll: function(req, res) {
    Task.find({
      userId: req.user.id
    })
    .populate('userId')
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  findById: function(req, res) {
    Task.findById(req.params.id)
    .populate('userId')
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  create: function(req, res) {
    // console.log('create body---', req.body)
    Task.create(req.body)
    .then((result) => {
      res.status(201).json({
        message:'Success created new ToDo',
        status: 'success'
      })
    }).catch((err) => {
      res.status(500).json({
        message: err.message,
        status: 'fail'
      })
    });
  },
  update: function(req, res) {
    // console.log('update body---', req.body)
    Task.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  delete: function(req, res) {
    Task.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  patch: function(req, res) {
    Task.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },

  findByGroup: function(req, res) {
    Task.find({
      groupId: req.params.groupId
    })
    .populate('userId')
    .then(result=>{
      res.status(201).json({
        message:`Success get all group's ToDo`,
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

  getMap: function(req, res) {
    console.log(req.params.address, process.env.MAP_API_KEY)
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.address}&key=${process.env.MAP_API_KEY}`)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  }
}