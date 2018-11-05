const expressJwt = require('express-jwt');
const config = require('config.json');
const jwt = require('jsonwebtoken');
module.exports = jwt;

function jwt(req,res) {
    const token = req.get("authorization");
    const decodedToken = jwt.decode(token) || {};
    res.json({
      id: process.env.APP_ID,
      sessionUserId: req.session.userId,
      jwtUserId: decodedToken.userId
    })
}