const express = require('express');
const router = express.Router();
const OrderItem = require('../models/OrderItem');

// add item to order

// router.post('/', async (req, res) => {
//     try {
//         const orderItem = new OrderItem(req.body);
//         await orderItem.save();
//         res.status(201).json(orderItem);
//     } catch (error) {
//         console.error('Error creating order item:', error);
//         res.status(400).json({ error: error.message });
//     }
// });

// POST /api/order-items/bulk
router.post('/bulk', async (req, res) => {
  try {
    const orderItems = await OrderItem.insertMany(req.body);
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// get order items

router.get('/', async (req, res) => {
    try {
        const orderItems = await OrderItem.find().populate('menuItem');
        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// get order item by id

router.get('/:id', async (req, res) => {
    try {
        const orderItem = await OrderItem.findById(req.params.id).populate('menuItem');
        if (!orderItem) {
            return res.status(404).json({ error: 'Order item not found' });
        }
        res.status(200).json(orderItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// update order item

router.put('/:id', async (req, res) => {
    try {
        const orderItem = await OrderItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!orderItem) {
            return res.status(404).json({ error: 'Order item not found' });
        }
        res.status(200).json(orderItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// delete order item

router.delete('/:id', async (req, res) => {
    try {
        const orderItem = await OrderItem.findByIdAndDelete(req.params.id);
        if (!orderItem) {
            return res.status(404).json({ error: 'Order item not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
