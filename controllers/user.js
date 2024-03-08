// user.js
/*
    Stores our CRUD function logic
*/
const User = require("../model/user");

// Read functionallity
const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

// Creates a User
const createUser = async (req,res) => {
    
    const newUser = new User({
        username : req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    
    await newUser.save();
    res.json(newUser);
};

// Read a User


// Update a User


// Delete a user

module.exports = {
    getUsers,
    createUser
};