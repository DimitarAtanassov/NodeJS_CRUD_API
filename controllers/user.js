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

module.exports = {
    getUsers,
    createUser,
    updateUserPassword
};