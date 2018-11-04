const Helpers = require('../helper/index')

class Middleware {
    static checkLogin(req,res,next){
        Helpers.getUserDataServer(req.body.token)
        .then(data => {
            if (data.email === undefined){
                res.status(401).send('error')
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(401).send('error')
        })
    }
}

module.exports = Middleware