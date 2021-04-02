const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// 篩選資料
router.get('/filter', (req, res) => {
  const filter = req.query.filter
  const amountFilter = Record.aggregate([
    { $match: { category: filter } },
    {
      $group: {
        _id: null,
        total: { $sum: '$amount' },
      }
    }
  ])
  const recordFilter = Record.aggregate([
    { $match: { category: filter } },
    {
      $project: {
        name: 1,
        category: 1,
        amount: 1,
        date: 1,
        icon: 1,
      }
    }
  ])
  if (filter) {
    Promise.all([amountFilter, recordFilter])
      .then(([amountFilter, records]) => {
        const totalAmount = amountFilter[0]
        res.render('index', { totalAmount, records, filter })
      })
      .catch(error => console.log(error))
  } else {
    Promise.all([amountFilter, recordFilter])
      .then(() => res.redirect('/'))
  }
})

module.exports = router
