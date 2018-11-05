const Group = require('../models/groupModel.js');

function isInGroup(req, res, next) {
    if (req.user) {
        try {
            Group.findById(req.params.groupId)
                .then(function(group) {
                    const userId = req.user._id;
                    const filteredUser = group.userList.filter(function(user) {
                        return userId.equals(user);
                    });

                    if (filteredUser.length === 1) {
                        next();
                    } else if (filteredUser.length === 0) {
                        console.log('Wrong Group')
                        res.status(401).json({
                            message: 'Wrong group. You can only access your own group data'
                        });
                    }
                })
                .catch(function(err) {
                    console.log('Error Find Group')
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

module.exports = isInGroup;