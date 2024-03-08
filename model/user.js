// user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
// Username
// Password
// email
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);