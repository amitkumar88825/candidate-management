const express = require('express');
const router = express.Router();

const candidateController = require('../controllers/candidateController.js')

router.get('/login', candidateController.login);

router.get('/profile/:candidateId', candidateController.getCandidateById);

router.put('/profile/:condidateId', candidateController.updateCandidateProfile);

module.exports = router;
