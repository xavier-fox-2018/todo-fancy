const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

class helper {

  static hashPassword (password) {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);
    return hash;
  }
  
  
}

module.exports = helper