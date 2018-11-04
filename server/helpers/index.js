const User = require('../models/users')

module.exports = {
    registerWithGoogle(req, res, next){
        User.findOne({
            email: req.decoded.email
        })
        .then((result) => {
            if(!result){
                // console.log(result);
                User.create({
                    email: req.decoded.email,
                    name: req.decoded.name,
                    isGoogle: true,
                    picture: req.decoded.picture,
                    password: process.env.PASS
                })
                .then((result) => {
                    // console.log(result);
                    next()
                }).catch((err) => {
                    res.status(500).json({err: err})
                });
            } else {
                next()
            }
        }).catch((err) => {
            res.status(500).json({err: err})
        });
    }
}