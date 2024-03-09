// validators.js

/*
    Util: user validation logic and uniquness check
*/

// Imports 
const bcrypt = require('bcrypt');
const User = require('../model/user');

// Valid password: 1 Lowecase, 1 uppercase, 1 digit, and length of atleast 6.
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
};

// Valid Username: length greather than 2, and no spaces.
const validateUsername = (username) => {
    return username.length > 2 && !/\s/.test(username);
}


/* 
 Valid Email: Non empty local part (part before @), followed by @
    Followed by non empty domain part (part after @), followed by a dot, 
    followed by a non-empty top-level domain part 
    
    Email must already not be in use
*/
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Check if email already exists in the database
const emailExists = async (email) => {
    const existingEmail = await User.findOne({email});
    /*
        User.findOne returns a user not a boolean but we want to use a boolean for our check
        !!existingEmail
            - If User.findOne returns null this will change the null value to false and return it 
            - If User.findOne returns a User this will change the user to true and return it.
    */ 
    return !!existingEmail;
}


module.exports = {
    validatePassword,
    validateEmail,
    validateUsername,
    emailExists
}