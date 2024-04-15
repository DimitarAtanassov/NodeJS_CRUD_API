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
    login,
    forgotPassword,
    resetPassword,
    updateProfilePicture,
    updateSkills,
    getUserSkills,
    addUserLink,
    getUserLinks
} = require("./controllers/user");
const {
    createJobApplication,
    getAllJobAppsByUserId,
    updateJobAppStatus,
    deleteJobApplication
} = require("./controllers/jobApp");
const {verifyToken,refreshToken} = require('./utils/auth');
const User = require('./model/user.model');
const Verification = require('./model/verification.model');
router.get("/", async (req,res) => {
    
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    res.send("CRUD API FOR MONGODB!");
});

// User routes
router.post("/api/users", createUser);
router.post("/api/users/login", login);
// Create a route to handle email verification
// TODO: MOVE FUNCTION LOGIC OUTSIDE OF HERE 
router.get('/verify/:token', async (req, res) => {
    try {
        const token = req.params.token;

        // Find the verification document by token
        const verification = await Verification.findOne({ token });

        // If no verification document found, token is invalid
        if (!verification) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        // Find the user associated with the verification document
        const user = await User.findById(verification.userId);

        // If user not found, handle error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Activate user's account by setting active to true
        user.active = true;
        await user.save();

        // Delete the verification token from the database
        await Verification.deleteOne({ token });

        // Send response indicating successful verification
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// API endpoint to request a password reset
router.post('/api/forgot-password', forgotPassword);

// API endpoint to reset the password
router.post('/reset-password', resetPassword); // Change this to POST
// Protected
router.put("/api/users/:userID", verifyToken, updateUserPassword);
router.delete("/api/users/:userID", verifyToken, deleteUser);
router.get("/api/users/:userID", verifyToken, getUserById);
router.put("/api/users/:userID/profile-picture", verifyToken, updateProfilePicture);
router.put("/api/users/:userID/skills", verifyToken, updateSkills);
router.get("/api/users/:userID/skills", verifyToken, getUserSkills);
router.post("/api/users/:userID/links", verifyToken, addUserLink);
router.get("/api/users/:userID/links", verifyToken, getUserLinks);
// Job application routes (Protected)
router.post("/api/users/jobapps", verifyToken, createJobApplication);
router.post("/api/users/refresh-token", refreshToken); // JWT refresh endpoint 
router.get("/api/jobapps", verifyToken, getAllJobAppsByUserId);
router.put("/api/jobapps/:id/status", verifyToken, updateJobAppStatus); // Route for updating job application status
router.delete("/api/jobapps/:id", verifyToken, deleteJobApplication);
module.exports = router;
