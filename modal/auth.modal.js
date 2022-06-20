const mongoose = require('mongoose');
const crypto = require('crypto');

const registerSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    isactive: {
        type: Boolean,
        default: true
    }
}, { timestamp: true })


const registermodal = mongoose.model('register', registerSchema);

module.exports = registermodal;