// router.js

/*
    Creates the routes and links them to the CRUD functions of our API
*/

// Imports
const router = require("express").Router();
const {
    getUsers, 
    createUser, 
    updateUserPassword,
    deleteUser
} = require("./controllers/user");

router.get("/", async (req,res) => {
    res.send("Lets build our CRUID API!");
});

router.get("/users", getUsers);

router.post("/signup", createUser);

router.put("/users/:userID", updateUserPassword);

router.delete("/users/:userID", deleteUser);




module.exports = router;