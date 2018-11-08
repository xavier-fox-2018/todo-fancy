const jwt = require('jsonwebtoken')

module.exports = {
    isLogin(req,res, next) {
        console.log(`masuk sini`);
        
        
        let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
            if ( err ) {
                // console.log((err));
                res.status(401).json({
                    message: `You're not a user`
                })
            }
            else {
                req.data = decoded
                // console.log(req.data, 'ini isLogin');
                next()
            }
        })
    },
}