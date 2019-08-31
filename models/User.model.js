const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: false,
    minLength: 3,
    unique: true,
  },
  name: {
    type: String,
    required: false,
  },
  links: [
    {
      name: {type: String},
      url: {type: String, required: true},
    }
  ],
  password: String,
})

// hash the yeet out of the password
userSchema.methods.generateHash = password  => {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
 
userSchema.methods.checkPasswordSuccess = (reqPassword, dbPassword) => {
  return bcrypt.compareSync(reqPassword, dbPassword)
}

const User = mongoose.model('User', userSchema)
module.exports = User