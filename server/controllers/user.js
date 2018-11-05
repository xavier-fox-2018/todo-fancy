const hash = require('bycjwt'),
      User = require('../models/user')


module.exports = {

    register: (req, res) => {
        const objUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        objUser.save()
            .then(result => {
                console.log('Berhasil sign up');
                res.status(201).json({
                    message: 'Registered successfully',
                    data: result
                })
            })
            .catch(err => {
                console.log('inni data input', req.body);
                
                console.log('Gagal sign up');
                res.status(500).json({
                    message: 'Registration failed',
                    error: err
                })
            })
    },

    login: (req, res) => {
        let email = req.body.email
        let password = req.body.password

        User
            .findOne({
                email: email
            })
            .then(user => {
                console.log('Masuk then di login')
                if (hash.bcdecode(password, user.password)) {
                    console.log('Berhasil sign in');
                    
                    myToken = hash.jwtencode({
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    })
                    res.status(200).json({
                        message: 'Logging in successfully',
                        token: myToken
                    })
                }
                else {
                    console.log('Password tidak sesuai');
                    
                    res.status(400).json({
                        message: 'Incrorrect password'
                    })
                }
            })
            .catch(err => {
                console.log('Gagal sign in')
                res.status(500).json({
                    message: 'Login failed',
                    error: err
                })
            })
    }  
}