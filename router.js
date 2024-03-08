// router.js

/*
    Creates the routes and links them to the CRUD functions of our API
*/

// Imports
const router = require("express").Router();
const {getUsers, createUser} = require("./controllers/user");

router.get("/", async (req,res) => {
    res.send("Lets build our CRUID API!");
});

router.get("/users", getUsers);

router.post("/signup", createUser);




module.exports = router;