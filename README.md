# 🌟 Social Impact Donation & Charity Management System

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [User Roles](#user-roles)
- [Core Modules](#core-modules)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Social Impact Donation & Charity Management System** is a comprehensive, AI-powered platform that connects donors, service helpers, receivers, and organizations to create meaningful social impact. The system features real-time geo-location matching, blockchain-like transaction transparency, AI-powered recommendations, and comprehensive analytics.

### 🌐 Live Deployment
- **Frontend:** https://donation-system-sooty.vercel.app
- **Backend API:** https://donation-system-b68r.onrender.com
- **API Health:** https://donation-system-b68r.onrender.com/health

---

## ✨ Features

### 🔐 **Authentication & Authorization**
- Multi-role user registration (Admin, Donor, Helper, Receiver, Organization, NGO)
- JWT-based authentication with 7-day expiry
- Role-based access control (RBAC)
- Email verification (SendGrid integration)
- Password encryption (bcrypt with 10 salt rounds)
- Rate limiting (50 auth attempts/15 min in production)
- Session management with secure tokens

### 💰 **Financial Donations**
- **Multiple Payment Methods:**
  - Razorpay integration for UPI, cards, wallets
  - Anonymous donation support
  - Recurring donation setup
- **Real-Time Tracking:**
  - Transaction history with filters
  - QR code generation for each donation
  - Impact visualization through unique QR codes
- **Transparency Features:**
  - Blockchain-inspired transaction records
  - Proof of impact with photos/videos
  - Donor acknowledgment system

### 🤝 **Service Helper System**
- **Helper Registration:**
  - Profession and license verification
  - Skill-based categorization
  - Availability management
- **Service Matching:**
  - AI-powered helper-receiver matching
  - Geo-location based recommendations
  - Real-time service request handling
- **Service Completion:**
  - Photo/video proof upload (Cloudinary)
  - Service verification workflow
  - Helper rating and review system

### 📍 **Geo-Location Features**
- **Real-Time Matching:**
  - Haversine formula for distance calculation
  - Nearby requests within configurable radius
  - Map-based visualization (Leaflet.js)
- **Location Alerts:**
  - Push notifications for nearby requests
  - Geo-fencing for service areas
  - Emergency alert system

### 📊 **Campaign Management**
- **Campaign Creation:**
  - Title, description, images, goal amount
  - Duration and category selection
  - Admin approval workflow
- **Campaign Tracking:**
  - Real-time funding progress
  - Donor list with amounts
  - Campaign analytics dashboard
- **Campaign Types:**
  - Financial fundraising
  - Service-based campaigns
  - Mixed (financial + service)

### 🩸 **Blood Donation Module**
- Blood type matching system
- Donor availability tracking
- Emergency blood request handling
- Hospital and blood bank integration
- Blood donation history

### 🤖 **AI-Powered Features**
- **Recommendation Engine:**
  - Campaign recommendations based on user history
  - Helper matching using ML algorithms
  - Sentiment analysis of campaign descriptions
- **Chatbot:**
  - 24/7 support bot with knowledge base
  - Multi-language support
  - Context-aware responses
- **Voice Assistant:**
  - Voice-based navigation
  - Hands-free donation process
  - Accessibility features

### 📱 **Real-Time Communication**
- **WebSocket Integration (Socket.IO):**
  - Real-time notifications
  - Live updates on campaigns
  - Instant messaging between users
- **Video Calling:**
  - WebRTC-based video calls
  - Peer-to-peer connection (SimplePeer)
  - Screen sharing capabilities
  - Call recording option

### 📧 **Email Notifications**
- **SendGrid Integration:**
  - Welcome emails on registration
  - Donation receipts with PDF
  - Campaign approval/rejection notifications
  - Monthly impact reports
- **Email Templates:**
  - Responsive HTML templates
  - Personalized content
  - Branded design

### 📈 **Analytics & Reporting**
- **Dashboard Metrics:**
  - Total donations, campaigns, users
  - Success rate, average donation
  - Geographic distribution
- **Impact Reports:**
  - Monthly/yearly reports
  - PDF export (jsPDF)
  - Visual charts (Recharts)
- **Audit Logs:**
  - User activity tracking
  - System event logging
  - Security audit trail

### 👥 **Admin Panel**
- **User Management:**
  - View all users with filters
  - Update user roles and status
  - Delete users
  - Password reset
- **Campaign Management:**
  - Approve/reject campaigns
  - Monitor campaign progress
  - Set featured campaigns
- **KYC Verification:**
  - Document upload and verification
  - Approval workflow
  - Identity verification
- **System Settings:**
  - Configure rate limits
  - Email template management
  - Payment gateway settings

### 🏢 **Organization Features**
- Organization registration with verification
- Student event management
- Bulk student addition
- Event approval workflow
- Organization dashboard
- Public organization profiles

### 🎁 **Request Management**
- **Receiver Requests:**
  - Create help requests with details
  - Upload supporting documents
  - Track request status
- **Request Workflow:**
  - Admin approval
  - Helper acceptance
  - Service completion
  - Sanction and verification
- **Request Types:**
  - Financial assistance
  - Service help
  - Emergency requests

### 🔒 **Security Features**
- **Data Protection:**
  - Password hashing (bcrypt)
  - SQL injection prevention (express-mongo-sanitize)
  - XSS protection (helmet.js)
  - HPP (HTTP Parameter Pollution) prevention
- **API Security:**
  - Rate limiting per IP
  - CORS configuration
  - JWT token validation
  - Role-based middleware
- **Audit & Compliance:**
  - Activity logging
  - Transaction auditing
  - GDPR compliance ready

### 📊 **Impact Tracking**
- **Impact Stories:**
  - Before/after photos
  - Beneficiary testimonials
  - Success metrics
- **QR Code System:**
  - Unique QR for each donation
  - Scan to view impact
  - Shareable impact pages
- **Metrics Calculation:**
  - Lives impacted
  - Services provided
  - Total amount raised

---

## 🛠️ Technology Stack

### **Backend**
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime environment | v22.14.0 |
| **Express.js** | Web framework | 4.21.2 |
| **MongoDB** | Database | MongoDB Atlas |
| **Mongoose** | ODM | 8.10.8 |
| **JWT** | Authentication | jsonwebtoken 9.0.2 |
| **bcrypt/bcryptjs** | Password hashing | 5.1.1 / 3.0.3 |
| **Socket.IO** | Real-time communication | 4.8.1 |
| **SendGrid** | Email service | @sendgrid/mail 8.1.6 |
| **Cloudinary** | Image/video storage | 1.41.0 |
| **Razorpay** | Payment gateway | razorpay 2.10.0 |
| **express-rate-limit** | Rate limiting | 7.5.0 |
| **helmet** | Security headers | 8.0.0 |
| **morgan** | HTTP logging | 1.10.0 |
| **cors** | CORS handling | 2.8.5 |
| **dotenv** | Environment variables | 16.4.5 |

### **Frontend**
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI framework | 18.3.1 |
| **Vite** | Build tool | 7.2.2 |
| **React Router** | Routing | 7.9.1 |
| **Axios** | HTTP client | 1.12.2 |
| **Socket.IO Client** | WebSocket client | 4.8.1 |
| **Leaflet** | Maps | 1.9.4 |
| **react-leaflet** | React map components | 4.2.1 |
| **Recharts** | Data visualization | 3.3.0 |
| **jsPDF** | PDF generation | 3.0.3 |
| **QRCode.react** | QR code generation | 4.2.0 |
| **SimplePeer** | WebRTC | 9.11.1 |
| **React Icons** | Icon library | 5.5.0 |

### **Development Tools**
- **Git** - Version control
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server
- **Concurrently** - Run multiple commands

### **Deployment**
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Database hosting
- **Cloudinary** - Media storage
- **GitHub** - Code repository

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Browser │  │  Mobile  │  │   PWA    │  │   API    │   │
│  │   App    │  │   App    │  │          │  │  Client  │   │
│  └─────┬────┘  └─────┬────┘  └─────┬────┘  └─────┬────┘   │
└────────┼─────────────┼─────────────┼─────────────┼─────────┘
         │             │             │             │
         └──────────────┴──────────────┴─────────────┘
                        │
         ┌──────────────▼──────────────┐
         │    API GATEWAY (Express)    │
         │  - Rate Limiting            │
         │  - Authentication           │
         │  - Request Validation       │
         └──────────────┬──────────────┘
                        │
         ┌──────────────┴──────────────┐
         │                             │
    ┌────▼────┐              ┌────────▼────────┐
    │   REST  │              │   WebSocket     │
    │   API   │              │   (Socket.IO)   │
    └────┬────┘              └────────┬────────┘
         │                            │
┌────────┴────────────────────────────┴─────────┐
│           APPLICATION LAYER                   │
│  ┌────────┐  ┌────────┐  ┌────────┐         │
│  │  Auth  │  │  User  │  │Campaign│         │
│  │Service │  │Service │  │Service │         │
│  └────────┘  └────────┘  └────────┘         │
│  ┌────────┐  ┌────────┐  ┌────────┐         │
│  │  Geo   │  │  Email │  │Payment │         │
│  │Service │  │Service │  │Service │         │
│  └────────┘  └────────┘  └────────┘         │
└───────────────────┬───────────────────────────┘
                    │
┌───────────────────┴───────────────────────────┐
│           DATA LAYER                          │
│  ┌────────┐  ┌────────┐  ┌────────┐         │
│  │MongoDB │  │Redis   │  │Cloudinary       │
│  │(Atlas) │  │(Cache) │  │(Media)│         │
│  └────────┘  └────────┘  └────────┘         │
└───────────────────────────────────────────────┘
         │             │             │
┌────────┴──────┬──────┴──────┬──────┴─────────┐
│               │             │                │
│   SendGrid    │   Razorpay  │   External     │
│   (Email)     │   (Payment) │   APIs         │
└───────────────┴─────────────┴────────────────┘
```

---

## 👥 User Roles

### 1. **Admin** 👑
- **Access Level:** Full system access
- **Capabilities:**
  - User management (view, update, delete)
  - Campaign approval/rejection
  - KYC verification
  - System analytics
  - Email template management
  - Security settings
  - Audit log access
- **Dashboard:** Admin control panel with all system metrics

### 2. **Donor** 💰
- **Access Level:** Donation and tracking
- **Capabilities:**
  - Make financial donations
  - View donation history
  - Track impact through QR codes
  - Campaign recommendations
  - Anonymous donation option
  - Download receipts (PDF)
  - Set recurring donations
- **Dashboard:** Personal donation dashboard with impact metrics

### 3. **Service Helper** 🤝
- **Access Level:** Service provision
- **Capabilities:**
  - Register services and skills
  - View nearby service requests
  - Accept service requests
  - Upload service completion proof
  - Manage availability
  - Earn trust score and badges
  - Video call with receivers
- **Dashboard:** Service management dashboard

### 4. **Receiver** 🎁
- **Access Level:** Request assistance
- **Capabilities:**
  - Create help requests
  - Upload supporting documents
  - Track request status
  - View matched helpers
  - Rate and review helpers
  - Receive notifications
- **Dashboard:** Request tracking dashboard

### 5. **Organization/NGO** 🏢
- **Access Level:** Organization management
- **Capabilities:**
  - Create campaigns
  - Manage students/members
  - Event management
  - Bulk operations
  - Organization profile
  - Analytics and reports
- **Dashboard:** Organization admin dashboard

---

## 📦 Core Modules

### 1. Authentication Module (`/api/auth`)
- **POST `/register`** - Register new user
- **POST `/login`** - User login

### 2. User Management (`/api/users`)
- **GET `/`** - Get all users (admin)
- **GET `/credentials/all`** - Get user credentials (protected)
- **PUT `/profile`** - Update profile
- **PATCH `/:id/password`** - Update password (admin)
- **DELETE `/:id`** - Delete user (admin)

### 3. Campaign Module (`/api/campaigns`)
- **GET `/`** - Get all campaigns (with filters)
- **GET `/:id`** - Get campaign by ID
- **POST `/`** - Create new campaign
- **PATCH `/:id/approve`** - Approve campaign (admin)
- **PATCH `/:id/reject`** - Reject campaign (admin)

### 4. Donation/Transaction Module (`/api/donate`)
- **POST `/`** - Create donation
- **GET `/`** - Get transaction history
- **GET `/impact/:qr`** - Get impact by QR code

### 5. Request Module (`/api/requests`)
- **GET `/`** - Get all requests
- **POST `/`** - Create new request
- **GET `/user/:id`** - Get requests by user
- **POST `/accept`** - Accept request (helper)
- **POST `/upload-proof`** - Upload proof
- **POST `/service/complete`** - Complete service
- **POST `/sanction`** - Sanction request (admin)
- **POST `/nearby`** - Get nearby requests (geo)
- **POST `/approve`** - Approve request (admin)
- **POST `/reject`** - Reject request (admin)

### 6. Geo-Location Module (`/api/geo`)
- **POST `/match`** - Match helpers/receivers by location

### 7. AI Module (`/api/ai`)
- **POST `/recommend`** - Get campaign recommendations
- **POST `/match-helpers`** - AI-powered helper matching
- **POST `/sentiment`** - Sentiment analysis

### 8. Analytics Module (`/api/analytics`)
- **GET `/`** - Get system analytics

### 9. Blood Donation Module (`/api/blood-donation`)
- Blood type matching
- Donor management
- Emergency requests

### 10. KYC Module (`/api/kyc`)
- **POST `/`** - Upload KYC documents
- **POST `/verify`** - Verify KYC (admin)
- **GET `/`** - Get all KYC submissions

### 11. Impact Stories (`/api/impact-stories`)
- **GET `/`** - Get all impact stories
- **GET `/:id`** - Get story by ID
- **POST `/`** - Create impact story
- **PUT `/:id`** - Update impact story
- **DELETE `/:id`** - Delete impact story

### 12. Notification Module (`/api/notifications`)
- Real-time push notifications
- WebSocket-based updates

### 13. Mail Module (`/api/mail`)
- **POST `/send`** - Send email

### 14. Services Module (`/api/services`)
- **GET `/helper/:id`** - Get helper services
- **POST `/complete`** - Complete service

### 15. Organization Module (`/api/organization`)
- Event management
- Student management
- Dashboard data

### 16. Public Organization (`/api/public-orgs`)
- **GET `/`** - Get public organizations
- **POST `/register-request`** - Register organization request

---

## 🚀 Installation

### Prerequisites
- **Node.js** v18+ (recommended v22.14.0)
- **MongoDB** (Atlas account or local instance)
- **Git**
- **npm** or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/NaiduBugata/Donation-System.git
cd Donation-System
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create `backend/.env` file:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/donationDB?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRE=7d

# SendGrid Email
MAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=SG.your-sendgrid-api-key
MAIL_FROM=noreply@yourdomain.com

# Cloudinary (Image/Video Storage)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Video Server (optional)
VIDEO_SERVER_PORT=5001
```

### Frontend Environment Variables

Create `frontend/.env` file:

```env
# API Base URL
VITE_API_BASE=http://localhost:5000

# Video Server URL
VITE_VIDEO_SERVER=http://localhost:5000

# Frontend URL
VITE_FRONTEND_URL=http://localhost:5173

# Environment
VITE_NODE_ENV=development

# Razorpay
REACT_APP_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

### MongoDB Atlas Setup

1. Create account at https://cloud.mongodb.com
2. Create new cluster
3. Go to **Database Access** → Create database user
4. Go to **Network Access** → Add IP Address → **Allow Access from Anywhere** (0.0.0.0/0)
5. Get connection string from **Connect** button

### SendGrid Setup

1. Create account at https://sendgrid.com
2. Go to **Settings** → **API Keys**
3. Create API key with **Mail Send** permission
4. Verify sender email in **Marketing** → **Senders**

### Cloudinary Setup

1. Create account at https://cloudinary.com
2. Dashboard shows: Cloud Name, API Key, API Secret
3. Copy credentials to `.env`

### Razorpay Setup

1. Create account at https://razorpay.com
2. Get **Key ID** and **Key Secret** from dashboard
3. Use test mode for development

---

## 🏃 Running the Application

### Development Mode

#### Terminal 1: Backend Server
```bash
cd backend
npm run dev
```
Server runs on: http://localhost:5000

#### Terminal 2: Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:5173

### Production Build

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm run preview
```

---

## 📊 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "donor",
  "phone": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "donor"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "donor"
  }
}
```

### Protected Endpoints

All protected routes require JWT token in header:
```http
Authorization: Bearer jwt_token_here
```

#### Create Campaign
```http
POST /api/campaigns
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "title": "Education for Underprivileged Children",
  "description": "Help us provide quality education",
  "goal": 100000,
  "category": "education",
  "duration": 30,
  "images": ["image_url_1", "image_url_2"]
}
```

#### Make Donation
```http
POST /api/donate
Content-Type: application/json

