// validators.js

/*
    Util: user validation logic and uniquness check
*/

// Imports 
const bcrypt = require('bcrypt');
const User = require('../model/user.model');
const nodemailer = require('nodemailer');
// Valid password: 1 Lowecase, 1 uppercase, 1 digit, and length of atleast 6.
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
};

// Valid Username: length greather than 2, and no spaces.
// Username must not be in use already
const validateUsername = (username) => {
    return username.length > 2 && !/\s/.test(username);
};

const usernameExists = async (username) => {
    const existingUsername = await User.findOne({username});
    return !!existingUsername;
};   


/* 
 Valid Email: Non empty local part (part before @), followed by @
    Followed by non empty domain part (part after @), followed by a dot, 
    followed by a non-empty top-level domain part 
    
    Email must not be in use already
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

// Send a verification email with a link for a user to click to active their account
const sendVerificationEmail = async (email, token) => {
    const baseUrl = 'https://crud-api-c680d4c27735.herokuapp.com'; // Base URL of your API
    const verificationLink = `${baseUrl}/verify/${token}`;
    const transporter = nodemailer.createTransport({
        // Configure your email provider here
        // Example for Gmail:
        service: 'gmail',
        auth: {
            user: 'restrackermailer@gmail.com',
            pass: 'hyaw kxze wrpq mbfa'
        }
    });

    const mailOptions = {
        from: 'restrackermailer@gmail.com',
        to: email,
        subject: 'Email Verification',
        html: `Click <a href="${verificationLink}">here</a> to verify your email address.`
    };

    await transporter.sendMail(mailOptions);
};

const sendPasswordResetEmail = async (email,token) => {
    const baseUrl = 'http://localhost:3000'; // Update port as needed
    const resetPasswordLink = `${baseUrl}/resetPassword/${token}`; // Adjust path to match your route
    const transporter = nodemailer.createTransport({
        // Configure your email provider here
        // Example for Gmail:
        service: 'gmail',
        auth: {
            user: 'restrackermailer@gmail.com',
            pass: 'hyaw kxze wrpq mbfa'
        }
    });

    const mailOptions = {
        from: 'restrackermailer@gmail.com',
        to: email,
        subject: 'Password Reset',
        html: `Click <a href="${resetPasswordLink}">here</a> to reset your password.`
    };

    await transporter.sendMail(mailOptions);
}

module.exports = {
    validatePassword,
    validateEmail,
    validateUsername,
    emailExists,
    usernameExists,
    sendVerificationEmail,
    sendPasswordResetEmail
}