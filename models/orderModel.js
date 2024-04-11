require('dotenv').config();
const Order = require('../schemas/orderSchema');
const jwt = require('jsonwebtoken');
const { authChecker } = require('../utils/authUtils');

// SKAPA ORDER

exports.createOrder = async (req, res) => {
    try{

        // CHECH AUTH HEADER

        const userId = await authChecker(req.headers['authorization']);

        const products = req.body.products;

        // PLACE ORDER
        
        const order = new Order({
            user: userId,
            products: products.map(product => ({
                quantity: product.quantity,
                product: product.productId
            
            }))
        })
        await order.save()
        res.status(201).json({message: 'Order created', order: order})
    }catch(err){
        res.status(400).json({message: 'Error creating order', error: err})
    }
}

// HÄMTA ALL ORDER TILL EN ANVÄNDARE 

exports.getOrders = async (req, res) => {
    try{
        // CHECK AUTH HEADER

        const userId = await authChecker(req.headers['authorization']);

        // FETCH ORDERS

        const orders = await Order.find({user: userId}).populate('products');
        res.status(200).json({message: 'Orders get successfully', orders: orders})
    }catch(err){
        res.status(400).json({message: 'Error getting orders', error: err})
    }
}

// HÄMTA EN ORDER KOPPLAD TILL EN ANVÄNDARE 

exports.getOneOrder = async (req, res) => {
    try{

        // CHECK AUTH HEADER

        const userId = await authChecker(req.headers['authorization']);

        const order = await Order.findOne({user: userId, _id: req.params.id}).populate('products');
        res.status(200).json(order)
    }catch(err){
        res.status(400).json({message: 'Error getting order', error: err})
    }
}