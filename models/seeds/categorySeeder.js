const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create(
    { category: '餐飲食品', categoryIcon: 'fas fa-utensils' },
    { category: '家居物業', categoryIcon: 'fas fa-home' },
    { category: '休閒娛樂', categoryIcon: 'fas fa-grin-beam' },
    { category: '交通出行', categoryIcon: 'fas fa-shuttle-van' }
  )
    .then(() => {
      console.log('categorySeeder done')
      db.close()
    })
})