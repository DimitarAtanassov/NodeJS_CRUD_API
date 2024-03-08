// router.js

/*
    Creates the routes and links them to the CRUD functions of our API
*/

// Imports
const router = require("express").Router();
const {
    getUserById, 
    createUser, 
    updateUserPassword,
    deleteUser
} = require("./controllers/user");

router.get("/", async (req,res) => {
    res.send("Lets build our CRUID API!");
});

router.get("/api/users/:userID", getUserById);

router.post("/api/users", createUser);

router.put("/api/users/:userID", updateUserPassword);

router.delete("/api/users/:userID", deleteUser);




module.exports = router;