const jwt = require('jsonwebtoken')
const User = require('../models/user')

class MiddleWare {

    static isLogin(req, res, next) {
        if (req.headers.hasOwnProperty('token')) {
            try{
                const decoded = jwt.verify(req.headers['token'], process.env.JWT_TOKEN)
                User.findOne({
                    email: decoded.email
                })
                .then(user => {
                    if (user) {
                        req.user = user
                        next()
                    } else {
                        res.status(400).json({message: 'no access login'})
                    }
                })
                .catch(err => {
                    res.status(500).json({err})
                })
            }catch(err) {
                res.status(500).json({err})
            }
        } else {
            res.status(400).json({message: 'no token access'})
        }
    }

}

module.exports = MiddleWare