
const mongoose = require('mongoose');
const crypto = require('crypto');

const registerSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    text: {
        type: String,
        trim: true,
        required: true
    }
}, { timestamp: true })


const registermodal = mongoose.model('todo', registerSchema);

module.exports = registermodal;