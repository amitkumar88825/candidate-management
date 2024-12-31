const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Candidate = require("../modals/Candidate"); 
const multer = require("multer");
const path = require("path");

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

// Method to get candidate data by ID
const getCandidateById = async (req, res) => {
    try {
        console.log(41 , 'sdkjfhskhdfk')
      const candidateId = req.params.id; // Get candidate ID from URL params
  
      // Validate the candidate ID is valid
      if (!candidateId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid candidate ID" });
      }
  
      const candidate = await Candidate.findById(candidateId);
  
      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }
  
      res.status(200).json(candidate); // Send the candidate data as response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };

// Set up multer for handling image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");  // Define where images will be stored
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);  // Ensure unique filenames
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },  // Max file size 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPEG, PNG, and JPG files are allowed."), false);
        }
    },
}).single("image"); // Expecting 'image' field for image upload

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

        // Handle file upload (profile picture)
        if (req.file) {
            const profileImageUrl = `/uploads/${req.file.filename}`;  // Store image URL
            candidate.profileImage = profileImageUrl;
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

// Endpoint to upload the profile image
const uploadProfileImage = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        // Get the candidate ID from params
        const candidateId = req.params.id;

        // Find candidate by ID
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // Update the profile image URL
        const profileImageUrl = `/uploads/${req.file.filename}`;
        candidate.profileImage = profileImageUrl;

        // Save the updated candidate profile
        await candidate.save();

        res.status(200).json({ message: "Profile image uploaded successfully", profileImage: profileImageUrl });
    });
};

module.exports = {
    login,
    getCandidateById,
    updateCandidateProfile,
    uploadProfileImage
};