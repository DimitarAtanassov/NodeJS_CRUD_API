
const bcrypt = require('bcrypt');

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
};

const validateUsername = (username) => {
    return username.length > 2 && !/\s/.test(username);
}


// Email validation function
const validateEmail = (email) => {
    // Implement your email validation logic here
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

module.exports = {
    validatePassword,
    validateEmail,
    validateUsername
}