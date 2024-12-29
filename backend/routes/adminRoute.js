const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController.js')

router.post('/login', adminController.login);

router.get('/candidates', adminController.getCandidates);

router.get('/candidates/create', adminController.createCandidate);

router.delete('/candidates/delete/:candidateId', adminController.deleteCandidate);

module.exports = router;
