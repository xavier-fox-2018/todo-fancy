const bcrypt = require('bcryptjs')

class hashBcrypt{
    static encode(password){
        return bcrypt.hashSync(password, process.env.SECRET_JWT)
    }

    static decode(password, hash){
        return bcrypt.compareSync(password, hash)
    }
}

module.exports = hashBcrypt