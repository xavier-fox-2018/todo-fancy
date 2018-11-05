const User = require('../models/user'),
  hash = require('bycjwt')

module.exports = {
  authenticate: function(req, res, next) {
    const validUser = hash.jwtdecode(req.headers.token)
    console.log('masuk auth')
    
    if (req.headers.token === undefined || validUser === undefined) {
      console.log('auth nya error');
      
      
      res.status(404).json({
        message: 'Token not valid or does not exist'
      })
    }
    else {
      console.log('Masuk auth yg sukses');
      console.log('bisa lewat ', validUser.name);
      req.data = validUser
      next()
    }
    
  },

  authorize: function(req, res, next) {
    User.findOne({
      _id: req.data._id
    })
      .then(() => next())
      .catch(err => res.status(403).json({message: 'Permission to access site is denied' + err}))
  }
}
