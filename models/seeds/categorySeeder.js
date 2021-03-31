const mongoose = require('mongoose')
const Expense = require('../record')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  Expense.create(
    { category: '餐飲食品', icon: 'fas fa-utensils' },
    { category: '家居物業', icon: 'fas fa-home' },
    { category: '休閒娛樂', icon: 'fas fa-grin-beam' },
    { category: '交通出行', icon: 'fas fa-shuttle-van' }
  )
  console.log('mongodb connected')
})