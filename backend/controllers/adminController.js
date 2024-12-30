const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../modals/Admin');
const Candidate = require('../modals/Candidate');
require('dotenv').config();

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } 
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            admin: { id: admin._id, email: admin.email }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find({});

        if (!candidates || candidates.length === 0) {
            return res.status(404).json({ message: "No candidates found." });
        }

        res.status(200).json({
            success: true,
            message: "Candidates fetched successfully",
            candidates,
        });
    } catch (error) {
        console.error("Get Candidates Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch candidates. Please try again later.",
            error: error.message,
        });
    }
};
const createCandidate = async (req, res) => {
    try {
        const { name, mobile, address, email, password } = req.body;

        if (!name || !mobile || !address || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingCandidate = await Candidate.findOne({ email });
        if (existingCandidate) {
            return res.status(400).json({ message: 'Candidate with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newCandidate = new Candidate({
            name,
            mobile,
            address,
            email,
            password: hashedPassword,
        });

        await newCandidate.save();

        res.status(201).json({ message: 'Candidate created successfully', candidate: newCandidate });
    } catch (error) {
        console.error('Create Candidate Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteCandidate = async (req, res) => {
    try {
        // Candidate deletion logic here
        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
        console.error('Delete Candidate Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    login,
    getCandidates,
    createCandidate,
    deleteCandidate
};