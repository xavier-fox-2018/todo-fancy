const axios = require('axios'),
      Task = require('../models/task'),
      User = require('../models/user'),
      ObjectId = require('mongodb').ObjectId

const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      url = 'mongodb://localhost:27017',
      dbName = 'maso',
      client = new MongoClient(url);

class TaskController {

  // * DONE
  static create(req, res) {
    const inp = req.body;

    let newTask = new Task({
      name: inp.name,
      description: inp.description,
      priority: Number(inp.priority),
      status: inp.status,
      dueDate: inp.dueDate
    }).save()
      .then(data => {
        client.connect(function (err, client) {
          assert.equal(null, err);
          const clientData = client.db(dbName).collection('users')
          clientData.updateOne(
            { _id: ObjectId(req.params.userId) }, // ?  datengnya dari mana coba ha
            { $push: { tasksId: data._id } },
            (err, result) => {
              err ? res.status(500).json(err) : null
            }
          )
        });

        res.json({ 
          message: "Task successfully added",
          data: data
        })

      })
      .catch(err => res.status(500).json(err))
  }

  // * DONE
  static find(req, res) {
    Task.find({})
        .exec((err, result) => {
          err ? res.status(500).json(err) : res.json(result)
        })
  }

  // * DONE
  static findOne(req, res) {
    Task.findOne({ _id: ObjectId(req.params.id) })
        .exec((err, result) => {
          err ? res.status(500).json(err) : res.json(result)
        })
  }

  // * DONE
  static deleteOne(req, res) {
    Task.deleteOne(
      { _id: ObjectId(req.params.id) },
      (err, data) => {
        err ? res.status(500).json(err) : res.json({
          message: "Task successfully removed"
        })
      }
    )
  }

  static updateOne(req, res) {
    Task.update(
      { _id: ObjectId(req.params.id) },
      { $set: req.body },
      (err, data) => {
        err ? res.status(500).json(err) : res.json({
          message: "Task successfully updated",
          data: data
        })
      }
    )
  }

  

  // ! FEATURE IS BUGGY
  // static deleteAll(req, res) {
  //   User.findOne({ _id: ObjectId(req.params.userId) })
  //       .exec((err, result) => {
  //         for (let i in result.tasksId) {
  //           let eachTask = result.tasksId[i]
  //           Task.deleteOne(
  //             { _id: ObjectId(eachTask) },
  //             (err, data) => {
  //               err ? res.status(500).json(err) : res.json(data)
  //             }
  //           )
  //         }
  //         // err ? res.status(500).json(err) : res.json({
  //         //   msg: `Done`
  //         // })
  //       })
  // }
}

module.exports = TaskController