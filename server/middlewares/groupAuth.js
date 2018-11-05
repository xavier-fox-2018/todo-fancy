const Group = require('../models/group')

const authorized = (req, res, next) => {    
  Group.findById({
    _id: req.params.groupId
  })
  .then((result) => {
    if(result.userId.indexOf(req.user.id) !== -1) {
      next()
    } else {
      res.status(400).json({ message: "You are not authorized to access this API" })
    }
  }).catch((err) => {
    res.status(500).json(err)
  });  
}

  module.exports = authorized