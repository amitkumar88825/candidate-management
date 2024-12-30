const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Candidate = require("../modals/Candidate"); 

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const candidate = await Candidate.findOne({ email });
        if (!candidate) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, candidate.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: candidate._id, email: candidate.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // You can set the token expiration as needed
        );

        res.status(200).json({
            message: "Login successful",
            token,
            candidate: { id: candidate._id, email: candidate.email },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get Candidate Profile by ID
const getCandidateById = async (req, res) => {
    try {
        const candidateId = req.params.id;

        // Find candidate by ID
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // Return candidate profile
        res.status(200).json(candidate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update Candidate Profile
const updateCandidateProfile = async (req, res) => {
    try {
        const candidateId = req.params.id;
        const { name, email, password } = req.body;

        // Find candidate by ID
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // Update fields (Ensure that you hash the new password if it's updated)
        if (password) {
            const salt = await bcrypt.genSalt(10);
            candidate.password = await bcrypt.hash(password, salt);
        }

        if (name) candidate.name = name;
        if (email) candidate.email = email;

        // Save the updated candidate
        await candidate.save();

        // Return updated candidate profile
        res.status(200).json({ message: "Profile updated", candidate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    login,
    getCandidateById,
    updateCandidateProfile,
};