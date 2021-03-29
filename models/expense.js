const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expenseSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  category: {
    type: String,
  },
  date: {
    type: String
  },
  amount: {
    type: Number,
    type: require
  }
})

module.exports = mongoose.model('Expense', expenseSchema)