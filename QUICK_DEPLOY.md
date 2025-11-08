# 🚀 Quick Deployment Guide

## ✅ Current Status: **READY FOR DEPLOYMENT**

Everything is configured and tested locally. Follow these steps to deploy to production.

---

## 🎯 Fastest Deployment Path (Recommended)

### **Frontend: Vercel** (Free tier available)
### **Backend: Render** (Free tier available)

---

## 📦 Step-by-Step Deployment

### 1️⃣ Deploy Backend First (Render.com)

#### A. Create Render Account
1. Go to https://render.com
2. Sign up with GitHub

#### B. Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your repo: `Social-Impact-Donation-Charity-Management-System`

#### C. Configure Service
```
Name: donation-backend
Region: Choose closest to your users
Branch: master
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
```

#### D. Add Environment Variables
Click **"Environment"** and add these:

```bash
NODE_ENV=production
PORT=5000

# Your MongoDB Atlas connection string
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/donationDB

# Generate a strong 32+ character secret
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-here
JWT_EXPIRE=7d

# Your SendGrid API key
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
MAIL_FROM=noreply@yourdomain.com

# Your Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your-api-secret

# Will update this after frontend deployment
FRONTEND_URL=https://your-app.vercel.app
```

#### E. Deploy
1. Click **"Create Web Service"**
2. Wait for build and deployment (~2-3 minutes)
3. Copy your backend URL: `https://donation-backend-xxxx.onrender.com`
4. Test it: Visit `https://your-backend-url.onrender.com/health`

---

### 2️⃣ Deploy Frontend (Vercel)

#### A. Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub

#### B. Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your repository
3. Configure:

```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### C. Add Environment Variables
Click **"Environment Variables"** and add:

```bash
# Your Render backend URL from Step 1
VITE_API_BASE=https://donation-backend-xxxx.onrender.com

# Video server URL (same as backend for now)
VITE_VIDEO_SERVER=https://donation-backend-xxxx.onrender.com

VITE_NODE_ENV=production
```

#### D. Deploy
1. Click **"Deploy"**
2. Wait for build (~1-2 minutes)
3. Your app will be live at: `https://your-app-name.vercel.app`

---

### 3️⃣ Update Backend CORS

After frontend is deployed, update backend environment variables on Render:

```bash
FRONTEND_URL=https://your-app-name.vercel.app
```

Then redeploy the backend (it will automatically redeploy when you save env vars).

---

### 4️⃣ Configure MongoDB Atlas

1. Go to https://cloud.mongodb.com
2. Select your cluster
3. Click **"Network Access"**
4. Click **"Add IP Address"**
5. Add: `0.0.0.0/0` (Allow from anywhere)
   - Or add Render's IP addresses specifically
6. Click **"Confirm"**

---

### 5️⃣ Verify Deployment

#### Test Backend:
```bash
# Health check
curl https://your-backend-url.onrender.com/health

# Should return:
# {"status":"OK","timestamp":"...","uptime":...}
```

#### Test Frontend:
1. Open `https://your-app-name.vercel.app`
2. Try to register a new user
3. Try to login
4. Check if API calls work

#### Test Full Flow:
1. Register as a donor
2. Login with donor credentials
3. Browse campaigns
4. Make a test donation
5. Check admin dashboard

---

## 🔧 Alternative: Docker Deployment

If you prefer Docker:

### Backend:
```bash
cd backend

# Build
docker build -t donation-backend .

# Run
docker run -d \
  -p 5000:5000 \
  -e MONGO_URI="your-mongodb-uri" \
  -e JWT_SECRET="your-jwt-secret" \
  -e SENDGRID_API_KEY="your-sendgrid-key" \
  -e CLOUDINARY_CLOUD_NAME="your-cloud" \
  -e CLOUDINARY_API_KEY="your-key" \
  -e CLOUDINARY_API_SECRET="your-secret" \
  -e NODE_ENV="production" \
  donation-backend
```

### Frontend:
```bash
cd frontend

# Build with backend URL
docker build -t donation-frontend \
  --build-arg VITE_API_BASE=https://your-backend-url.com .

# Run
docker run -d -p 80:80 donation-frontend
```

---

## 🎯 Post-Deployment Tasks

### 1. Test All Features
- [ ] User registration (all roles)
- [ ] User login
- [ ] Campaign creation
- [ ] Donations
- [ ] Admin dashboard
- [ ] File uploads
- [ ] Email notifications
- [ ] Geo-matching

### 2. Monitor Logs
- Render: Check "Logs" tab for backend errors
- Vercel: Check "Deployments" → "Logs" for frontend issues

### 3. Set Up Custom Domain (Optional)
- **Vercel**: Settings → Domains → Add Domain
- **Render**: Settings → Custom Domain

### 4. Enable HTTPS
- Both Vercel and Render provide free SSL certificates automatically

---

## 🚨 Troubleshooting

### Backend Issues

**Error: Cannot connect to MongoDB**
- Check MongoDB Atlas IP whitelist
- Verify MONGO_URI is correct
- Check MongoDB Atlas cluster is running

**Error: SendGrid email not sending**
- Verify sender email in SendGrid
- Check API key has "Mail Send" permission
- Check SENDGRID_API_KEY is correct

**Error: CORS errors in browser**
- Update FRONTEND_URL in backend env vars
- Redeploy backend
- Clear browser cache

### Frontend Issues

**Error: API calls failing**
- Check VITE_API_BASE is set correctly
- Verify backend is running
- Check browser console for errors

**Error: Build failing**
- Check for syntax errors
- Verify all dependencies installed
- Check node version (use 18+)

**Error: 404 on page refresh**
- This is normal for SPAs
- Vercel automatically handles this with rewrites

---

## 📊 Deployment Checklist

Before going live:

- [ ] MongoDB Atlas configured with IP whitelist
- [ ] SendGrid sender email verified
- [ ] Cloudinary account set up
- [ ] Strong JWT secret generated (32+ chars)
- [ ] Backend deployed and health check passing
- [ ] Frontend deployed and loading
- [ ] CORS configured correctly
- [ ] Test user registration works
- [ ] Test login works
- [ ] API calls working between frontend/backend
- [ ] File uploads working (Cloudinary)
- [ ] Emails sending (SendGrid)
- [ ] All environment variables set
- [ ] Production URLs updated in both apps

---

## 🎉 Success!

Your application should now be live and accessible!

- **Frontend:** https://your-app-name.vercel.app
- **Backend:** https://your-backend-name.onrender.com

---

## 📞 Need Help?

### Common Issues:
1. **Port 5000 already in use locally**: Kill the process or use different port
2. **Build fails**: Check Node version (need 18+)
3. **API not connecting**: Verify VITE_API_BASE matches backend URL
4. **Database connection fails**: Check MongoDB Atlas IP whitelist

### Test Credentials (Created Earlier):
- Admin: admin@test.com / admin123
- Donor: donor@test.com / donor123
- Helper: helper@test.com / helper123
- Receiver: receiver@test.com / receiver123
- Organization: org@test.com / org123

---

**Estimated Total Deployment Time: 15-20 minutes** ⏱️

*Both Vercel and Render offer free tiers perfect for testing and small-scale deployment.*
