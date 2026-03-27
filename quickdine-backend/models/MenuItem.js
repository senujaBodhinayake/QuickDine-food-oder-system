const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category:{
        type: String,
        
    },
    price:{
        type: Number,
        required: true      
    },
    description: String,
    imageUrl: String
});

module.exports = mongoose.model('MenuItem', menuItemSchema);