const Task = require('../models/taskModel.js');

function isAuthorizedUser(req, res, next) {
    if (req.user) {
        try {
            Task.findById(req.params.id)
                .then(function(task) {
                    if (req.user._id.equals(task.user)) {
                        next();
                    } else {
                        res.status(401).json({
                            message: 'You can only access your own data'
                        });
                    }
                })
                .catch(function(err) {
                    res.status(500).json(err);
                });
        } catch(err) {
            res.status(500).json({
                error: err
            });
        }
    } else {
        res.status(400).json({
            message: 'Token not found'
        });
    }
}

module.exports = isAuthorizedUser;