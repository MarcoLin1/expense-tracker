const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// 首頁
router.get('/', (req, res) => {
  const amount = Record.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: '$amount' }
      }
    }
  ])

  const records = Record.aggregate([
    {
      $project: {
        name: 1,
        category: 1,
        amount: 1,
        date: 1,
        icon: 1
      }
    }
  ])

  Promise.all(([amount, records]))
    .then(([amount, records]) => {
      const totalAmount = amount[0]
      res.render('index', { totalAmount, records })
    })
    .catch(error => console.log(error))
})

module.exports = router