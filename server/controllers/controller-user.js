//google 
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

//json web token
const { encoded, decoded } = require('../helpers/jasonWebToken')

//model
const User = require('../models/user')


module.exports = {
    gSignIn : (req, res) => {
        let gtoken = req.body.gtoken
       
        client.verifyIdToken({
            idToken : gtoken,
            audience : process.env.CLIENT_ID
        }, (error, data) => {
            if (error) {
                res.status(500).json({message : 'Error while auntentice google sign in', error: error.message})
            }else {
                let email = data.payload.email
                let name = data.payload.given_name
                let password= data.payload.given_name

                User
                    .findOne( { email })
                    .then( user => {
                        if ( user ) {
                            let _id = user._id
                            let jtoken = encoded({ email, name, _id})  
                            res.status(200).json( jtoken )
                        }else {
                            let user = new User({ name, email, password })
                            user
                                .save()
                                .then( user => {
                                    let _id = user._id
                                    let jtoken = encoded({ email, name,_id })
                                    res.status(200).json( jtoken )
                                })
                                .catch( error => {
                                    res.status(500).json({ message : 'Error create user in database', error: error.message})   
                                })
                        }
                    })
                    .catch( error => {
                        res.status(500).json({ message : 'Error check user in database', error: error.message})   
                    })
            }
        })

    }
}