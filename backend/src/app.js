// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const requestRoutes = require('./routes/requestRoutes');
const geoRoutes = require('./routes/geoRoutes');
const aiRoutes = require('./routes/aiRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const impactRoutes = require('./routes/impactRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const kycRoutes = require('./routes/kycRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const userRoutes = require('./routes/userRoutes');
const publicOrgRoutes = require('./routes/publicOrgRoutes');
const responseSerializer = require('./middleware/responseSerializer');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(responseSerializer); // Serialize MongoDB _id to id

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/donate', transactionRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/geo', geoRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/impact', impactRoutes);
app.use('/api/organization', organizationRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/public-org', publicOrgRoutes);
// also expose singular service endpoint used in frontend
app.post('/api/service/complete', (req, res) => require('./controllers/requestController').completeService(req, res));

// Base Route
app.get('/', (req, res) => {
  res.json({ message: '✅ Backend server running successfully!' });
});

module.exports = app;
