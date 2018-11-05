const {OAuth2Client} = require('google-auth-library')
require('dotenv').config()
const client = new OAuth2Client(process.env.GoogleClient_ID)
// const client = new OAuth2Client("757331088672-pola7jfrgp45f8h11j5t5mtu7mutggm3.apps.googleusercontent.com")
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

class UserController {
    static readAll(req, res) {
        User.find()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static googleLogin(req, res) {
        // start disini!
        const gToken = req.body.gToken
        // console.log(gToken, 'iniiiiii'); udah masuk
        
        client.verifyIdToken({
            idToken: gToken,
            audience: process.env.GoogleClient_ID
        }, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                const payload = result.getPayload();
                console.log(payload);
                res.json(payload)
                User.findOne({ email: payload.email })
                    .then(data => {
                        console.log('pusinggg', data);
                        if (!data) { 
                            User.create({
                                name: payload.name,
                                email: payload.email,
                                password: process.env.randomPassword,// randomnya gimanaaa?? nnti pake env!
                                isGoogle: true
                            })
                                .then(result => {
                                    console.log('this is from creating new user: ', result);
                                    let token = jwt.sign({ name: payload.name, email: payload.email }, process.env.SECRET_KEY)
                                    res.status(200).json({ token: token })
                                })
                                .catch(err => {
                                    console.log(err);
                               })
                        }
                        else { 
                            let token = jwt.sign({ name: payload.name, email: payload.email }, process.env.SECRET_KEY)
                            res.status(200).json({ token: token })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
    }
}


module.exports = UserController;