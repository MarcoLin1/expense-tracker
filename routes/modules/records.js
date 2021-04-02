const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// 新增支出頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 按下新增支出後
router.post('/', (req, res) => {
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
router.get('/:id/edit', (req, res) => {
  Record.findById(req.params.id)
    .lean()
    .then(records => res.render('edit', { records: records }))
    .catch(error => console.log(error))
})

// 修改頁面中，按下送出鈕後將資料儲存到mongodb 
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  return Record.findById(req.params.id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router