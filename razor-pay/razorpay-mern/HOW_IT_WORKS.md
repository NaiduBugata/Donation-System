HOW IT WORKS — Razorpay MERN (No JWT)

Overview

This project is a skeleton MERN app integrated with Razorpay. It has been modified to remove JWT authentication for simpler local development. The high-level flow now associates payments with a user by email.

Important security note

- This setup is NOT secure for production. Sending an email in requests without authentication can be easily spoofed. Use this only for local testing or as a learning example. For production restore secure authentication (JWT / sessions) and validate requests on the backend.

Flow details

1) Registration
- Frontend POST /api/auth/register with { name, email, password }.
- Backend creates a hashed password and returns the created user object: { user: { id, name, email } }.
- Frontend stores this user in localStorage under key `user` and treats the user as logged-in.

2) Login
- Frontend POST /api/auth/login with { email, password }.
- Backend verifies password and returns the user object: { user: { id, name, email } }.
- Frontend stores `user` in localStorage and updates UI state.

3) Create Order (start payment)
- Frontend loads Razorpay checkout JS and calls POST /api/payments/create-order with { amount, email }.
- Backend validates `amount` and `email`. It looks up the user by email, creates a Razorpay order using the SDK, and stores a Payment document in MongoDB that references the user's _id.
- Backend returns the Razorpay order object (id, amount, currency, receipt, status).
- Frontend opens the Razorpay checkout using the returned order id.

4) Verify Payment
- After a successful checkout, Razorpay calls the frontend handler with razorpay_order_id, razorpay_payment_id, razorpay_signature.
- Frontend POSTs these fields to /api/payments/verify-payment.
- Backend verifies the signature using the Razorpay key secret and, if valid, updates the Payment record to status `paid` and stores paymentId/signature.

5) Payment History
- Frontend requests GET /api/payments/history?email=user@example.com
- Backend looks up the user by email and returns payments for that user.

Files of interest

- backend/routes/auth.js — register/login endpoints (return user object only)
- backend/routes/payments.js — create-order, verify-payment, history (associate by email)
- frontend/src/context/AuthContext.js — manages user object in localStorage (no token)
- frontend/src/components/Dashboard.js — initiates payments and includes email in create-order
- frontend/src/components/PaymentHistory.js — fetches history using ?email=...

How to migrate back to JWT (brief)

1. Add JWT generation in `auth.js` on login/register and return token.
2. Restore `middleware/auth.js` to verify token and set req.userId.
3. Protect payment routes with the auth middleware and use req.userId to associate payments.
4. Update frontend AuthContext to store token and set axios Authorization header.

This file is intentionally short and focused so you can read it quickly when developing locally.
