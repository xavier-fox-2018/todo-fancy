
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authenticate = (req, res, next) => {    
    // console.log('masuk auth==>', req.headers)
    if (req.headers['authorization']) {
      let tokens = req.headers['authorization'].split(' ')      
      if (tokens[0] == 'Bearer') {          
        jwt.verify(tokens[1], process.env.JWT_SECRET, (err, decoded) => {
          // console.log('decoded===>', decoded, err)
          if (!err && decoded) {
            req.user = decoded                                                   
            User.findById(req.user.id)
            .then(user=>{
              if(user == null){
                res.status(400).json({ "error": "You are not authorized to access this API" })  
              }
              else{
                next()
              }              
            })
            .catch(err =>{
              res.status(400).json({ "error": "You are not authorized to access this API" })  
            })                        
          } else {            
            res.status(400).json({ "error": "You are not authorized to access this API" })
          }
        })
      }
    } else {
      res.status(400).json({ "error": "You are not authorized to access this API" })
    }
  }

  module.exports = authenticate