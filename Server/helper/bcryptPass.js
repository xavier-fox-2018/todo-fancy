const bcrypt = require('bcryptjs')

function bcryptPassword(user) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
    console.log(user, 'aaa')
    return user
}


module.exports = bcryptPassword