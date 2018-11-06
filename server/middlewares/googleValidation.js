const jwt = require('jsonwebtoken')
require('dotenv').config()
const {OAuth2Client} = require('google-auth-library')
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID)

function validGoogleToken(req, res, next){
  client.verifyIdToken({
      idToken: req.body.gToken,
      audience: CLIENT_ID
  }, function(err, result) {
      if(err){
          res.send(500).json(err)
      } else {
          const payload = result.getPayload();
          // console.log(payload);
          let user = {
              email: payload.email,
              username: payload.name
          }
          req.decoded = user
          next()
      }
  })
}

module.exports = validGoogleToken