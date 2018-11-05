const jwt = require('jsonwebtoken');

module.exports = {
    getToken(data) {
        return jwt.sign(data, process.env.SECRET_JWT);
    },

    verifToken(data) {
        return jwt.verify(data, process.env.SECRET_JWT);
    }
}