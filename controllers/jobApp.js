// jobapp.js
const JobApp = require("../model/jobApp.model");
const User = require("../model/user.model");
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

      // Update the user's jobApplications array with the ID of the new job application
      await User.findByIdAndUpdate(userId, { $push: { jobApplications: newJobApp._id } });

      res.status(201).json({ message: "Job application created successfully", jobApp: newJobApp });
  } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const getAllJobAppsByUserId = async (req, res) => {
  try {
    // Extract the user's ID from the request
    const userId = req.userId; // Assuming you're using JWT authentication and the user ID is stored in the request object

    // Query the User collection to retrieve the user document
    const user = await User.findById(userId).populate('jobApplications');

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract job applications from the user document
    const jobApplications = user.jobApplications;

    // Return job applications as a response
    res.status(200).json({ jobApplications });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
    createJobApplication,
    getAllJobAppsByUserId
};
