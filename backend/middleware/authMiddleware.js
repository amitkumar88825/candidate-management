const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    console.log(5 , 'verify ')
    const token = req.header('Authorization');

    console.log(8 , token)
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    console.log(11 , 'dfds')

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        console.log(16 , 'sdfsdf')

        console.log(18 , verified)

        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = verifyToken;
