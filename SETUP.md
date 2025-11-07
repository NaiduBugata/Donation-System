# 🚀 Initial Setup Guide

Complete setup instructions for the Social Impact Donation and Charity Management System.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/downloads)
- **npm** or **yarn** package manager

---

## 📥 Step 1: Clone the Repository

```bash
git clone https://github.com/NaiduBugata/Social-Impact-Donation-Charity-Management-System.git
cd Social-Impact-Donation-Charity-Management-System
```

---

## 🔧 Step 2: Backend Setup

### 2.1 Navigate to Backend Directory

```bash
cd backend
```

### 2.2 Install Dependencies

```bash
npm install
```

### 2.3 Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://127.0.0.1:27017/donationDB

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-change-this
JWT_EXPIRE=7d

# Email Configuration (SendGrid)
MAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key-here
MAIL_FROM=noreply@yourdomain.com

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Razorpay (for payment processing)
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Frontend URL
FRONTEND_URL=http://localhost:5175

# Video Server
VIDEO_SERVER_PORT=5001
```

### 2.4 Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
# MongoDB usually runs as a service
net start MongoDB
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### 2.5 Seed Database (Optional)

To populate the database with sample data:

```bash
node scripts/seedData.js
```

### 2.6 Start Backend Server

```bash
npm start
```

The backend server should now be running at `http://localhost:5000`

✅ **Test Backend:** Open `http://localhost:5000/health` in your browser

---

## 🎨 Step 3: Frontend Setup

### 3.1 Navigate to Frontend Directory

Open a **new terminal** and navigate to the frontend:

```bash
cd frontend
```

### 3.2 Install Dependencies

```bash
npm install
```

### 3.3 Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit the `.env` file:

```env
VITE_API_BASE=http://localhost:5000
VITE_VIDEO_SERVER=http://localhost:5001
VITE_NODE_ENV=development
```

### 3.4 Start Frontend Development Server

```bash
npm run dev
```

The frontend should now be running at `http://localhost:5175`

✅ **Test Frontend:** Open `http://localhost:5175` in your browser

---

## 🎥 Step 4: Video Server Setup (Optional)

If you plan to use video calling features:

### 4.1 Start Video Server

Open a **new terminal** in the backend directory:

```bash
cd backend
node video-server.js
```

The video server should now be running at `http://localhost:5001`

---

## 🗄️ Step 5: Database Configuration

### 5.1 MongoDB Connection

Verify MongoDB is running:

```bash
# Connect to MongoDB shell
mongosh

# Check databases
show dbs

# Use your database
use donationDB

# View collections
show collections
```

### 5.2 Create Database Indexes (Recommended)

Run the index creation script:

```bash
cd backend
node scripts/createIndexes.js
```

---

## ✅ Step 6: Verify Installation

### Check Backend
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2025-11-07T...",
  "uptime": 12.34,
  "environment": "development"
}
```

### Check Frontend
Open `http://localhost:5175` - You should see the landing page

### Check Database
```bash
mongosh
use donationDB
db.users.countDocuments()  # Should return count of users
```

---

## 🎯 Step 7: Create Admin Account

### Option 1: Using Seed Data
```bash
cd backend
node scripts/seedData.js
```

This creates sample accounts including an admin user.

### Option 2: Manual Registration
1. Go to `http://localhost:5175`
2. Click "Get Started" → "Register"
3. Fill in the registration form
4. Manually update the user role in MongoDB:

```bash
mongosh
use donationDB
db.users.updateOne(
  { email: "youremail@example.com" },
  { $set: { role: "admin", verified: true } }
)
```

---

## 🔐 API Keys Setup

### SendGrid (Email Service)

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create an API key: Settings → API Keys → Create API Key
3. Add to `backend/.env`: `SENDGRID_API_KEY=your_key_here`
4. Verify sender email in SendGrid dashboard

### Cloudinary (Image Uploads)

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get credentials from Dashboard
3. Add to `backend/.env`:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Razorpay (Payment Gateway)

