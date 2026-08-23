const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// API Routes
app.use('/api', apiRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Ajaytips EdTech API Server', timestamp: new Date() });
});

// Root handler
app.get('/', (req, res) => {
  res.send('<h1>Ajaytips Competitive Exam Platform API Server Running</h1>');
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  Ajaytips EdTech Server running on port ${PORT}`);
  console.log(`  Health endpoint: http://localhost:${PORT}/health`);
  console.log(`  API base endpoint: http://localhost:${PORT}/api`);
  console.log(`====================================================`);
});
