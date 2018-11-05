require('dotenv').config()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  let user = jwt.verify(req.headers.token, process.env.JWT_SECRET)
  User.findById(user.id)
    .then(data => {
      if (data.email == user.email) {
        next()
      } else {
        res.status(403).json({ message: 'Please login first!' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}