const router = require('express').Router();
const mongoose = require('mongoose');

    // SKAPA GET ORDERS OCH EN MED ID 


const { createOrder, getOrders, getOneOrder } = require('../models/orderModel');

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOneOrder);

module.exports = router;