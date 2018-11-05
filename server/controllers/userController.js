const User = require('../models/userModel.js');
const Group = require('../models/groupModel.js');
const jwt = require('jsonwebtoken');
const encryptPassword = require('../helpers/encryptPassword.js');
const axios = require('axios');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
    static register(req, res) {
        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        user.save()
            .then(function(user) {
                const response = {
                    success: true,
                    message: `Account ${user.username} registered`
                }
                res.status(201).json(response);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static login(req, res) {
        req.body.password = encryptPassword(req.body.password);

        User.findOne({
            email: req.body.email,
            password: req.body.password
        })
            .then(function(user) {
                if (user) {
                    const token = jwt.sign({id: user._id, username: user.username, email: user.email}, process.env.JWT_KEY);
                    res.status(201).json({token: token});
                } else {
                    const err = {
                        message: 'Wrong username or password'
                    };
                    res.status(400).json(err);
                }
            })
            .catch(function(err ){
                res.status(500).json(err);
            });
    }

    static googleLogin(req, res) {
        const googleToken = req.body.googleToken;
        var ticket = new Promise(function(resolve, reject) {
            client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID
            }, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    const payload = data.getPayload();
                    const userId = payload['sub'];
                    resolve(userId)
                }
            });
        })
            .then(function(userId) {
                axios({
                    method: 'GET',
                    url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`
                })
                    .then(function(userData) {
                        User.findOne({email: userData.data.email})
                            .then(function(user) {
                                if (user) {
                                    const token = jwt.sign({id: user._id, username: user.username, email: user.email}, process.env.JWT_KEY);
                                    res.status(201).json({token: token});
                                } else {
                                    let user = new User({
                                        username: userData.data.name,
                                        email: userData.data.email,
                                        password: process.env.OAUTH_PASSWORD,
                                        viaThirdParty: true
                                    });
                                    user.save()
                                        .then(function(user) {
                                            const token = jwt.sign({id: user._id, username: user.username, email: user.email}, process.env.JWT_KEY);
                                            res.status(201).json({token: token});
                                        })
                                        .catch(function(err) {
                                            res.status(500).json(err);
                                        });
                                }
                            })
                            .catch(function(err) {
                                res.status(500).json(err);
                            });
                    })
                    .catch(function(err) {
                        res.status(500).json(err);
                    });
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static getProfile(req, res) {
        User.findById(req.user._id).populate('taskList invitationList').populate({
            path: 'groupList',
            populate: {path: 'userList', select: '_id username email invitationList'}
        })
            .then(function(user) {
                res.status(200).json(user);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static getAllUsers(req, res) {
        User.find()
            .then(function(users) {
                res.status(200).json(users);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static getAllUsersToInvite(req, res) {
        // Find users who doesn't have an invitation from this group or currently is not in this group
        User.find({
            invitationList: {
                $ne: req.params.groupId
            }, 
            groupList: {
                $ne: req.params.groupId
            }
        })
            .then(function(users) {
                if (req.query.username) {
                    const filteredUsers = users.filter(function(user) {
                        const testCase = new RegExp(req.query.username, 'i');
                        const regexTest = testCase.test(user.username);
                        return regexTest;
                    });
    
                    res.status(200).json(filteredUsers);
                } else {
                    res.status(200).json(users);
                }
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static createGroup(req, res) {
        Group.create({
            name: req.body.name,
            userList: req.user._id
        })
            .then(function(group) {
                User.findByIdAndUpdate(req.user._id, {
                    $push: {
                        groupList: group._id
                    }
                })
                    .then(function(result) {
                        res.status(201).json({
                            group: group,
                            message: `Successfully created group ${group.name}`
                        });
                    })
                    .catch(function(err) {
                        res.status(500).json(err);
                    });
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static getUsersinGroup(req, res) {
        Group.findById(req.params.groupId).populate('userList')
            .then(function(group) {
                res.status(200).json(group);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static sendInvitation(req, res) {
        User.findOneAndUpdate({username: req.body.username}, {
            $push: {
                invitationList: req.body.group
            }
        })
            .then(function(result) {
                res.status(200).json({
                    message: `Successfully sent an invitation to ${req.body.username}`
                });
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static refuseInvitation(req, res) {
        User.findByIdAndUpdate(req.user._id, {
            $pull: {
                invitationList: req.body.group
            }
        })
            .then(function(result) {
                res.status(200).json({
                    message: `Successfully refused the invitation`
                });
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static acceptInvitation(req, res) {
        Group.findByIdAndUpdate(req.body.group, {
            $push: {
                userList: req.user._id
            }
        })
            .then(function(resultGroup) {
                User.findByIdAndUpdate(req.user._id,  {
                    $push: {
                        groupList: req.body.group
                    }
                })
                    .then(function(resultUser) {
                        User.findByIdAndUpdate(req.user._id, {
                            $pull: {
                                invitationList: req.body.group
                            }
                        })
                            .then(function(resultInvitation) {
                                res.status(200).json({
                                    message: `Successfully join the group`
                                });
                            })
                            .catch(function(err) {
                                console.log('User FindByIdAndUpdate Pull Error: ', err);
                                res.status(500).json(err);
                            });
                    })
                    .catch(function(err) {
                        console.log('User FindByIdAndUpdate Push Error: ', err);
                        res.status(500).json(err);
                    });
            })
            .catch(function(err) {
                console.log('Group FindByIdAndUpdate Error: ', err)
                res.status(500).json(err);
            });
    }
}

module.exports = UserController;