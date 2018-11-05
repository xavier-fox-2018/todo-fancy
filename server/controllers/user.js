'use strict';
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require ('mongoose');
const userModel = require('../models/user-model');
class User {
  static register (req,res) {
    mongoose.connect('mongodb://localhost:27017/To-Do-Fancy');
    userModel.findOne({email: req.body.email} )
    .then( userinfo => {
      if(!userinfo) {
        //create new user and save to DB 
        bcrypt.hash(req.body.password, 10)
        .then( hash => {
          userModel.create({
            email: req.body.email,
            password: hash, 
            role: 'user', 
            name: req.body.name   
          })
          .then( data => {
            //create JWT and send 
            const token = jwt.sign ( 
              {
                id: data._id,
                email: data.email,
                name: data.name,
                admin: data.role == 'admin' ? true : false
              }
             , process.env.SECRET )
            res.status(200).send({ "auth": true , "token" : token })
          })
        })
      }
      else {
        res.status(400).json({"msg": "email already taken. Please choose another"})
      }
    })
    .catch( err => res.status(500).json(err))
  }

  static signIn (req,res) {
    mongoose.connect('mongodb://localhost:27017/To-Do-Fancy');
    userModel.findOne({email: req.body.email})
    .then( user => {
      if (!user) res.status(401).json("email not registered. Please register.");
      else {
        bcrypt.compare(req.body.password, user.password , function (err, same) {
          if (err) throw err;
          else {
            if(same===true) {
              const payload = {
                id: user._id,
                email: user.email,
                name: user.name,
                admin: user.role == 'admin' ? true : false
              }
              const token = jwt.sign(payload, process.env.SECRET);
              res.status(200).json({ "auth": true , "token" : token });
            }
            else {
              res.status(401).json("wrong password.")
            }
          };
        })
      }
    })
    .catch (err => res.status(500).json(err))
    
  }
}



 
module.exports = User