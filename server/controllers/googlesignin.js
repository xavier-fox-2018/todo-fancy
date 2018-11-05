const axios = require('axios'),
      hash = require('bycjwt'),
      User = require('../models/user'),

      
      {OAuth2Client} = require('google-auth-library'),
      client = new OAuth2Client(process.env.CLIENT_ID)
      


module.exports = {

    googleSignin: function(req, res) {
        let googleToken = req.headers.gtoken

        let ticket = new Promise( function(resolve, reject) {

            
            client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.CLIENT_ID
            }, function(err, result) {
                if(err) {
                    console.log('Gagal googlesignin', err)
                    reject(err)
                }
                else {
                    const payload = result.getPayload();
                    const userid = payload['sub'];
                    console.log('ini payload', payload);
                    console.log('ini userid', userid);
                    
                    resolve(userid)
                }
            })

            
        })
            .then(userId => {
                
                axios({
                    method: 'GET',
                    url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`
                })
                    .then(response => {
                        let userData = response.data
                        console.log(typeof userData);
                        
                        console.log(userData);
                        
                        User.findOne({
                            email: userData.email
                        })
                            .then(user => {
                                if (user && hash.bcdecode(userId, user.password)) {
                                    const token = hash.jwtencode({
                                        _id: user._id,
                                        name: user.name,
                                        email: user.email
                                    })
                                    console.log('User sudah ada dan valid, token: ', token);
                                    res.status(200).json({
                                        message: `${user.name} successfully logged in`,
                                        token: token
                                    })
                                }
                                else {
                                    let newUser = new User({
                                        name: `${userData.given_name} ${userData.family_name}`,
                                        email: userData.email,
                                        password: hash.bcencode(userId)
                                    })

                                    newUser.save()
                                        .then(result => {
                                            const token = hash.jwtencode({
                                                _id: result._id,
                                                name: result.name,
                                                email: result.email
                                            })
                                            res.status(201).json({
                                                message: `${userData.given_name} ${userData.family_name} successfully logged in`,
                                                token: token
                                            })
                                        })
                                }
                            })
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'Failed to log in',
                    error: err
                })
            })
        
        
    }
    
}