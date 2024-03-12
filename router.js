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
    getAllUsers,
    login
} = require("./controllers/user");
const {
    createJobApplication,
    getAllJobAppsByUserId
} = require("./controllers/jobApp");
const verifyToken = require('./utils/auth');

router.get("/", async (req,res) => {
    res.send("CRUD API FOR MONGODB!");
});

// User routes
router.post("/api/users", createUser);
router.post("/api/users/login", login);
router.put("/api/users/:userID", verifyToken, updateUserPassword);
router.delete("/api/users/:userID", verifyToken, deleteUser);
router.get("/api/users/:userID", verifyToken, getUserById);
router.get("/api/users/", verifyToken, getAllUsers);

// Job application routes
router.post("/api/users/jobapps", verifyToken, createJobApplication); // Assuming you want to protect job application creation with authentication
router.get("/api/users/jobapps", verifyToken, getAllJobAppsByUserId);
module.exports = router;