{
  "campaignId": "campaign_id",
  "amount": 5000,
  "anonymous": false,
  "email": "donor@example.com",
  "name": "Donor Name"
}
```

### Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error (development only)"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests (Rate Limit)
- `500` - Internal Server Error

---

## 🌐 Deployment

### Vercel (Frontend)

1. **Push code to GitHub**
2. **Connect to Vercel:**
   - Visit https://vercel.com
   - Import your repository
   - Select `frontend` as root directory
3. **Environment Variables:**
   ```
   VITE_API_BASE=https://your-backend.onrender.com
   VITE_VIDEO_SERVER=https://your-backend.onrender.com
   VITE_FRONTEND_URL=https://your-app.vercel.app
   VITE_NODE_ENV=production
   REACT_APP_RAZORPAY_KEY_ID=rzp_test_your_key
   ```
4. **Deploy:** Automatic on git push

### Render (Backend)

1. **Connect to Render:**
   - Visit https://render.com
   - Create new Web Service
   - Connect GitHub repository
2. **Settings:**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
3. **Environment Variables:**
   Add all variables from `backend/.env`
4. **Deploy:** Automatic on git push

### MongoDB Atlas (Database)

1. Whitelist Render IPs or use `0.0.0.0/0`
2. Ensure connection string in Render env vars
3. Test connection from deployed backend

### Post-Deployment Checklist

- [ ] Backend health endpoint responding: `/health`
- [ ] Frontend connects to backend API
- [ ] Database connection successful
- [ ] Email sending works (SendGrid)
- [ ] File uploads work (Cloudinary)
- [ ] Payments work (Razorpay test mode)
- [ ] WebSocket connections stable
- [ ] All environment variables set
- [ ] CORS configured correctly
- [ ] Rate limiting active

---

## 🧪 Testing

### Test Credentials

#### Admin
```
Email: stackhackdonation@gmail.com
Password: stack123
```

#### Donors
```
Email: 231fa04g08@gmail.com
Password: 4g08@123

