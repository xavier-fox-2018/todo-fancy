const crypto = require('crypto')
const jwt = require('jsonwebtoken')

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
        let check = jwt.verify( jToken, '67^%$3jHu9sdFei33S%!8#!5')
        console.log(check) // REMINDER : pindahkan ke env
        return check
    }
}


module.exports = Helper