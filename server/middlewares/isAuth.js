const token = require('../helpers/jwt.js');

module.exports = {
    
    isAuth(req, res, next) {
        if(req.headers.token) {
            try{
                const decodeToken = token.verifToken(req.headers.token);
                User.findOne({
                    where: {
                        email: decodeToken.email
                    }
                })
                    .then(function(resolve) {
                        req.user = decodeToken;
                        next();
                    })
                    .catch(function(reject) {
                        res.status(400).json({
                            message: reject.message
                        });
                    });
            }catch(err){
                res.status(400).json({
                    message: err.message
                });
            }
        }else{
            res.status(400).json({
                message: "Tidak ada otoritas"
            });
        }
    }

}