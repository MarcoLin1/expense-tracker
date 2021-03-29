const mongoose = require('mongoose')
const Expense = require('../record')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  Expense.create(
    { name: '房租', category: '家居物業', date: 2021 - 03 - 29, amount: 20000 },
    { name: '早餐', category: '餐飲食品', date: 2021 - 03 - 28, amount: 1500 },
    { name: '買手機', category: '休閒娛樂', date: 2021 - 03 - 27, amount: 5000 },
    { name: '計程車', category: '交通行出', date: 2021 - 03 - 22, amount: 300 }
  )
  console.log('mongodb connected')
})