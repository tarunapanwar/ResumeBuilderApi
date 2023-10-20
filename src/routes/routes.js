const express = require('express');
const resumeController = require('../controllers/controller');
const router = express.Router();

router.get('/', resumeController.getAllResumes);

router.get('/:id', resumeController.getResumeById);

router.post('/', resumeController.createNewResume);

router.patch('/:id', resumeController.updateResume);

router.delete('/:id', resumeController.deleteResume);

module.exports = router;

