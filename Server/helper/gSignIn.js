const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("1049955970825-t0t8qh3fg4rekt89558rv99f09no336p.apps.googleusercontent.com");
const accountUser = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const gSignin = function (req,res) {
    // console.log(req.body);
    // console.log("masuk");
    let token = req.body.gToken // ini dari req.body {token: valueToken}
    let clientId = "1049955970825-t0t8qh3fg4rekt89558rv99f09no336p.apps.googleusercontent.com"
    client.verifyIdToken({
        idToken : token,
        audience: clientId
    }, function(err, response) {
        if(!err){
            // console.log('gak error')
            // console.log(response)
            console.log(response.payload);
            let emailUser = response.payload.email // ini dari payload email
            accountUser.findOne({
                email: emailUser
            },function(error,response) {
                if (response) {
                    // console.log("IniRahasiaKitaYa");
                    console.log(response.email);
                    
                    const token = jwt.sign({response}, "IniRahasiaKitaYa")
                    
                    res.status(200).json({
                        response: response,
                        token: token
                    })
                }
                else {
                    accountUser.create({
                        email: emailUser,
                        password: 12345
                    }, function(error, response) {
                        if (!err) {
                            
                            const token = jwt.sign({response}, "IniRahasiaKitaYa")
                            res.status(201).json({
                                response: response,
                                token: token
                            })
                        }
                    })
                }
            })
            
        }else{
            console.log(err)
        }
    })
}



module.exports = {
    isLogin(req,res, next) {
        let decoded = jwt.verify(req.headers.token, "IniRahasiaKitaYa", (err, decoded) => {
            if ( err ) {
                console.log((err));
                res.status(401).json({
                    message: `You're not a user`
                })
            }
            else {
                req.data = decoded
                console.log(req.data, 'ini isLogin');
                next()
            }
        })
    },
    
    gSignin,

    generatePassword (email, password) {
        return new Promise(function (resolve, reject) {
          const saltRound = 10
          const emailPassword = email + password
          bcrypt.genSalt(saltRound, function (err, salt) {
            bcrypt.hash(emailPassword, salt, function (err, hash) {
              if (!err) {
                resolve(hash)
              } else {
                reject(err)
              }
            })
          })
        })
      },
    
      checkPassword (salt, password, email) {
        return new Promise((resolve, reject) => {
          const emailPassword = email + password
          bcrypt.compare(emailPassword, salt, function (err, data) {
            if (data) {
              resolve(data)
            } else {
              reject(err)
            }
          });
        })
      }
}