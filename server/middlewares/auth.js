const UserModel = require('../models/UserModel.js')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const CLIENT_ID = process.env.CLIENT_ID
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(CLIENT_ID)

module.exports = {

    isLogin : function (req, res, next) {
        let token = req.headers.token

        if (token) {
            
            jwt.verify(token, process.env.JWTSECRET, function (err, decoded) {
                if (!err) {
                    UserModel.findOne({
                            _id: decoded.id
                        })
                        .then(function (user) {
                            req.user = user
                            next()
                        })
                        .catch(function () {
                            res.status(500).json({
                                message: `Log in first to use this application`
                            })
                        })
                } else {
                    res.status(500).json({
                        message: `Log in first to use this application`
                    })
                }
            })

        } else {
            res.status(500).json({
                message: `token required`
            })
        }
    },

    googleAuth(req, res, next) {
        let googleToken = req.body.googleToken

        let ticket = new Promise(function (resolve, reject) {

                client.verifyIdToken({
                    idToken: googleToken,
                    audience: CLIENT_ID
                }, function (err, data) {
                    if (!err) {
                        let payload = data.getPayload()
                        let userid = payload['sub']
                        resolve(userid)
                    } else {
                        reject(err)
                    }
                })

            })
            .then(userid => {

                axios({
                        method: 'GET',
                        url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`
                    })
                    .then(result => {
                        req.body.name = result.data.name
                        req.body.email = result.data.email
                        next()
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: `access denied`
                        })
                    })
                    
            })
    }
}