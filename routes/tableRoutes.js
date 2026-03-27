const express = require('express');
const router = express.Router();
const Table = require('../models/Table');
const OrderItem = require('../models/OrderItem');
const CustomerOrder = require('../models/CustomerOrder');

//creating a new table

router.post('/', async (req, res) => {
    try{
        const table= new Table(req.body);
        await table.save();
        res.status(201).json(table);
    } catch (error) {
        if(error.code===11000) {
            console.error('Error creating table:', error);
            res.status(409).json({ error: 'Table already exists' });
        } else {
            console.error('Error creating table:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// to get all tables

router.get('/', async (req, res) => {
    try{
        const tables = await Table.find();
        res.status(200).json(tables);
    } catch (error) {
        console.error('Error fetching tables:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// to get a specific table by id
router.get('/:id', async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        res.status(200).json(table);
    } catch (error) {
        console.error('Error fetching table:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//get table by number

router.get('/number/:tableNumber', async (req, res) => {
  try {
    // Convert param to number
    const tableNum = Number(req.params.tableNumber);

    // Validate input
    if (isNaN(tableNum)) {
      return res.status(400).json({ error: 'Invalid table number' });
    }

    // Find table by number
    const table = await Table.findOne({ tableNumber: tableNum });

    // Handle not found
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    // Return table
    res.status(200).json(table);
  } catch (error) {
    console.error('Error fetching table by number:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// update table status
router.put('/:id',async (req,res)=> {
    try{
        const updated = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
        if (!updated) {
            return res.status(404).json({ message: 'Table not found' });
        }
    } catch (error) {
        console.error('Error updating table:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Table.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Table not found' });
        }
        res.status(200).json({ message: 'Table deleted successfully' });
    } catch (error) {
        console.error('Error deleting table:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:tableId/reset', async (req, res) => {
  try {
    const { tableId } = req.params;

    // Delete all orders linked to this table
    await OrderItem.deleteMany({ table: tableId });
    await CustomerOrder.deleteMany({ table: tableId });

    // Delete the table itself
    await Table.findByIdAndDelete(tableId);

    res.status(200).json({ message: 'Table and related data deleted successfully' });
  } catch (err) {
    console.error('Table reset error:', err);
    res.status(500).json({ error: 'Failed to reset table' });
  }
});












module.exports = router;