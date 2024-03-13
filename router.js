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
    getAllJobAppsByUserId,
    updateJobAppStatus
} = require("./controllers/jobApp");
const verifyToken = require('./utils/auth');

router.get("/", async (req,res) => {
    res.send("CRUD API FOR MONGODB!");
});

// User routes
router.post("/api/users", createUser);
router.post("/api/users/login", login);
// Protected
router.put("/api/users/:userID", verifyToken, updateUserPassword);
router.delete("/api/users/:userID", verifyToken, deleteUser);
router.get("/api/users/:userID", verifyToken, getUserById);

// Job application routes (Protected)
router.post("/api/users/jobapps", verifyToken, createJobApplication); 
router.get("/api/jobapps", verifyToken, getAllJobAppsByUserId);
router.put("/api/jobapps/:id/status", verifyToken, updateJobAppStatus); // Route for updating job application status
module.exports = router;
