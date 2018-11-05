const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class Helper {
    static encryp ( pass, salt ) {
        let hash = crypto.createHmac('sha256', salt)
                .update( pass )
                .digest( 'hex' )
        return hash
    }

    static decodeJws ( jToken ) {
        console.log(`dalem helper decode`)
        console.log(jToken)
        let check = jwt.verify( jToken, process.env.jSecret)
        console.log(check) // REMINDER : pindahkan ke env
        return check
    }
}


module.exports = Helper