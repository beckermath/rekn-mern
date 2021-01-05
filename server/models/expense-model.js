const mongoose = require('mongoose')
const personModel = require('./person-model')
const Schema = mongoose.Schema

const Expense = new Schema(
    {
        description: { type: String, required: true},
        amount: {type: Number, required: true},
        payedBy: {type: String, required: true},
        forWho: [{type: String, required: true}]
    },
    { timestamps: true },
)

module.exports = mongoose.model('expenses', Expense)