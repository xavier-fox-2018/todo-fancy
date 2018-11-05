const User = require('../models/user'),
      hash = require('bycjwt')

class Auth {

    static authenticate(req, res, next) {
        const validUser = hash.jwtdecode(req.headers.token)

        if (req.headers.token) {
            console.log('masuk authenticate sukses')
            req.data = validUser
            next()
        }
        else {
            console.log('masuk authenticate gagal');
            res.status(500)
        }
    }
    static authorize(req, res, next) {
        User.find({
            _id: req.data._id
        })
            .then(() => {
                console.log('User punya authorization');
                
                next()
            })
            .catch(err => {
                console.log('Bukan milik user tersebut', err);
                req.status(500).json({
                    message: `Doesn't have access`,
                    error: err
                })
            })
    }
}

module.exports = Auth;