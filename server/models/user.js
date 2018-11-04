const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username required'],
    unique: true
    // ,validate: {
    //   validator () {
    //     let regExp = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/
    //     let result = regExp.test(this.username)
    //     if (this.username.length < 5) {
    //       throw new Error('Username length must greater than 5 character or number')
    //     } else if (!result) {
    //       throw new Error('Username must only contain character or number')
    //     }
    //   }
    // }
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true
    // ,validate: {
    //   validator () {
    //     let regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     let result = regExp.test(this.email)
    //     if (!result) {
    //       throw new Error('Email is invalid')
    //     }
    //   }
    // }
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minLength: [6, 'Password length must be at least 6 characters']
    // ,validate: {
    //   validator () {
    //     let regExp = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/
    //     let result = regExp.test(this.password)

    //     if (this.password.length < 8) {
    //       throw new Error('Password length must be greater than 8')
    //     } else if (!result) {
    //       throw new Error('Password must contain a number and character')
    //     }
    //   }
    // }
  },
  taskId: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  verified: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})


const User = mongoose.model('User', userSchema)

module.exports = User