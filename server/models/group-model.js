const mongoose = require ('mongoose');
Schema = mongoose.Schema;

const groupSchema = new Schema({ 
  users: [Schema.Types.ObjectId],
  tasks:  [Schema.Types.ObjectId]
})

const group = mongoose.model('group', groupSchema);
module.exports = group;