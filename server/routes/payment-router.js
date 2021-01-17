const express = require('express');

const PaymentCtrl = require('../controllers/payment-ctrl');

const router = express.Router();

router.post('/payment', PaymentCtrl.createPayment);
router.get('/payments', PaymentCtrl.getPayments);
router.delete('/payment/:id', PaymentCtrl.deletePayment);


module.exports = router;