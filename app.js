const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Record = require('./models/record')
const bodyParser = require('body-parser')
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
app.use(bodyParser.urlencoded({ extends: true }))

// 首頁
app.get('/', (req, res) => {
  const amount = Record.aggregate([
    {
      $group: {
        _id: null,
        amount: { $sum: '$amount' },
      }
    }
  ])

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
  ])

  Promise.all([records, amount])
    .then(([records, amount]) => {
      const totalAmount = amount[0]
      res.render('index', { totalAmount, records })
    })
    .catch(error => console.log(error))
})

// 新增支出頁面
app.get('/records/new', (req, res) => {
  return res.render('new')
})

// 按下新增支出後
app.post('/records', (req, res) => {
  console.log(req.body)
  let { name, Category, date, amount } = req.body
  let [category, icon] = Category.split('/')
  return Record.create({
    name: name,
    category: category,
    date: date,
    amount: amount,
    icon: icon
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 修改頁面
app.get('/records/:id/edit', (req, res) => {
  Record.findById(req.params.id)
    .lean()
    .then(records => res.render('edit', { records: records }))
    .catch(error => console.log(error))
})

// 修改頁面中，按下送出鈕後將資料儲存到mongodb 
app.post('/records/:id', (req, res) => {
  let records = req.body
  return Record.findById(req.params.id)
    .then(record => {
      record.name = records.name
      record.category = records.Category.split('/')[0]
      record.date = records.date
      record.amount = records.amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除資料
app.get('/records/:id/delete', (req, res) => {
  return Record.findById(req.params.id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})