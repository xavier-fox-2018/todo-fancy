const jwt = require('jsonwebtoken');
const ModelUser = require('../models/users')
function checkLogin(req, res, next){
  console.log('as->', req.headers.token)
  if (req.headers.token) {
      try{
        const decode = jwt.verify(req.headers.token,'secret')
        console.log(decode.email)
        ModelUser.findOne({
          where:{
            email: decode.email
          }
        })  
        .then(function(data){
          next()
        })
        .catch(function(err){
          console.log(err)
        })
      }
      catch(err){
        console.log(err)
        res.status(500).json({
          message: 'internal server error'
        })
      }
  } else {
    res.status(400).json({
      message: 'No token found'
    })
  }
}

module.exports = checkLogin