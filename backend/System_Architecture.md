# 🏗️ System Architecture — Social Impact Donation & Charity Management System

## 🌍 Overview

The **Social Impact Donation & Charity Management System** is a web-based platform designed to connect **donors**, **helpers**, and **receivers** in a transparent and organized ecosystem.  

The system enables users to donate funds, offer voluntary services, and request help — all within a verified, role-based environment.  
It is built using **React.js (frontend)** and **Node.js + Express.js + MongoDB (backend)**.

---

## 🧩 1. Technology Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js (JavaScript), CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JSON Web Tokens (JWT) |
| **API Style** | RESTful APIs |
| **File Storage (optional)** | Cloudinary or Local Uploads |
| **Deployment (future)** | Render / Vercel / MongoDB Atlas |

---

## ⚙️ 2. High-Level System Architecture

### **Frontend (Client)**
- Built using **React.js (JavaScript)**.  
- Handles UI components such as login, donation pages, campaign lists, dashboards, etc.  
- Sends and receives data from the backend via **RESTful API calls** (Axios or Fetch).  
- Implements **CSS styling** for responsiveness and accessibility.

### **Backend (Server)**
- Developed using **Node.js** and **Express.js**.  
- Responsible for business logic, user management, donations, transactions, and data validation.  
- Connects to MongoDB for persistent data storage.
- Uses **JWT-based authentication** and **role-based access control (RBAC)**.
- Handles API routes for different modules: Auth, Users, Donations, Helpers, Receivers, and Reports.

### **Database (MongoDB)**
- Stores structured data for users, campaigns, donations, and transactions.
- Uses **Mongoose ODM** for schema modeling and validation.
- Provides data persistence and query optimization for backend APIs.

---

## 🧱 3. Backend Folder Architecture (Actual Implementation)
backend/
├── src/
│ ├── config/ # Database & external service configurations
│ │ ├── db.js
│ │ └── index.js
│ │
│ ├── models/ # Mongoose schemas
│ │ ├── User.js
│ │ ├── Campaign.js
│ │ ├── Transaction.js
│ │ ├── Helper.js
│ │ ├── Request.js
│ │ └── ImpactReport.js
│ │
│ ├── services/ # Business logic (core layer)
│ │ ├── authService.js
│ │ ├── userService.js
│ │ ├── campaignService.js
│ │ ├── transactionService.js
│ │ ├── helperService.js
│ │ └── reportService.js
│ │
│ ├── controllers/ # Route handlers (connects routes ↔ services)
│ │ ├── authController.js
│ │ ├── userController.js
│ │ ├── campaignController.js
│ │ ├── transactionController.js
│ │ ├── helperController.js
│ │ └── reportController.js
│ │
│ ├── routes/ # API endpoints
│ │ ├── authRoutes.js
│ │ ├── userRoutes.js
│ │ ├── campaignRoutes.js
│ │ ├── transactionRoutes.js
│ │ ├── helperRoutes.js
│ │ └── reportRoutes.js
│ │
│ ├── middleware/ # Security, validation, and logging
│ │ ├── authMiddleware.js
│ │ ├── roleMiddleware.js
│ │ ├── errorHandler.js
│ │ └── validateMiddleware.js
│ │
│ ├── utils/ # Utility functions
│ │ ├── jwtUtils.js
│ │ ├── hashUtils.js
│ │ └── response.js
│ │
│ ├── app.js # Express app setup
│ └── server.js # Entry point (connects DB + starts server)
│
├── tests/ # Unit and integration tests
│ ├── auth.test.js
│ ├── campaign.test.js
│ └── transaction.test.js
│
├── .env # Environment variables
├── package.json
├── Roadmap.md
└── System_Architecture.md


---

## 🔗 4. Data Flow (Frontend ↔ Backend ↔ Database)

### **1️⃣ User Authentication Flow**
1. User registers via React form → sends `POST /api/auth/register`
2. Server validates data, hashes password using **bcrypt**, stores in MongoDB.
3. On login (`POST /api/auth/login`), server issues a **JWT token**.
4. React stores the token (in cookies/localStorage) for session management.
5. Protected routes are accessed by sending JWT in the `Authorization` header.

---

### **2️⃣ Donation & Transaction Flow**
1. Donor initiates a donation via React form (`POST /api/transactions/initiate`).
2. Express backend creates a donation record and integrates with Razorpay (optional).
3. MongoDB stores donation data (amount, campaign, donor, status).
4. React dashboard fetches and displays donation history via `GET /api/transactions/my`.

---

### **3️⃣ Receiver & Helper Flow**
1. Receivers submit help requests → stored in MongoDB (`POST /api/receivers/request`).
2. Helpers (volunteers) can view and respond to nearby requests (`GET /api/helpers/nearby`).
3. After completion, helpers upload proof → verified by admin → stored in DB.
4. Admin approves or rejects requests.

---

### **4️⃣ Admin & Reporting Flow**
1. Admin logs in → views dashboard via `GET /api/admin/dashboard`.
2. Fetches statistics from MongoDB (e.g., total donations, active campaigns, users).
3. Generates reports (`GET /api/reports/overview`) and monitors activity logs.

---

## 🔐 5. Security & Middleware Layers

| Middleware | Responsibility |
|-------------|----------------|
| **authMiddleware.js** | Validates JWT and user sessions |
| **roleMiddleware.js** | Restricts access by user roles (Admin, Donor, Helper, Receiver) |
| **validateMiddleware.js** | Ensures request data follows schema |
| **errorHandler.js** | Global error catching and response |
| **hashUtils.js** | Handles password hashing using bcrypt |
| **jwtUtils.js** | Generates and verifies JWT tokens |

Additional:
- **CORS** — Enables cross-origin API access from React frontend  
- **Helmet** — Adds basic HTTP security headers  
- **Express-rate-limit** — Prevents brute-force login attempts  

---

## 🗂️ 6. Database Models Summary

| Model | Fields (Simplified) | Description |
|--------|----------------------|--------------|
| **User** | name, email, password, role, kycDocs, trustScore | Stores all user info |
| **Campaign** | title, description, goal, raised, verified | Tracks donation campaigns |
| **Transaction** | donorId, campaignId, amount, status | Handles donation/payment logs |
| **Request** | receiverId, description, proof, status | Records help requests |
| **Helper** | userId, profession, skills, verified | Stores volunteer info |
| **ImpactReport** | campaignId, details, verifiedBy | Used for transparency reports |

---

## 🔁 7. Backend Data Flow Diagram (Text Representation)

[ React Frontend ]
|
v
[ Express.js Backend ]
|
v
[ MongoDB Database ]


**Example API Path:**
1. React app sends request → `fetch('/api/transactions/initiate')`
2. Express controller → calls Service → interacts with MongoDB Model
3. Response returned → displayed on React dashboard

---

## ⚙️ 8. Development & Run Instructions

### Local Setup
```bash
cd backend
npm install
npm run dev
