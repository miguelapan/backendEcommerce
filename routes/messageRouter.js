const router = require('express').Router();
const mongoose = require('mongoose');
const { postMessage } = require('../models/messageModel')

router.post('/', postMessage)

module.exports = router;