require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
        email: user.email,
        userId: user._id,
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1h'});
        return token;
}

module.exports = { generateToken };