Email: girinihithadornadula@gmail.com
Password: giri123
```

#### Helpers
```
Email: dornadulagirinihitha@gmail.com
Password: dorn123

Email: 231fa04251@gmail.com
Password: 4251@123
```

#### Receivers
```
Email: nihithadornadula@gmail.com
Password: nihi@123

Email: 231fa04751@gmail.com
Password: 4751@123
```

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Manual Testing Checklist

- [ ] User registration (all roles)
- [ ] User login/logout
- [ ] Create campaign
- [ ] Make donation
- [ ] Create service request
- [ ] Accept service request
- [ ] Upload proof of service
- [ ] Admin approval workflows
- [ ] Email notifications
- [ ] Real-time notifications
- [ ] Video calling
- [ ] Geo-location matching
- [ ] QR code generation/scanning
- [ ] PDF report generation
- [ ] Payment integration

---

## 📁 Project Structure

```
Donation-System/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   │   ├── cloudinary.js
│   │   │   ├── db.js
│   │   │   ├── nodemailer.js
│   │   │   ├── razorpay.js
│   │   │   └── winston.js
│   │   ├── controllers/     # Route controllers
│   │   │   ├── authController.js
│   │   │   ├── campaignController.js
│   │   │   ├── transactionController.js
│   │   │   └── ...
│   │   ├── middleware/      # Express middleware
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   ├── rateLimiter.js
│   │   │   └── ...
│   │   ├── models/          # MongoDB schemas
│   │   │   ├── User.js
│   │   │   ├── Campaign.js
│   │   │   ├── Transaction.js
│   │   │   └── ...
│   │   ├── routes/          # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── campaignRoutes.js
│   │   │   └── ...
│   │   ├── services/        # Business logic
│   │   │   ├── authService.js
│   │   │   ├── emailService.js
│   │   │   └── ...
│   │   ├── sockets/         # WebSocket handlers
│   │   │   └── socketHandler.js
│   │   ├── utils/           # Utility functions
│   │   │   ├── logger.js
│   │   │   ├── validator.js
│   │   │   └── ...
│   │   ├── app.js           # Express app
│   │   └── server.js        # Server entry point
│   ├── scripts/             # Utility scripts
│   │   ├── registerProductionUsers.js
│   │   ├── seedData.js
│   │   └── ...
│   ├── tests/               # Test files
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── api/             # API client
│   │   │   └── backendProxy.js
│   │   ├── components/      # React components
│   │   │   ├── Chatbot.jsx
│   │   │   ├── VideoCall.jsx
│   │   │   └── ...
│   │   ├── pages/           # Page components
│   │   │   ├── admin/
│   │   │   ├── donor/
│   │   │   ├── helper/
│   │   │   ├── receiver/
│   │   │   ├── Landing.jsx
│   │   │   └── ...
│   │   ├── styles/          # CSS files
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Root component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   ├── .env                 # Environment variables
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── .gitignore
├── README.md                # This file
└── LICENSE
```

---

## 🔒 Security Best Practices

### Implemented Security Measures

1. **Authentication:**
   - JWT tokens with expiry
   - Password hashing (bcrypt, 10 rounds)
   - Role-based access control

2. **API Security:**
   - Rate limiting (50 requests/15min)
   - CORS configuration
   - Request validation
   - SQL injection prevention (Mongoose)

3. **Data Protection:**
   - Environment variables for secrets
   - HTTPS in production
   - Secure headers (Helmet.js)
   - XSS protection

4. **Monitoring:**
   - Activity logging (Winston)
   - Audit trails
   - Error tracking

### Security Recommendations

- Change default JWT_SECRET
- Use strong passwords
- Enable 2FA for admin accounts
- Regular security audits
- Keep dependencies updated
- Monitor suspicious activities
- Backup database regularly

---

## 🐛 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Failed
```
Error: MongoNetworkError: connection refused
```
**Solution:**
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0`)
- Verify MONGO_URI in `.env`
- Check internet connection

