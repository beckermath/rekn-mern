const Payment = require('../models/payment-model');

createPayment = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a payment',
        })
    }

    const payment = new Payment(body);

    if (!payment) {
        return res.status(400).json({ success: false, error: err })
    }

    payment
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: payment._id,
                message: 'Payment created.',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Payment not created.',
            })
        })
}

getPayments = async (req, res) => {
    await Payment.find({}, (err, payments) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!payments.length) {
            return res
                .status(404)
                .json({ success: false, error: `Payments not found` })
        }
        return res.status(200).json({ success: true, data: payments })
    }).catch(err => console.log(err))
}

module.exports = {
    getPayments,
    createPayment
}