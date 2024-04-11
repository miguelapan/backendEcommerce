const router = require('express').Router();
const mongoose = require('mongoose');

const { getAllProducts, getOneProduct, getApi, createProduct, putProduct, deleteProduct } = require('../models/productModel')

router.get('/', getAllProducts)
router.get('/:id', getOneProduct)

router.post('/create', createProduct)
router.put('/put/:id', putProduct)
router.delete('/delete/:id', deleteProduct)

// HÄMTAR ALLA PRODUKTER FÖR API 
// router.post('/all', getApi)

module.exports = router;
