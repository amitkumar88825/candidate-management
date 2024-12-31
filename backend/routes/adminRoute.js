const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const upload = require('../middleware/upload.js');

const adminController = require('../controllers/adminController.js')

router.post('/login', adminController.login);

router.get('/candidates', verifyToken, adminController.getCandidates);

router.get('/:id', verifyToken, adminController.getAdminById);

router.post('/candidates', verifyToken, upload.single('image'), adminController.createCandidate);

router.delete('/candidate/:id', verifyToken, adminController.deleteCandidate);

module.exports = router;
