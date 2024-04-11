const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    "name": {
        type: String
    },
    "price": {
        type: String
    },
    "description": {
        type: String
    },
    "category": {
        type: String
    },
    "images": {
        type: Array
    }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema)