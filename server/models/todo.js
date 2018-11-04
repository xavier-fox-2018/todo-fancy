var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  description: String,
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  dueDate: Date
});

//todoSchema.pre('remove', {query: true, document: false}, function() {

  // mongoose.User.findOneAndUpdate({_id: doc.user}, {$push: {todo: doc._id}}, {new: true}, (err, doc) => {
  //   if(err){
  //     throw new Error('failed to assign todo to user, but todo has been created')
  //   }
  //   console.log(doc)
  // })
//});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;