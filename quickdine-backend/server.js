const express = require('express');
const cors = require('cors');
require('dotenv').config();

const tableRoutes = require('./routes/tableRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');
const customerOrderRoutes = require('./routes/customerOrderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');






const app = express();

app.use(cors());
app.use(express.json());




// Test route
app.get('/', (req, res) => {
  res.send('Welcome to QuickDine Backend!');
});

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/tables', require('./routes/tableRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/order-items', require('./routes/orderItemRoutes'));
app.use('/api/customer-orders', require('./routes/customerOrderRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
.then(() => {console.log('MongoDB connected successfully')
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} )
.catch(err => console.error('MongoDB connection error:', err));


