const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

const candidateController = require('../controllers/candidateController.js')

router.post('/login', candidateController.login);

router.get('/:id',verifyToken , candidateController.getCandidateById);

router.post('/profile/:id', verifyToken, candidateController.uploadProfileImage);

module.exports = router;