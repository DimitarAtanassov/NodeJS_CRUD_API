const User = require("../model/user");

const getUsers = (req, res) => {
    res.send("I am the get users route");
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
module.exports = {
    getUsers,
    createUser
};