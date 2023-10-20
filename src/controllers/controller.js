const service = require('../services/service');

const getAllResumes = async(req, res) => {
    try{
        const allResume = await service.getAllResumes();
        res.json({data: allResume, status: 'success'});
    }catch(ex){
        res.status(500).json({error: ex.message});
    }
};

const getResumeById = async(req, res) => {
    try{
        const resume = await service.getResumeById(req.params.id);
        res.json({data: resume, status: 'success'});
    }catch(ex){
        res.status(500).json({error: ex.message});
    }
};

const createNewResume = async(req, res) => {
    try{
        const resume = await service.createNewResume(req.body);
        res.json({data: resume, status: 'success'});
    }catch(ex){
        res.status(500).json({error: ex.message});
    }
};

const updateResume = async(req, res) => {
    try{
        const resume = await service.updateResume(req.params.id, req.body);
        res.json({data: resume, status: 'success'});
    }catch(ex){
        res.status(500).json({error: ex.message});
    }
};

const deleteResume = async(req, res) => {
    try{
        const resume = await service.deleteResume(req.params.id);
        res.json({data: resume, status: 'success'});
    }catch(ex){
        res.status(500).json({error: ex.message});
    }
};

module.exports = {
    getAllResumes,
    getResumeById,
    createNewResume,
    updateResume,
    deleteResume
};

