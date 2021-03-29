const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
  },
  categoryIcon: {
    type: String,
  }
})

module.exports = mongoose.model('Record', recordSchema)