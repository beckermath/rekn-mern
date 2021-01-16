const express = require('express');

const PaymentCtrl = require('../controllers/payment-ctrl');

const router = express.Router();

router.post('/payment', PaymentCtrl.createPayment);
router.get('/payments', PaymentCtrl.getPayments);

module.exports = router;