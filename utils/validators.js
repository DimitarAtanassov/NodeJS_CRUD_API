
const bcrypt = require('bcrypt');
const User = require('./models/User');
// Validpassword: 1 Lowecase, 1 uppercase, 1 digit, and length of atleast 6.
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
};

// Validusername: length greather than 2, and no spaces.
const validateUsername = (username) => {
    return username.length > 2 && !/\s/.test(username);
}


/* 
    Validemail: Non empty local part (part before @), followed by @
Followed by non empty domain part (part after @), followed by a dot, followed bt a non-empty top-level domain part
    Email must already not be in use
*/
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const emailExists = async (email) => {
    const existingEmail = await User.findOne({email});
    return !!existingEmail;
}


module.exports = {
    validatePassword,
    validateEmail,
    validateUsername,
    emailExists
}