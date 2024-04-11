const mongoose = require('mongoose');
const User = require('../schemas/userSchema');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');
const { hashPassword } = require('../utils/authUtils');

// SKAPA ANVÄNDARE 

exports.createUser = async (req, res) => {
    const {password } = req.body;
    const hashedPassword = await hashPassword(password);
    try {
        const newUser = await User.create({
            email: req.body.email,
            password: hashedPassword,
        });

        const token = await generateToken(newUser);

        res.status(201).json({ message: 'User created successfully', token: token });
    } catch (error) {
        if(error.code === 11000) return res.status(400).json({message: "Email already exists"})
            res.status(500).json({ message: 'Error creating user', error: error });
    }
};

// LOGGA IN ANVÄNDARE 

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: 'User not found'});
        // CHECK PASSWORD 
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).json({message: 'Invalid password'});
        // GENERATE TOKEN 
        const token = await generateToken(user);

        res.status(200).json({message: 'User logged in', token: token})
    }catch(error){
        res.status(500).json({message: 'Error logging in', error: error})
    }
}