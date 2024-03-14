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
const {verifyToken,refreshToken} = require('./utils/auth');

router.get("/", async (req,res) => {
    res.send("CRUD API FOR MONGODB!");
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
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
router.post("/api/users/refresh-token", refreshToken); // JWT refresh endpoint 
router.get("/api/jobapps", verifyToken, getAllJobAppsByUserId);
router.put("/api/jobapps/:id/status", verifyToken, updateJobAppStatus); // Route for updating job application status
module.exports = router;
