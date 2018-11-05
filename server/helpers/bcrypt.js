const bcrypt = require('bcryptjs')

module.exports = {
    encode: (password) =>{
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        return hash
    },

    decode: (inputPassword, hash) =>{
        return bcrypt.compareSync(inputPassword, hash)
    },
}