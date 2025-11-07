# razorpay-mern

MERN stack skeleton with Razorpay integration (backend + frontend). This repository contains a ready-to-fill structure for building a Razorpay-enabled MERN application.

Structure

razorpay-mern/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md

Quick start (PowerShell)

1) Backend

cd razorpay-mern/backend
npm install
# start backend in dev mode (nodemon)
npm run dev

Expected single-line output examples (each command prints one main line):
- "added X packages" after npm install
- "✅ MongoDB Connected" when server connects to DB
- "🚀 Server running on port 5000" when server starts

2) Frontend

cd razorpay-mern/frontend
npm install
npm start

Expected single-line output examples:
- "added X packages"
- "Compiled successfully!" from react-scripts

Notes
- Update `.env` files with your secrets.
- Ensure MongoDB is running locally or change `MONGODB_URI` to use Atlas.
- Razorpay keys in these templates are placeholders; replace them with your test/live keys.

Important change: JWT authentication removed

- This project no longer uses JWT tokens. Backend endpoints for payments identify users by the `email` field sent in the request.
- The frontend stores the logged-in user object in `localStorage` under the key `user` (JSON). There is no Authorization header.
- This simplifies local development but is not secure for production. For production use, restore proper authentication (JWT/session) and secure API endpoints.

