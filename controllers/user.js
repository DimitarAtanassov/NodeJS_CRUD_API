// user.js
/*
    Stores our CRUD function logic
*/
const bcrypt = require('bcrypt');   // Going to hash password with it
const User = require("../model/user");
const {validatePassword, validateUsername, validateEmail, emailExists} = require('../utils/validators');

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
            password: hashedPassword
        });

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
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserPassword,
    deleteUser
};