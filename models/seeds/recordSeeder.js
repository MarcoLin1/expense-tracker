const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  Record.create(
    { name: '房租', category: '家居物業', date: '2021-03-29', amount: 20000, icon: 'fas fa-home' },
    { name: '早餐', category: '餐飲食品', date: '2021-03-28', amount: 1500, icon: 'fas fa-utensils' },
    { name: '買手機', category: '休閒娛樂', date: '2021-03-29', amount: 5000, icon: 'fas fa-grin-beam' },
    { name: '計程車', category: '交通行出', date: '2021-03-28', amount: 300, icon: 'fas fa-shuttle-van' }
  )
    .then(() => {
      console.log('recordSeeder done')
      db.close()
    })
})