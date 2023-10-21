const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    name: String
});

const resume = mongoose.model('resume', resumeSchema);
module.exports = resume;