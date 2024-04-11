const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ROUTES 

app.use('/api/products', require('./routes/productRouter'));
app.use('/api/auth', require('./routes/userRouter'));
app.use('/api/orders', require('./routes/orderRouter'));
app.use('/api/messages', require('./routes/messageRouter'));

module.exports = app;