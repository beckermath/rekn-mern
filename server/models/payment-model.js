const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Payment = new Schema(
    {
        payer: { type: String, required: true },
        receiver: { type: String, required: true },
        amount: { type: Number, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('payments', Payment);