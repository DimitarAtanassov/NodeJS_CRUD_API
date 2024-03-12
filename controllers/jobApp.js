// jobapp.js
const JobApp = require("../model/jobApp.model");

const createJobApplication = async (req, res) => {
    try {
        const { company, title, link } = req.body;
        const userId = req.userId; // Assuming you're using JWT authentication and the user ID is stored in the request object

        // Create a new job application
        const newJobApp = new JobApp({
            company,
            title,
            link,
            user: userId // Associate the job application with the user
        });

        // Save the new job application to the database
        await newJobApp.save();

        res.status(201).json({ message: "Job application created successfully", jobApp: newJobApp });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const getAllJobAppsByUserId = async (req,res) => {
  try{
    const userId = req.userId; 
    const jobApps = await JobApp.find({user:userId});
    res.status(200).json({jobApps});
  
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
    createJobApplication,
    getAllJobAppsByUserId
};
