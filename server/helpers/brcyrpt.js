const bcrypt = require('bcryptjs')

module.exports = {
    genSalt : ()=>{
        return bcrypt.genSaltSync()
    },

    hashingPassword : (plainText,salt) =>{
        return bcrypt.hashSync(plainText, salt)
    },

    comparePassword : (password, hash) =>{
        return bcrypt.compareSync(password, hash)
    }
}