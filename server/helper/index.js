const { OAuth2Client } = require('google-auth-library');
require('dotenv').config()
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')


class Helpers {

    static getUserData(input) {

        return new Promise((resolve, reject) => {
            const client = new OAuth2Client(process.env.Google_client_id);
            client.verifyIdToken({
                idToken: input,
                audience: process.env.Google_client_id
            }, function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    resolve(data.payload)
                }
            });
        })
    }

    static createUser(input) {

        return new Promise((resolve, reject) => {
            const client = new OAuth2Client(process.env.Google_client_id);
            client.verifyIdToken({
                idToken: input,
                audience: process.env.Google_client_id
            }, function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    resolve(userModel.create({
                        name: data.payload.name,
                        email: data.payload.email,
                        photo: data.payload.picture
                    }))
                }
            });
        })
    }

    static getUserDataServer(input) {
        var data = jwt.verify(input, process.env.JWT_Secret)
        return userModel.findOne({
            email: data.email
        })
    }


}



module.exports = Helpers