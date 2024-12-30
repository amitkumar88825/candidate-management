const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const routes = require('./routes/index.js');

const PORT = process.env.PORT;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); 

connectDB();

app.get('/', (req, res) => {
  res.send('Welcome to my application!');
});

app.use("/uploads", express.static("uploads"));

app.use('/api', routes());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
