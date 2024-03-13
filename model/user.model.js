// user.model.js
/*
    Stores the User schema for new users that will be added to our MongoDB
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
// Username
// Password
// email
// jobApplications: Array of ObjectIDs that reference the JobApplication documents in the database.
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },
    // ref: 'JobApp' specifies that these ObjectedIds refer to documents in the JobApp collection.
    jobApplications: [{ type: Schema.Types.ObjectId, ref: 'JobApp' }]
});

module.exports = mongoose.model('User', userSchema);