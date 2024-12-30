const express = require('express');
const router = express.Router();

const candidateController = require('../controllers/candidateController.js')

router.post('/login', candidateController.login);

router.get('/:id', candidateController.getCandidateById);

router.put('/:id', candidateController.updateCandidateProfile);

module.exports = router;
