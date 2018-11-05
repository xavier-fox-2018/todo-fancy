const User = require('../models/user')
const Helper = require('../helper/index')
const jwt = require('jsonwebtoken');
require('dotenv').config()

class UserController {

    static create ( req, res ) {
        let user = new User ({
            email: req.body.email,
            password: req.body.password
        })
        user.save( (err, data) => {
            if (err) {
                console.log( err )
                res.status(500).json({ "error found" : err})
            } if ( data ) {
                res.status(200).json( data )
            }
        })
    }

    static signIn ( req, res ) {
        User.findOne({ email : req.body.email})
            .then( user => {
                if ( user !== null ){
                    let hash = Helper.encryp( req.body.password, user.salt)
                    if ( user.password === hash ){
                        let data = { id : user._id}
                        let jToken = jwt.sign( data, process.env.jSecret)
                        res.status(200).json( {jToken} )
                    } else {
                        res.status(500).json( {"Upps something wrong.." : "please insert correct password!"} )    
                    }
                    
                } else {
                    res.status(500).json( {"Upps something wrong.." : "email not found, please register!"} )    
                }
            })
            .catch( err => {
                console.log(err)
                res.status(500).json( {"Upps something wrong.." : err} )
            })
    }

    static update ( req, res ) {
        User.updateOne({_id: req.params.id},{
            email: req.body.email,
            password: req.body.password
        })
            .then( User => {
                console.log( `masuk user`)
                res.status(200).json( User )
            })
            .catch( err => {
                console.log( err )
                res.status(500).json( err )
            })
    }

    static delete ( req, res ) {
        User.deleteOne({_id: req.params.id})
            .then( result => {
                res.status(200).json( result )
            })
            .catch( err => {
                res.status(500).json( err )
            })
    }

    static gSignIn ( req, res ) {
        const {OAuth2Client} = require('google-auth-library');
        const client = new OAuth2Client(process.env.gSecret);
        client.verifyIdToken({
            idToken: req.headers.gtoken
        },( err, result ) => {
            if ( err ) {
                res.status(500).json( err )
            } else {
                User.findOne({ email : result.payload['email']})
                .then( user => {
                    if ( user !== null ){
                        let data = { id : user._id}
                        let jToken = jwt.sign( data, process.env.jSecret )
                        res.status(200).json( {jToken} )                       
                    } 
                    else {
                        let user = new User ({
                            email: result.payload['email'],
                            password: req.headers.gtoken
                        })
                        user.save( (err, data) => {
                            if (err) {
                                console.log( err )
                                res.status(500).json({ "error found" : err})
                            } if ( data ) {
                                let data = { id : user._id}
                                let jToken = jwt.sign( data, process.env.jSecret)
                                res.status(200).json( {jToken} )
                            }
                        })
                    }
                })
                .catch( err => {
                    console.log(err)
                    res.status(500).json( {"Upps something wrong.." : err} )
                })
            }
        });
    }
}

module.exports = UserController