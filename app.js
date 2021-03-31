const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Record = require('./models/record')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
  const amount = Record.aggregate([
    {
      $group: {
        _id: null,
        amount: { $sum: '$amount' },
      }
    }
  ]).exec()

  const records = Record.aggregate([
    {
      $project: {
        name: 1,
        category: 1,
        date: 1,
        amount: 1,
        icon: 1
      }
    }
  ]).exec()

  // Record.find()
  //   .lean()
  //   .then(records => res.render('index', { records: records, totalAmount: amount }))
  //   .catch(error => console.log(error))

  Promise.all([records, amount])
    .then(([records, amount]) => {
      const totalAmount = amount[0]
      res.render('index', { totalAmount, records })
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})