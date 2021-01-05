const express = require('express')

const ExpenseCtrl = require('../controllers/expense-ctrl')

const router = express.Router()

router.post('/expense', ExpenseCtrl.createExpense)
router.delete('/expense/:id', ExpenseCtrl.deleteExpense)
router.get('/expenses', ExpenseCtrl.getExpenses)

module.exports = router