const router = require('express').Router();
const mongoose = require('mongoose');
const { createUser, loginUser } = require('../models/userModel');

router.post('/register', createUser);
router.post('/login', loginUser);

module.exports = router;