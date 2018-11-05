const Helper = require('../helper/index')

function checkAuthentical ( req, res, next) {
    // console.log(`masuk`)
    // console.log(req.headers.jtoken)
    // const decoded = Helper.decodeJws( req.headers.jtoken )
    // console.log(Helper.decodeJws( req.headers.jtoken ))
    if ( req.headers.jtoken !== null ) {
        next()
    } else {
        res.status(500).json("log in please!")
    }
}

module.exports = checkAuthentical