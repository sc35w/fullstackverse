# Fullstackverse Node proxy

This small Express app receives form submissions from the frontend, validates and normalizes fields, and forwards them to the configured Google Apps Script endpoint. Use this to avoid CORS issues and to centralize validation, rate-limiting, and any API keys.

Setup

1. Copy `.env.example` to `.env` and set `APPS_SCRIPT_URL` (and optionally `API_KEY`, `CORS_ORIGIN`).
2. Install dependencies and start the server:

```bash
cd server
npm install
npm start
```

Deployment

Run the server on your Hostinger Node.js hosting or any Node host (VPS, Render, Railway, etc.). Configure your frontend to POST to the proxy URL (set `VITE_API_URL` at build time if needed).
