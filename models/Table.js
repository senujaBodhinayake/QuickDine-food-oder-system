const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    tableNumber:{
        type: Number,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        
    },
    status: {
        type: String,
        enum: ['available', 'occupied'],
        default: 'occupied'
    }
});

module.exports = mongoose.model('Table', tableSchema);
