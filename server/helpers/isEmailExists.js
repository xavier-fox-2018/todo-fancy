const User = require('../models/user')

module.exports = (email) => {
  return new Promise((resolve, reject) => {
    console.log(email)
    User.find({ email: email }, (err, docs) => {
      if (err) throw err
      console.log(docs)
      if (!docs.length) {
        resolve()
      } else {
        reject({ message: 'email already exists!' })
      }
    })
  })
}
