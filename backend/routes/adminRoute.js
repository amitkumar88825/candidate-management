const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

const adminController = require('../controllers/adminController.js')

router.post('/login', adminController.login);

router.get('/candidates', verifyToken, adminController.getCandidates);

router.post('/candidates/create', verifyToken, adminController.createCandidate);

router.delete('/candidates/delete/:candidateId', verifyToken, adminController.deleteCandidate);

module.exports = router;
