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
const { createJobApp, getAllJobApps } = require('./controllers/jobApp');
const verifyToken = require('./utils/auth');

router.get("/", async (req,res) => {
    res.send("CRUD API FOR MONGODB!");
});

router.post("/api/users", createUser);
router.post("/api/users/login", login);

// Protected routes requiring token authentication middleware
router.put("/api/users/:userID", verifyToken, updateUserPassword);
router.delete("/api/users/:userID", verifyToken, deleteUser);
router.get("/api/users/:userID", verifyToken, getUserById);
router.get("/api/users/", verifyToken, getAllUsers);

// Job App Routes (Protected)
router.get('/api/users/jobApps', verifyToken, getAllJobApps); // Get all Job Apps of user
router.post('/api/users/jobApps', verifyToken, createJobApp); // Create Job App

module.exports = router;
