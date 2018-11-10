const hash = require('../helpers/jwt')
const User = require('../models/user')

module.exports = {
    isLogin: (req, res, next) =>{
        let token = req.headers.token
        if(token){
            let verify = hash.jwtDecode(token)
            User.findOne({_id: verify.id})
            .then(result =>{
                // console.log(result);
                if(result){
                    req.decoded = verify
                    next()
                } else {
                    res.status(401).json({
                        message: `Your No Access`
                    })
                }
            })
            .catch( ()=>{
                res.status(500).json({
                    message: `Server Error`
                })
            })
        } else {
            res.status(401).json({
                message: `No Authenticate`
            })
        }
    }
}