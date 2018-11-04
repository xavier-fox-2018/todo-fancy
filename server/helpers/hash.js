const bcrypt = require('bcryptjs')


module.exports = {
  hash: function(password) {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(password, salt);
  },
  decodePass: function(dbPass, loginPass) {
    return bcrypt.compareSync(loginPass, dbPass)
  }
  
}

// let hash = function(password) {
//   const saltRounds = 10;
//   var salt = bcrypt.genSaltSync(saltRounds);
//   return bcrypt.hashSync(password, salt);
// }
// let decodePass = function(dbPass, loginPass) {
//   return bcrypt.compareSync(loginPass, dbPass)
// }

// console.log(hash('123456'))
// let p = hash('123456')
// let q = '123456'
// console.log(decodePass(p,q))