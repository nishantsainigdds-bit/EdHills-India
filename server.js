// ============================================================
//  edHills Modular Backend - server.js
// ============================================================

const express = require('express');
const cors = require('cors');
const path = require('path');
const { PORT } = require('./backend/config/config');

// Routes
const authRoutes = require('./backend/routes/authRoutes');
const studentRoutes = require('./backend/routes/studentRoutes');
const adminRoutes = require('./backend/routes/adminRoutes');
const siteRoutes = require('./backend/routes/siteRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/site', siteRoutes);

// AI Guru Mock API
app.post('/api/guru/chat', (req, res) => {
  const { message } = req.body;
  // This is where you'd integrate OpenAI/Gemini
  // For now, we return a friendly mock response
  res.json({
    reply: `Guru Ji received your message: "${message}". Keep studying hard! Check out our courses for more details.`,
    timestamp: new Date().toISOString()
  });
});

// Root Route - Serve Login by default if no matching static file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 edHills Premium Server running at http://localhost:${PORT}`);
  console.log(`📡 API Endpoints:`);
  console.log(`   - Auth     : http://localhost:${PORT}/api/auth`);
  console.log(`   - Student  : http://localhost:${PORT}/api/student`);
  console.log(`   - AI Guru  : http://localhost:${PORT}/api/guru/chat\n`);
});