#### 2. Rate Limiting Error
```
Too many authentication attempts, please try again after 15 minutes
```
**Solution:**
- Wait 15 minutes, or
- Increase `max` in `rateLimiter.js` for development

#### 3. WebSocket Connection Failed
```
WebSocket connection to 'ws://localhost:5001' failed
```
**Solution:**
- Add `VITE_VIDEO_SERVER` to Vercel environment variables
- Ensure backend supports WebSocket
- Check CORS settings

#### 4. SendGrid Email Not Sending
```
SENDGRID_API_KEY missing in .env
```
**Solution:**
- Add valid SendGrid API key to `.env`
- Verify sender email in SendGrid
- Check API key permissions

#### 5. CORS Error
```
Access to fetch at '...' from origin '...' has been blocked by CORS
```
**Solution:**
- Add frontend URL to `allowedOrigins` in `backend/src/app.js`
- Update `FRONTEND_URL` in Render environment variables
- Redeploy backend

---

## 📚 Additional Resources

### Documentation
- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Socket.IO Docs](https://socket.io/docs/)
- [SendGrid API](https://docs.sendgrid.com/)
- [Razorpay Docs](https://razorpay.com/docs/)

### Tutorials
- [JWT Authentication](https://jwt.io/introduction)
- [WebRTC Video Calls](https://webrtc.org/getting-started/overview)
- [Leaflet Maps](https://leafletjs.com/examples.html)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Coding Standards
- Follow ESLint rules
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation
- Write tests for new features

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors

**Stack Hack Team**
- GitHub: [@NaiduBugata](https://github.com/NaiduBugata)
- Email: stackhackdonation@gmail.com

---

## 🙏 Acknowledgments

- **MongoDB Atlas** for database hosting
- **Vercel** for frontend hosting
- **Render** for backend hosting
- **SendGrid** for email services
- **Cloudinary** for media storage
- **Razorpay** for payment integration
- **Open Source Community** for amazing libraries

---

## 📞 Support

For support, email stackhackdonation@gmail.com or open an issue on GitHub.

---

## 🎉 Project Status

**Status:** ✅ **Production Ready**

**Version:** 1.0.1

**Last Updated:** November 9, 2025

**Live URLs:**
- Frontend: https://donation-system-sooty.vercel.app
- Backend: https://donation-system-b68r.onrender.com

---

<p align="center">
  <b>Made with ❤️ for Social Impact</b>
</p>

<p align="center">
  <i>Connecting donors, helpers, and receivers to create meaningful change</i>
</p>
