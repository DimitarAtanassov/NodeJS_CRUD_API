// jobApp.js

/*
    Stores our CRUD function for Job App Documents in MongoDB
*/

// Imports
//===============================================================
const JobApp = require("../model/jobApp.model");
const User = require("../model/user.model");

// Functions
//===============================================================

// Create a new Job App
const createJobApplication = async (req, res) => {
  try {
      const { company, title, link } = req.body;
      const userId = req.userId; //  user ID is stored in the request object during JWT authentication

      // Create a new job application
      const newJobApp = new JobApp({
          company,
          title,
          link,
          user: userId // Associate the job application with the user
      });

      // Save the new job application to the database
      await newJobApp.save();

      // Update the user's jobApplications array (push mongoDB operator used to append values to array field)
      await User.findByIdAndUpdate(userId, { $push: { jobApplications: newJobApp._id } });

      res.status(201).json({ message: "Job application created successfully", jobApp: newJobApp });
  } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all job apps of a user
const getAllJobAppsByUserId = async (req, res) => {
  try {
    const userId = req.userId; 

    // Find the user in the database using the userID, and populate the jobApplications field
    // User object is retrieved along with all the job apps associated with that user
    const user = await User.findById(userId).populate('jobApplications');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract job applications from the user object
    const jobApplications = user.jobApplications.map(jobApp => ({
      _id: jobApp._id,
      company: jobApp.company,
      title: jobApp.title,
      link: jobApp.link,
      status: jobApp.status
    }));
    const counts = await getStatusCounts(userId); // Call getStatusCounts here
    res.status(200).json({ jobApplications, counts });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// update the status field of a user's job app
const updateJobAppStatus = async (req,res) => {
  const jobId = req.params.id;
  const {status} = req.body;
  try {
    // Find a job app using its id, update the status field with the value of our status variable, new: true returns the modified document rather than the original one
    const updatedJobApp = await JobApp.findByIdAndUpdate(jobId, { status }, { new: true });

    if(!updatedJobApp){
      return res.status(404).json({ message: 'Job application not found' });
    }
    res.status(200).json({ message: 'Job application status updated successfully', jobApp: updatedJobApp });
  } catch (error) {
    console.error('Error updating job application status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getStatusCounts = async (userId) => {
  try {
      console.log("hit");
      console.log(userId); 
    // Use MongoDB aggregation to group job applications by status and calculate counts
      const statusCounts = await JobApp.aggregate([
          { $match: { user: userId } }, // Filter job apps by user ID
          { $group: { _id: '$status', count: { $sum: 1 } } }
      ]);
      console.log(statusCounts);
      console.log("hit2")  
      // Construct an object to store status counts
      const counts = {
          pending: 0,
          accepted: 0,
          rejected: 0
      };

      // Iterate through the statusCounts array and populate the counts object
      statusCounts.forEach(status => {
          if (status._id === 'pending') {
              counts.pending = status.count;
          } else if (status._id === 'accepted') {
              counts.accepted = status.count;
          } else if (status._id === 'rejected') {
              counts.rejected = status.count;
          }
      });

      // Return the counts object
      return counts;
  } catch (error) {
      // Handle any errors
      console.error('Error fetching status counts:', error);
      throw error;
  }
};

const deleteJobApplication = async (req,res) => {
  const jobId = req.params.id;
  try{
    const deletedJobApp = await JobApp.findByIdAndDelete(jobId);
    if (deletedJobApp) {
      // Remove the deleted job application ID from the corresponding user's jobApplications array 
      await User.findByIdAndUpdate(
        deletedJobApp.user,
        {$pull : {jobApplications: jobId}},
        { new: true}
      );
      return res.status(204).json({message: 'Job Application Deleted'})
    }else{
      res.status(404).json({message: 'Job application to be deleted not found'});
    }
  }catch (error) {
    console.error('Error deleting job application:', error);  // What is seen in backend
    res.status(500).json({ message: 'Internal server error' }); // What is seen in frontend
    throw error;
  }
}

/* Create Delete Job Application Function */
// Functions
//===============================================================
module.exports = {
    createJobApplication,
    getAllJobAppsByUserId,
    updateJobAppStatus,
    deleteJobApplication
};
