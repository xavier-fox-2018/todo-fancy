const mongoose = require('mongoose'),
      Schema = mongoose.Schema


const groupSchema = ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    member_list: [{
        type: Schema.Types.ObjectId,
        ref: User
    }]
})

const Group = mongoose.model('Group', groupSchema)
module.exports = Group