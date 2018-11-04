const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

function isLogin(req, res, next) {
    if (req.headers.hasOwnProperty('access-token')) {
        try {
            const decoded = jwt.verify(req.headers['access-token'], process.env.JWT_KEY);
            User.findOne({email: decoded.email})
                .then(function(user) {
                    if (user) {
                        req.user = user;
                        next();
                    } else {
                        const err = {
                            message: "Validation Error: User's exclusive feature"
                        };
                        res.status(500).json(err);
                    }
                })
                .catch(function(err) {
                    res.status(500).json(err);
                })
        } catch (err) {
            res.status(500).json({
                error: err
            });
        }
    } else {
        res.status(500).json({
            message: 'Token not found'
        });
    }
}

module.exports = isLogin;