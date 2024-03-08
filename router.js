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
    deleteUser,
    getAllUsers
} = require("./controllers/user");

router.get("/", async (req,res) => {
    res.send("CRUD API FOR MONGODB!");
});

router.get("/api/users/:userID", getUserById);
router.get("/api/users/", getAllUsers);

router.post("/api/users", createUser);

router.put("/api/users/:userID", updateUserPassword);

router.delete("/api/users/:userID", deleteUser);




module.exports = router;