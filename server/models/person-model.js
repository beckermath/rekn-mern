const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Person = new Schema(
    {
        name: { type: String, required: true },
        balance: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('persons', Person)