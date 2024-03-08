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
    try {
        // Create newUser
        const newUser = new User({
            username : req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        
        // Save newUser
        await newUser.save();
        
        // Return the newly created user a JSON res
        res.json(newUser);
    } catch (error) {
        // Error handling during for user creation done here

        // Return 500 for internal server error with the error message
        res.status(500).send(error.message);
    }

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