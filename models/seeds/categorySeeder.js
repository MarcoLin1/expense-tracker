const mongoose = require('mongoose')
const Category = require('../category')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  Category.create(
    { categories: '餐飲食品', categoryIcon: 'fas fa-utensils' },
    { categories: '家居物業', categoryIcon: 'fas fa-home' },
    { categories: '休閒娛樂', categoryIcon: 'fas fa-grin-beam' },
    { categories: '交通出行', categoryIcon: 'fas fa-shuttle-van' }
  )
    .then(() => {
      console.log('mongodb connected')
      db.close()
    })
})