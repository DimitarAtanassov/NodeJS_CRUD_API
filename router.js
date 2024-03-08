// router.js

/*
    Creates the routes and links them to the CRUD functions of our API
*/

// Imports
const router = require("express").Router();
const {getUsers, createUser, updateUserPassword} = require("./controllers/user");

router.get("/", async (req,res) => {
    res.send("Lets build our CRUID API!");
});

router.get("/users", getUsers);

router.post("/signup", createUser);

router.put("/changepassword/:userID", updateUserPassword);




module.exports = router;