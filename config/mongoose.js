const mongoose = require('mongoose')
const MOGODB_URI = process.env.MOGODB_URI || 'mongodb://localhost/expense-tracker'
const db = mongoose.connection

mongoose.connect(MOGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

module.exports = db