1. Sign up at [Razorpay](https://razorpay.com/)
2. Get test/live API keys from Dashboard
3. Add to `backend/.env`:
   ```
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   ```

---

## 🚨 Troubleshooting

### Backend won't start

**Issue:** Port 5000 already in use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

**Issue:** MongoDB connection failed
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env` file
- Verify MongoDB is accessible: `mongosh`

### Frontend won't start

**Issue:** Port 5175 already in use
```bash
# Change port in vite.config.js or kill the process
# Windows
netstat -ano | findstr :5175
taskkill /PID <PID> /F
```

**Issue:** API calls failing
- Ensure backend is running on port 5000
- Check `VITE_API_BASE` in `frontend/.env`
- Check browser console for CORS errors

### Database Issues

**Issue:** Cannot connect to MongoDB
```bash
# Check if MongoDB is running
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl status mongod
```

**Issue:** Collections not created
- Run seed script: `node scripts/seedData.js`
- Manually create collections in MongoDB Compass

---

## 📱 Available Scripts

### Backend
```bash
npm start          # Start server
npm run dev        # Start with nodemon (auto-restart)
npm test           # Run tests
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## 🌐 Default User Roles

After running `seedData.js`, you'll have these default accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Organization | org@example.com | org123 |
| Donor | donor@example.com | donor123 |
| Receiver | receiver@example.com | receiver123 |
| Helper | helper@example.com | helper123 |

**⚠️ Change these passwords in production!**

---

## � Step 8: Deploy to Render (Production)

### 8.1 Prerequisites for Render Deployment

- GitHub account with your repository pushed
- Render account (sign up at [render.com](https://render.com))
- MongoDB Atlas cluster (or use Render's MongoDB)

### 8.2 Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster (M0 Sandbox)
3. Go to Database Access → Add New Database User
4. Create username and password (save these!)
5. Go to Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
6. Go to Database → Connect → Connect your application
7. Copy connection string: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0`

### 8.3 Create Backend Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `donation-charity-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main` (or `master`)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 8.4 Add Environment Variables in Render

**CRITICAL:** Click **Advanced** and add these environment variables:

```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/donationDB?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-change-this-in-production
JWT_EXPIRE=7d
MAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key-here
MAIL_FROM=noreply@yourdomain.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
FRONTEND_URL=https://your-frontend-url.vercel.app
VIDEO_SERVER_PORT=5001
```

**⚠️ Important Notes:**
- Replace ALL placeholder values with actual credentials
- Use the MongoDB Atlas connection string (not localhost)
- Generate a new, strong JWT_SECRET for production
- Add `/donationDB` to your MongoDB URI to specify the database name

### 8.5 Deploy Frontend to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add environment variables:
   ```env
   VITE_API_BASE=https://your-backend-name.onrender.com
   VITE_VIDEO_SERVER=https://your-backend-name.onrender.com
   VITE_NODE_ENV=production
   ```

6. Deploy!

### 8.6 Update Backend FRONTEND_URL

After Vercel deployment:
1. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Go back to Render Dashboard → Your Backend Service
3. Update `FRONTEND_URL` environment variable with your Vercel URL
4. Click **Manual Deploy** → **Deploy latest commit**

### 8.7 Verify Deployment

**Test Backend:**
```bash
curl https://your-backend-name.onrender.com/health
```

**Test Frontend:**
Open `https://your-app.vercel.app` in browser

**Common Issues:**
- ❌ **MONGO_URI undefined**: Add MONGO_URI in Render environment variables
- ❌ **SENDGRID_API_KEY missing**: Add SENDGRID_API_KEY in Render
- ❌ **CORS errors**: Update FRONTEND_URL to match your Vercel URL
- ❌ **MongoDB connection failed**: Check MongoDB Atlas IP whitelist (use 0.0.0.0/0)

---

## �📚 Next Steps

1. ✅ Complete the initial setup above
2. 📖 Read the [README.md](./README.md) for project overview
3. 🎨 Explore the frontend at `http://localhost:5175`
4. 🔌 Test API endpoints at `http://localhost:5000/api`
5. 📊 View MongoDB data using [MongoDB Compass](https://www.mongodb.com/products/compass)
6. 🚀 Deploy to production using Step 8 above

---

## 💡 Tips

- Use **MongoDB Compass** for visual database management
- Use **Postman** or **Thunder Client** for API testing
- Enable **React Developer Tools** browser extension
- Check browser console for frontend errors
- Check terminal for backend errors
- Use `nodemon` for automatic backend restarts during development

---

## 🆘 Need Help?

- 📧 Email: support@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/NaiduBugata/Social-Impact-Donation-Charity-Management-System/issues)
- 📖 Documentation: Check README.md

---

## ✨ Quick Start Commands

```bash
# Terminal 1 - Backend
cd backend
npm install
cp .env.example .env
# Edit .env file with your configurations
npm start

# Terminal 2 - Frontend
cd frontend
npm install
cp .env.example .env
npm run dev

# Terminal 3 - MongoDB (if not running as service)
mongod

# Terminal 4 - Video Server (optional)
cd backend
node video-server.js
```

---

**🎉 You're all set! Happy coding!**
