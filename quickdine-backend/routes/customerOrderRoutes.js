const express = require('express');
const Table = require('../models/Table');
const router = express.Router();
const CustomerOrder = require('../models/CustomerOrder');
const OrderItem = require('../models/OrderItem');


// create
router.post('/', async (req, res) => {
    try {
        const newOrder = new CustomerOrder(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get orders
// router.get('/', async (req, res) => {
//     try {
//         const orders = await CustomerOrder.find({table:req.params.tableId})
//         .populate('items')
//         .populate('table');
//         res.status(200).json(orders);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
router.get('/table/:tableId', async (req, res) => {
  try {
    const orders = await CustomerOrder.findOne({ table: req.params.tableId })
       // Sort by placedTime in descending order
      .populate('items')
      .populate('table');
      if (!orders) {
      return res.status(404).json({ error: 'No order found for this table' });
    }


    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:id', async (req, res) => {
    try {
        const orders = await CustomerOrder.findById(req.params.id)
            .populate({ path: 'items', populate: { path: 'menuItem' } })
            .populate('table');
        if (!orders) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// update order status

router.put('/:orderId/status', async (req, res) => {
  const { status } = req.body;
  try {
    const updated = await CustomerOrder.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Order not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// DELETE /api/customer-orders/:orderId
router.delete('/:orderId', async (req, res) => {
  try {
    await CustomerOrder.findByIdAndDelete(req.params.orderId);
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});


router.delete('/reset/:tableId', async (req, res) => {
    try {
        const {tableId} = req.params;
        await CustomerOrder.deleteMany({ table: tableId });
        await OrderItem.deleteMany({ table: tableId });
        await Table.findByIdAndUpdate(tableId, { status: 'available' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
    
    // try{
    //     const orders = await CustomerOrder.find({ table: req.params.tableId });
    //     const itemIds=orders.flatMap(order=> order.items)

    //     await Promise.all([
    //         CustomerOrder.deleteMany({ table: req.params.tableId }),
    //         OrderItem.deleteMany({ _id: { $in: itemIds } }),
    //     ]);
    //     res.status(204).send();
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
});

module.exports = router;
