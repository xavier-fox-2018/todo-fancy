require('dotenv').config()
const User = require('../models/user')

const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

const isEmailExists = require('../helpers/isEmailExists')

class UserController {
  static homePage (req, res) {
    res.status(200).json({ message: 'hello' })
  }

  static register (req, res) {
    let hashed = bcrypt.hashSync(req.body.password, saltRounds)
    let user = new User({
      name: req.body.name,
      password: hashed,
      email: req.body.email
    })

    isEmailExists(user.email)
      .then(() => {
        user.save()
        .then(() => {
          res.status(201).json({ message: 'new user is successfully created!' })
        })
        .catch(err => {
          console.log(err)
          res.status(500).json(err)
        })
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static login (req, res) {
    User.findOne({ email: req.body.email })
      .then(data => {
        if (data) {
          bcrypt.compare(req.body.password, data.password)
            .then(isCorrect => {
              if (isCorrect) {
                let jwtToken = jwt.sign({ id: data._id, name: data.name, email: data.email }, process.env.JWT_SECRET)
                res.status(200).json({ token: jwtToken, name: data.name })
              } else {
                res.status(400).json({ message: 'email / password is wrong!' })
              }
            })
            .catch(err => {
              console.log(err)
              res.status(500).json(err)
            })
        } else {
          res.status(400).json({ message: 'Your email is not registered. Please, register first!' })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static googleLogin (req, res) {
    client.verifyIdToken({
      idToken: req.headers.token,
      audience: process.env.CLIENT_ID,
    }, (err, login) => {
      if (err) throw err
      const payload = login.getPayload()
      let user = new User({
        name: payload.name,
        email: payload.email
      })

      isEmailExists(user.email)
      .then(() => {
        user.save()
          .then(data => {
            console.log(data)
            let jwtToken = jwt.sign({ id: data._id, name: data.name, email: data.email }, process.env.JWT_SECRET)
            res.status(201).json({ message: 'new user is successfully created!', token: jwtToken, name: data.name })
          })
          .catch(err => {
            console.log(err)
            res.status(500).json(err)
          })
      })

      User.findOne({ email: payload.email })
        .then(data => {
          let jwtToken = jwt.sign({ id: data._id, name: data.name, email: data.email }, process.env.JWT_SECRET)
          res.status(200).json({ token: jwtToken, name: data.name })
        })
        .catch(err => {
          console.log(err)
          res.status(500).json(err)
        })
    });
  }
}

module.exports = UserController
