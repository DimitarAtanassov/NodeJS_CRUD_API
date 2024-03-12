const JobApplication = require('../model/jobApp.model');

const createJobApp = async (req, res) => {
  try {
    const { company, title, link } = req.body;
    const userId = req.userId; // Access userId from req object

    console.log('Received request to create job application with the following data:');
    console.log('Company:', company);
    console.log('Title:', title);
    console.log('Link:', link);
    console.log('User ID:', userId);

    const newJobApp = new JobApplication({
      company,
      title,
      link,
      user: userId, // Assign userId to the job application
    });

    await newJobApp.save();
    console.log('Job application created successfully:', newJobApp);
    res.status(201).json(newJobApp); // Return newly created job application data
  } catch (error) {
    console.error('Error creating job application:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getAllJobApps = async (req, res) => {
  try {
    const userId = req.user.userId;

    const jobApplications = await JobApplication.find({ user: userId });

    res.json(jobApplications); // Return job applications data
  } catch (error) {
    console.error('Error fetching job applications:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createJobApp,
  getAllJobApps,
};