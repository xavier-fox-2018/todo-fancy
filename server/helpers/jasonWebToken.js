const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {
    encoded : (user) => {

        let token = jwt.sign(user , process.env.JWT_SECRET)
        return token

    },
    decoded : (token) => {

        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded
        
    }
}