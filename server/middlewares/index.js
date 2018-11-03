const jwt = require('jsonwebtoken')
const User = require('../models/user')

class Middleware {
    static authenticate(req,res,next){
        let token = req.headers.token

        if(token){
            const decoded = jwt.verify(token, process.env.secret_key);

            req.userId = decoded.id

            next()

        }else{
            res.status(400).json({
                message : 'token not found'
            })
        }
    }
}

module.exports = Middleware