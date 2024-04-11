const mongoose = require('mongoose');
const Product = require('../schemas/productSchema');

// HÄMTAR ALLA PRODUKTER 

exports.getAllProducts = async (req, res) => {
    try{
        const products = await Product.find()
        res.status(200).json(products)
    }catch(error){
        console.log(error)
    }  
}

// HÄMTAR EN PRODUKT MED ID

exports.getOneProduct = async (req, res) => {
    try{ 
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }catch(err){
        res.status(404).json({message: 'Product not found'})
    }
}

// SKAPA EN NY PRODUKT 

exports.createProduct = async (req, res) => {
    try{
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            images: req.body.images
        })
        await newProduct.save()
        res.status(201).json({message: 'Product created', product: newProduct})
    }catch(err){
        res.status(404).json({message: 'Product not created'})
    }
}

// ÄNDRAR PRODUKT

exports.putProduct = async (req, res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            images: req.body.images
        })
        await updatedProduct.save()
        res.status(200).json({message: 'Product updated'})
    }catch(err){
        res.status(404).json({message: 'Product not PUT'})
    }
}

// TAR BORT PRODUKT 

exports.deleteProduct = async (req, res) => {
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'Product deleted'})
    }catch(err){
        res.status(404).json({message: 'Product not deleted'})
    }
}

// exports.getApi = async (req, res) => {
//     const response = await fetch('https://js2-ecommerce-api.vercel.app/api/products')
//     const data = await response.json()
//     try{
//         data.forEach(async (product) => {
//             const newProduct = new Product({
//                 name: product.name,
//                 price: product.price,
//                 description: product.description,
//                 category: product.category,
//                 images: product.images
//             })
//             await newProduct.save()
//         })
//         res.json({message: 'Products added'})
//     }
//     catch(error){
//         console.log(error)
//     }
// }