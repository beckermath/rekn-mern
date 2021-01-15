const Expense = require('../models/expense-model')
const { expenseAdded, expenseDeleted } = require('../utilities')

createExpense = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an expense',
        })
    }

    const expense = new Expense(body)

    if (!expense) {
        return res.status(400).json({ success: false, error: err })
    }

    expense
        .save()
        .then(() => {
            expenseAdded(expense);
            return res.status(201).json({
                success: true,
                id: expense._id,
                message: 'Expense created.',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Expense not created.',
            })
        })
}

deleteExpense = async (req, res) => {
    await Expense.findOneAndDelete({ _id: req.params.id }, (err, expense) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!expense) {
            return res
                .status(404)
                .json({ success: false, error: `Expense not found` })
        }

        expenseDeleted(expense);
        return res.status(200).json({ success: true, data: expense })
    }).catch(err => console.log(err))
}

getExpenses = async (req, res) => {
    await Expense.find({}, (err, expenses) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!expenses.length) {
            return res
                .status(404)
                .json({ success: false, error: `Expenses not found` })
        }
        return res.status(200).json({ success: true, data: expenses })
    }).catch(err => console.log(err))
}

module.exports = {
    createExpense,
    deleteExpense,
    getExpenses
}