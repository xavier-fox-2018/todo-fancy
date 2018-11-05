const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groupSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add Group Name!'],
    unique: [true, 'Group Name is already in use, please use another name']
  },
  userId: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please add member of group. min one member!']
  }],
  groupAdmin: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
  
}, {
  timestamps: true
})


const Group = mongoose.model('Group', groupSchema)

module.exports = Group