const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const hashPassword = async (password) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }catch(error){
        console.log({message: 'Error hashing password', error})
        throw new Error('Error hashing password');
    }
}

const authChecker = async (authHeader) => {
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token) return res.status(401).json({message: 'You need to log in to place an order'});
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded.userId;
}

module.exports = { hashPassword, authChecker };