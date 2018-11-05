var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var GroupSchema = new Schema({
	'name' : String,
	'owner' : {
		type: Schema.Types.ObjectId,
		ref: 'User'
   	},
	'members' : [{
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	}],
	'groupTodos' : [{
	 	type: Schema.Types.ObjectId,
	 	ref: 'Todo'
	}]
},{
	timestamps : true,
	versionKey : false
});

module.exports = mongoose.model('Group', GroupSchema);
