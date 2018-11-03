const crypto = require('crypto');

function encryptPassword(password) {
    return crypto.createHmac(process.env.ENCRYPTION_TYPE, process.env.ENCRYPTION_SECRET)
                    .update(password)
                    .digest('hex');
}

module.exports = encryptPassword;