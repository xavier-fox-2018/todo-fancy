const jwt = require('jsonwebtoken')

module.exports = {
    jwtEncode: (data) =>{
        return jwt.sign(data, process.env.JWTSECRET)
    },
    jwtDecode: (token) => {
        let decode = jwt.verify(token, process.env.JWTSECRET)
        return decode
    }  
}