const axios = require('axios'),
  { OAuth2Client } = require('google-auth-library'),
  client = new OAuth2Client("1098726616042-vknuh9sb65226gki3u9a6u75ibq90414.apps.googleusercontent.com"),
  jwt = require('jsonwebtoken'),
  User = require('../models/user'),
  ObjectId = require('mongodb').ObjectId,
  apiRoute = require('../helpers/apiRoute'),
  crypto = require('crypto'),
  cryptoRandomString = require('crypto-random-string'),
  sgMail = require('@sendgrid/mail'),
  { OAuth2Client } = require('google-auth-library'),
  client = new OAuth2Client(CLIENT_ID);

require('dotenv').config()
sgMail.setApiKey("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");

class UserController {

  // * DONE
  static create(req, res) {
    const inp = req.body,
          salt = cryptoRandomString(10),
          hash = crypto.createHmac('sha256', inp.password)
            .update(salt) // ?this is the salt
            .digest('hex');

    User.find({ email: req.body.email }, (err, data) => {
      if (data.length > 0) {
        res.json({
          message: "Email has ben used"
        })
      } else {
        let newUser = new User({
          validated: false,
          name: inp.name,
          email: inp.email,
          salt: salt,
          password: hash,
          googleId: inp.googleId || null,
          tasksId: []
        }).save()
          .then(data => {
            console.log(data)
            // send verification email
            const msg = {
              to: data.email,
              from: 'senecamanu.a@gmail.com',
              subject: `Welcome to Maso, ${data.name}`,
              html: `<h5>Verify your email account below</h5>
                     <p><a href="http://localhost:4000/api/user/verify/${data._id}">Click here</a>. Confirm your email before you can start using it.</p>`,
            };
            sgMail.send(msg, (err, response) => {
              err ? console.log(err) && res.json(err) : res.json({
                message: "New User has been successfully made made!",
                data: data
              })
            });
        })
          .catch(err => res.status(500).json(err))
      }
    })    
  }

  // * NOT YET
  static googleCreate(req, res) {
    

  }

  // * NOT YET
  static verify(req, res) {
    User.update({ _id: req.params.id }, { $set: { validated: true } }, (err, result) => {
      err ? res.json(err) : res.json({
        message: "User has been validated"
      })
    });
  }

  //  * DONE
  static delete(req, res) {
    User.deleteOne(
      { _id: ObjectId(req.params.id) },
      (err, data) => {
        err ? res.status(500).json(err) : res.json(data)
      }
    )
  }

  // * NOT YET DONE
  static emailFindOne(req, res) {
    let inp = req.body
    User.findOne({ email: inp.email })
        .exec((err, result) => {
          if (err) res.status(500).json(err)
          else {
              let salt = result.salt,
              hash = crypto.createHmac('sha256', inp.password)
                .update(salt) // ?this is the salt
                .digest('hex');
            
            if (hash === result.password) {
              if (result.validated === false) {
                res.json({
                  message: "User not validated"
                })
              } else {
                let toJwt = {
                  name: result.name,
                  email: result.email,
                  _id: result._id
                }
                let jwtUser = jwt.sign(toJwt, process.env.JWT_SECRET)
                res.json({
                  jwtUser: jwtUser,
                  userId: result._id,
                  name: result.name
                })
              }
            }
          }
        })
  }

  // * DONE
  static findOne(req, res) {
    User.find({ _id: ObjectId(req.params.id) })
        .populate({ path: 'tasksId', options: { sort: { "priority": "descending" } } })
        .exec((err, result) => {
          err ? res.status(500).json(err) : res.json(result)
        })
  }

  // * DONE
  static find(req, res) {
    User.find()
        .populate({ path: 'tasksId', options: { sort: { "priority": "descending" } } })
        .exec((err, result) => {
          err ? res.status(500).json(err) : res.json(result)
        })
  }

  // * NOT YET DONE
  static verifyToken(req, res) {
    let jwtUser = jwt.verify(req.params.userToken, process.env.JWT_SECRET)
    res.json({
      id: jwtUser
    })
  }

  // * DONE
  static updateOne(req, res) {

    // ini jalan fine-fine aja tapi dia gabisa ganti password
    User.updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: req.body },
      (err, data) => {
        err ? res.status(500).json(err) : res.json(data)
      }
      )

    //  ? mendadak autistic gue
    // User.findById(req.params.id, function (err, user) {
    //   if (err) res.status(500).json(err)
    //   else {
    //     const inp = req.body,
    //           salt = cryptoRandomString(10),
    //           tasksId = null, // will be replaced below
    //           hash = crypto.createHmac('sha256', user.password)
    //             .update(salt)
    //             .digest('hex')

    //     const updateUser = {
    //       name: user.name,
    //       email: user.email,
    //       password: hash,
    //       salt: salt,
    //       googleId: user.googleId || null,
    //       tasksId: user.tasksId
    //     }

    //     User.findByIdAndUpdate(req.params.id, updateUser, (err, result) => {
    //       err ? res.status(500).json(err) : res.json(result)
    //     })
    //   }
    // })
  }
}

module.exports = UserController