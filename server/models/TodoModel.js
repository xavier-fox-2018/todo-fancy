var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TodoSchema = new Schema({
	'owner' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	'title' : {
		type: String,
		required: true
	},
	'deadline' : {
		type: Date,
		required: true
	},
	'priority' : {
		type: String,
		required: true
	},
	'note' : {
		type: String,
		required: true,
		default : ' - '
	},
	'status' : {
		type: String,
		required: true,
		default : 'pending'
	},
	'inGroup' : {
		type: Schema.Types.ObjectId,
		ref: 'Group'
   	}
},{
	timestamps : true,
	versionKey : false
});

module.exports = mongoose.model('Todo', TodoSchema);
