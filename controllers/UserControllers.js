const ModelUser = require('../models/users')
const ModelTask = require('../models/tasks')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')
const request = require('request')
const client =  new OAuth2Client(process.env.GTOKEN)
class User {
    static login(req, res){
        client.verifyIdToken({
            idToken: req.body.gtoken,
            audience: process.env.GTOKEN,
        }, function(err, response){
            if (err) {
                console.log(err)
            } else {
                const payload = response.getPayload();
                const email = payload['email']; 
                ModelUser.findOne({
                    email: email
                },function(err, data){
                    if(data){
                        const token = jwt.sign({
                            email: data.email
                        },'secret')
                        res.status(200).json({
                            token: token,
                            email:email
                        })
                    } else {
                        let user = new ModelUser({
                            name: payload['name'],
                            email: payload['email']
                        })
                        user.save((err, data)=>{
                            if (err) {
                                res.status(500).json({
                                    message:'error on created new User',
                                    err
                                })
                            }
                            const token = jwt.sign({
                                email: data.email
                            },'secret')
                            res.status(200).json({
                                message:'Create token success',
                                token: token
                            })
                            // localStorage.setItem(token)
                        })
                    }
                })
            }
        })
    }

    


}

module.exports = User