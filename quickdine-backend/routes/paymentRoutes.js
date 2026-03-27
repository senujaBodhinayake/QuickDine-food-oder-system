const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const CustomerOrder = require('../models/CustomerOrder');

// create payment
router.post('/', async (req, res) => {
    try{
        const payment = new Payment(req.body);
        await payment.save();
        if (req.body.order) {
            await CustomerOrder.findByIdAndUpdate(req.body.order, { payment: payment._id });
        }
        res.status(201).send(payment);
    } catch (error) {
        res.status(400).send(error);
    }
});

// get all payments

router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find().populate('order');
        res.status(200).send(payments);
    } catch (error) {
        res.status(500).send(error);
    }
});

// get payment by order id
router.get('/:orderId', async (req, res) => {
    try {
        const payment = await Payment.findOne({ order: req.params.orderId });
        if (!payment) {
            return res.status(404).send();
        }
        res.status(200).send(payment);
    } catch (error) {
        res.status(500).send(error);
    }
});

// update payment
router.put('/:id', async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!payment) {
            return res.status(404).send();
        }
        res.status(200).send(payment);
    } catch (error) {
        res.status(500).send(error);
    }
});

// delete payment
router.delete('/:id', async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).send();
        }
        res.status(200).send(payment);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
