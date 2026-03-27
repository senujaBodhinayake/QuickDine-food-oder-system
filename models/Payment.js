const mongoose = require('mongoose');
const order = require('./CustomerOrder');

const paymentSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerOrder' },
    amount:Number,
    method: { type: String, enum: ['cash', 'card', 'online'], required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    paidTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
