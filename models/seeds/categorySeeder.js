const mongoose = require('mongoose')
const Expense = require('../record')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  Expense.create(
    { category: '餐飲食品', categoryIcon: '<i class="fas fa-utensils"></i>' },
    { category: '家居物業', categoryIcon: '<i class="fas fa-home"></i>' },
    { category: '休閒娛樂', categoryIcon: '<i class="fas fa-grin-beam"></i>' },
    { category: '交通出行', categoryIcon: '<i class="fas fa-shuttle-van"></i>' }
  )
  console.log('mongodb connected')
})