const jwt = require('jsonwebtoken')

class JwtEncoder{
    static encode(objData){
        return jwt.sign(objData, process.env.SECRET_JWT)
    }
}

module.exports = JwtEncoder