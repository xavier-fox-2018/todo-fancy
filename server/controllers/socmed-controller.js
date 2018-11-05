const User = require('../models/user')
const hash = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')
const axios = require('axios')
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);


module.exports = {
    facebook: (req, res) => {
        console.log('masuk');
        let url = `https://graph.facebook.com/me?fields=id,name,gender,email&access_token=${req.body.accessToken}`
        axios({
            url: url,
            method: 'GET'
        })
        .then( response => {
            // console.log(response);
            User.findOne({email:response.data.email})
                .then( result => {
                    if(!result) {
                        let fb = {
                            name: response.data.name,
                            email: response.data.email,
                            password: hash.encode(response.data.id)
                        }
                        User.create(fb)
                        .then(newUser => {
                            res.status(201).json({
                                err:false,
                                message: `Success to add ${newUser.name}`,
                                data: newUser,
                                token:jwtEncode.jwtencode({
                                    id: newUser._id,
                                    name: newUser.name,
                                    email: newUser.email
                                })
                            })
                        })
                    } else {
                        console.log(result)
                        let token = jwt.jwtEncode({
                            id: result._id,
                            name: result.name,
                            email: result.email
                        })
                        res.status(200).json({token: token, name: result.name})
                    }
                })
                .catch( err => {
                    console.log(err);
                })
        })
        .catch( err => {
            console.log(err)
            res.status(500).json(err.message)
        })
        
    },

    google: (req, res)=>{
        let token = req.body.gtoken
        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        }, (err, response)=>{
            if(!err){
                User.findOne({email: response.payload.email})
                .then(result =>{
                    if(!result){
                        let googleId = {
                            name: response.payload.name,
                            email: response.payload.email,
                            password: hash.encode(response.payload.sub)
                        }
                        User.create(googleId)
                        .then(newUser =>{
                            console.log(`ini useerrrr baru`,newUser);
                            res.status(201).json({
                                err: false,
                                message: `Succes to add ${newUser.name}`,
                                data: newUser,
                                token: hash.jwtEncode({
                                    id: newUser._id,
                                    name: newUser.name,
                                    email: newUser.email
                                })
                            })
                        })  
                    } else {
                        let token = hash.jwtEncode({
                            id: result._id,
                            name: result.name,
                            email: result.email
                        })
                        // console.log(`ini useerrrr lamaaa`,{token: token, name: result.name});
                        res.status(200).json({token: token, name: result.name}) 
                    }
                })
                .catch(err =>{
                    res.status(500).json(err)
                    // console.log('masuk errooooor', err);  
                })
            } else {
                res.status(500).json(err) 
                // console.log('masuk errooooor bawahhh');
            }  
        })
    }
    
}