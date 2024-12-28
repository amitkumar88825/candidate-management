// Import dependencies
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Define a port
const PORT = process.env.PORT || 5000;

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to my application!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
