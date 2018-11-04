const bcrypt = require('bcryptjs')

function bcryptPassword(user) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
    return user
}


module.exports = bcryptPassword