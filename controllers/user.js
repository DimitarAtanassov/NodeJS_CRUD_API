// user.js

/*
    Stores our CRUD function for Users Documents in MongoDB
*/

// Imports
//===============================================================
const bcrypt = require('bcrypt');   // Going to hash password with it
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const Verfication = require("../model/verification.model");
const {
    validatePassword, 
    validateUsername, 
    validateEmail, 
    emailExists, 
    usernameExists,
    sendVerificationEmail,
    sendPasswordResetEmail
} = require('../utils/validators');
require('dotenv').config();

// Functions
//===============================================================
/* retrieve a user from the database using their _id (generated by mongoDB when a new User is created)*/
const getUserById = async (req, res) => {
    try {
      // Retrieve user by ID from the database
      const user = await User.findById(req.params.id);
  
      // Check if the user with the specified ID exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Send the user data as a JSON response
      res.json(user);
    
    } catch (error) {
      // Handle errors
      res.status(500).send(error.message);
    }
  };
  

// Creates a User
const createUser = async (req, res) => {
    try {
        // Validation
        if(!validatePassword(req.body.password)){
            return res.status(406).json({message:"Invalid password"});
        }

        if(!validateUsername(req.body.username))
        {
            return res.status(406).json({message:"Invalid Username"});
        }

        if(!validateEmail(req.body.email))
        {
            return res.status(406).json({message:"Invalid Email"})
        }
        
        // Check if username already exists
        const usernameInUse = await usernameExists(req.body.username);
        if (usernameInUse)
        {
            return res.status(400).json({message: "Username already exists"});
        }
        
        // Check if email already exists
        const emailInUse = await emailExists(req.body.email);
        if (emailInUse)
        {
            return res.status(400).json({ message: "Email already exists"})
        }
        
        // Hash password before storing
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        
        // Create newUser
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            active: false
        });

        // Email Verfication 
        // Generate verficationToken
        const verficationToken = crypto.randomBytes(64).toString('hex');
        
        // Create new Verfication document in our collection
        await Verfication.create({
            userId: newUser._id,
            token: verficationToken
        });
        
        // Send the verfication email
        await sendVerificationEmail(newUser.email, verficationToken);
        


        // Save newUser
        await newUser.save();

        // Return the newly created user as JSON response
        res.json(newUser);
    } catch (error) {
        // Error handling for user creation done here

        // Return 500 for internal server error with the error message
        res.status(500).send(error.message);
    }
};



// Update a User
const updateUserPassword = async (req,res) => {
    try {
        // find a user using their id and update their password
        const updatedUser = await User.findOneAndUpdate(
            {_id: req.params.userID},
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                }
            },
            {new: true}
        );
        if (!updatedUser) {
            return res.status(404).json({message:"User not found"});
        }
    
        res.json(updatedUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// Backend Login Authentication
const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '6h' });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.SECRET_KEY);
};

const login = async (req,res) => {
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        
        const passwordCheck = await bcrypt.compare(password,user.password);
        if(!passwordCheck) {
            return res.status(401).json({ message: 'Invalid password'});
        }
        // Generate JWT Token
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        // Store refresh token in HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {httpOnly: true});
        // Login Auth Completed
        res.status(200).json({ message: 'Login Successful', accessToken, userId: user._id });
    } catch (error) {
        console.error('Error Loggin In:', error.message);
        res.status(500).json({message: 'Internal server error'});
    }
};



// Delete a user
const deleteUser = async (req,res) => {
    try {
        await User.deleteOne({_id: req.params.userID});
        res.json({message: "User Deleted"});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get all Users
const getAllUsers = async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await User.find();

        // Return the list of users as a JSON response
        res.json(users);
    } catch (error) {
        // Handle errors
        res.status(500).send(error.message);
    }
};

const forgotPassword = async(req,res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message: "User Not Found"});
        }

        const token = crypto.randomBytes(64).toString('hex');

        await Verfication.create({
            userId: user._id,
            token: token
        });

        await sendPasswordResetEmail(user.email,token);
        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error("Error Requesting password reset:", error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

// Function to reset the password
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Find the verification document by token
        const verification = await Verfication.findOne({ token });

        if (!verification) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update the user's password (hash the new password)
        const user = await User.findById(verification.userId);
        const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
        user.password = hashedPassword;
        await user.save();

        // Delete the verification token
        await Verfication.deleteOne({ token });

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Exports
//===============================================================
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserPassword,
    deleteUser,
    login,
    forgotPassword,
    resetPassword
};