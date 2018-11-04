const jwt = require('jsonwebtoken')
function createJWTToken(data) {
    return new Promise(function(resolve, reject) {
        let tokenContent = {
            id: data._id,
            email: data.email
        }
        let token = jwt.sign(tokenContent, process.env.JWT_secret)
        resolve(token)
    })
}

module.exports = createJWTToken