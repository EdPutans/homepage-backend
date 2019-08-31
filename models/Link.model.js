const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: false,
    minLength: 3,
  },
  name: {
    type: String,
    required: false,
    trim: false,
  },
  userId: {
    link: mongoose.Schema.Types.ObjectId
  }
})

const Link = mongoose.model('Link', linkSchema)
module.exports = Link