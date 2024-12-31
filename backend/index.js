const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/index.js');

const PORT = process.env.PORT;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

app.get('/', (req, res) => {
  res.send('Welcome to my application!');
});

app.use('/api', routes());

app.use('*', (req, res) => {
  res.status(404).send('Route not found');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
