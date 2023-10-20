const resume = require('../models/resumeModel');

const getAllResumes = async() => await resume.find();

const getResumeById = async(id) => {
    var data = await resume.findById(id);
    return data;
} 

const createNewResume = async(data) => {
    var data = await resume.create(data);
    return data;
}

const updateResume = async(id, data) => {
    var data = await resume.findByIdAndUpdate(id, data);
    return data;
}

const deleteResume = async(id) => {
    var data = await resume.findByIdAndDelete(id);
    return data
}

module.exports = {
    getAllResumes,
    getResumeById,
    createNewResume,
    updateResume,
    deleteResume
}