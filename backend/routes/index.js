const express = require('express');
const adminRoute = require('./adminRoute.js'); 
const candidateRoute = require('./candidateRoute.js');

const routes = () => {
    const router = express.Router();
    try {
        router.use('/admin', adminRoute);
        router.use('/candidate', candidateRoute);
    } catch (error) {
        console.error('Error setting up routes:', error);
    }
    return router;
};

module.exports = routes;
