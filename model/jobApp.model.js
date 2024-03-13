// jobApp.model.js
/*
    Stores the Job App Schema used to create the Job App Model for Job App Documents in MongoDB
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// company: Name of Company applying to
// title: Job title
// link: link to job posting
// user: User that job app belongs to
// status: Status of the Job Application
const jobAppSchema = new Schema({
    company: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    // ref: 'User' field references documents in the User Collection
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // enum: specifies that the status field can only have one of the three values
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
});

module.exports = mongoose.model('JobApp', jobAppSchema);
