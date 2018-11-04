const bcrypt = require('bcryptjs')

class Helper {

    static generateSalt(salt){
        return bcrypt.genSaltSync(salt)
    }

    static hashPassword(password, salt) {
        return bcrypt.hashSync(password, salt)
    }

    static comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
}

module.exports = Helper