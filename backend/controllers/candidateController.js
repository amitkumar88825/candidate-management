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

const getCandidateById = async (req, res) => {
    try {
        console.log(41 , 'sdkjfhskhdfk')
      const candidateId = req.params.id; 
  
      if (!candidateId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid candidate ID" });
      }
  
      const candidate = await Candidate.findById(candidateId);
  
      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }
  
      res.status(200).json(candidate); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
};

  

module.exports = {
    login,
    getCandidateById,
};