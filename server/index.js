const express = require('express');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || process.env.VITE_GOOGLE_APPS_SCRIPT_URL;
const API_KEY = process.env.API_KEY || null; // optional

if (!APPS_SCRIPT_URL) {
  console.error('APPS_SCRIPT_URL is not set. Please set it in .env');
  process.exit(1);
}

app.use(helmet());
app.use(morgan('tiny'));

// Allow requests from your frontend origin. Default to allow all in dev.
const corsOptions = {
  origin: process.env.CORS_ORIGIN || true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '50kb' }));

// Basic rate limiter for the API endpoints
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60 * 1000),
  max: Number(process.env.RATE_LIMIT_MAX || 30),
});
app.use('/api/', limiter);

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// POST /api/submit - forward to Google Apps Script
app.post('/api/submit', async (req, res) => {
  try {
    // Optional API key check
    if (API_KEY) {
      const provided = req.headers['x-api-key'] || req.query.api_key;
      if (provided !== API_KEY) {
        return res.status(401).json({ success: false, message: 'Invalid API key' });
      }
    }

    const body = req.body || {};

    // Normalize fields
    const full_name = body.full_name ? String(body.full_name).trim() : '';
    const email = body.email ? String(body.email).trim() : '';
    const contact_number = body.contact_number ? String(body.contact_number).replace(/\D/g, '') : '';
    const project_description = body.project_description ? String(body.project_description).trim() : '';
    const budget = body.budget ? String(body.budget).trim() : '';
    const type = body.type ? String(body.type).trim() : '';

    // Basic validation
    if (!full_name) return res.status(400).json({ success: false, message: 'Full name is required' });
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ success: false, message: 'Invalid email' });
    if (!contact_number) return res.status(400).json({ success: false, message: 'Contact number is required' });
    if (contact_number.length < 6 || contact_number.length > 20) return res.status(400).json({ success: false, message: 'Contact number looks invalid' });
    if (!project_description) return res.status(400).json({ success: false, message: 'Project description is required' });

    const payload = {
      full_name,
      email,
      contact_number,
      project_description,
      budget: type === 'rfp' ? budget : null,
      type,
    };

    const upstreamRes = await axios.post(APPS_SCRIPT_URL, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: Number(process.env.UPSTREAM_TIMEOUT_MS || 10000),
    });

    // Forward upstream response body and status
    return res.status(upstreamRes.status || 200).send(upstreamRes.data);
  } catch (err) {
    console.error('Proxy error:', err && err.stack ? err.stack : err);
    if (err.response) {
      // forward upstream error
      return res.status(err.response.status || 502).send(err.response.data || { success: false });
    }
    return res.status(502).json({ success: false, message: 'Upstream proxy error' });
  }
});

app.listen(PORT, () => {
  console.log(`Fullstackverse proxy listening on port ${PORT}`);
});
