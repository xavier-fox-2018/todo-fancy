const User = require('../models/user');
const jwt = require('jsonwebtoken');

function isAuthorized(req, res, next) {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    User
      .findById(decoded.id)
      .then(data => {
        if (decoded.email === data.email) {
          next()
        } else {
          res.status(401).json({
            msg : 'Unauthorized access'
          })
        }
      })
      .catch(err => {
        res.status(402).json({
          msg : 'email invalid'
        })
      })   
}

module.exports = isAuthorized;