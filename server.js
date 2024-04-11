require('dotenv').config();
const app = require('./app');
const express = require('express')
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const ATLAS_URI = process.env.ATLAS_URI;

mongoose.connect(ATLAS_URI);

mongoose.connection.on('error', (err) => {console.log(err)})
mongoose.connection.once('open', () => {console.log('Connected to MongoDB')})

app.listen(process.env.PORT, () => {console.log(`Server is running on port http://localhost:${PORT}`)})
