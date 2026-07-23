require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with dynamic settings suitable for local SaaS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Mount Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/analyze', require('./routes/analyze'));
app.use('/api/resumes', require('./routes/resumes'));
app.use('/api/portfolios', require('./routes/portfolios'));

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// DevForge AI Backend Entry Point Server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 DevForge AI Server running on PORT ${PORT}`);
  console.log(`🔗 Healthcheck: http://localhost:${PORT}/api/health`);
  console.log(`=========================================`);
});
