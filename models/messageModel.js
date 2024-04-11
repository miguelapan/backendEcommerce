const mongoose = require('mongoose');
const Message = require('../schemas/messagesSchema')

exports.postMessage = async (req, res) => {
    try{
        if(req.body.name === '' || req.body.email === '' || req.body.message === '') return res.status(400).json({message: 'Please fill in all fields'})


        const newMessage = new Message({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })
        await newMessage.save()
        res.status(200).json({message: 'Message posted', newMessage: newMessage})
    }catch(err){
        res.status(400).json({message: 'Error posting message', error: err})
    }
}