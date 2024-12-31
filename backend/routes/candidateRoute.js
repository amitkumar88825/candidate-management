const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const upload = require('../middleware/upload.js');

const candidateController = require('../controllers/candidateController.js')

router.post('/login', candidateController.login);

const verifyToken = require('../middleware/authMiddleware');
router.get('/:id',verifyToken , candidateController.getCandidateById);

router.post('/profile/:id', verifyToken, upload.single('image'), candidateController.uploadProfileImage);

module.exports = router;