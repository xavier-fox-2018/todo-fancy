UserController = require('./usercontrol')
TodoController = require('./todocontrol')

class Controller {
  static home(req, res, next){
    res.status(200).json({
      message: "ini home"
    })
  }
}

module.exports = {Controller, UserController, TodoController};