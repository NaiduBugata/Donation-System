# 🔧 URGENT: Fix Render Deployment Error

## ❌ Current Error:
```
❌ MongoDB connection failed: The `uri` parameter to `openUri()` must be a string, got "undefined"
❌ SENDGRID_API_KEY missing in .env
```

## ✅ Solution: Add Environment Variables in Render

### Step 1: Go to Render Dashboard
1. Open [https://dashboard.render.com/](https://dashboard.render.com/)
2. Click on your backend service
3. Click **Environment** tab in the left sidebar

### Step 2: Add Required Environment Variables

Click **Add Environment Variable** for each of these:

#### **CRITICAL - Must Have:**

```
Key: MONGO_URI
Value: [USE YOUR MONGODB ATLAS URI - Check backend/.env or MongoDB Atlas dashboard]
```

```
Key: JWT_SECRET
Value: [USE YOUR JWT_SECRET FROM backend/.env]
```

```
Key: PORT
Value: 5000
```

```
Key: NODE_ENV
Value: production
```

#### **Email Configuration:**

```
Key: MAIL_PROVIDER
Value: sendgrid
```

```
Key: SENDGRID_API_KEY
Value: [USE YOUR SENDGRID API KEY FROM backend/.env]
```

```
Key: MAIL_FROM
Value: [YOUR VERIFIED SENDGRID EMAIL ADDRESS]
```

#### **Optional (add if you have them):**

```
Key: CLOUDINARY_CLOUD_NAME
Value: your-cloudinary-cloud-name
```

```
Key: CLOUDINARY_API_KEY
Value: your-cloudinary-api-key
```

```
Key: CLOUDINARY_API_SECRET
Value: your-cloudinary-api-secret
```

```
Key: RAZORPAY_KEY_ID
Value: your-razorpay-key-id
```

```
Key: RAZORPAY_KEY_SECRET
Value: your-razorpay-key-secret
```

```
Key: FRONTEND_URL
Value: http://localhost:5175
(Update this later with your actual frontend URL)
```

```
Key: JWT_EXPIRE
Value: 7d
```

### Step 3: Save and Redeploy

1. After adding all variables, click **Save Changes**
2. Render will automatically redeploy your service
3. Wait 2-3 minutes for the build to complete

### Step 4: Verify Deployment

Check the logs in Render dashboard. You should see:
```
✅ MongoDB connection established
✅ Server running on port 5000
```

Test the health endpoint:
```bash
curl https://your-app-name.onrender.com/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2025-11-07T...",
  "uptime": 12.34,
  "environment": "production"
}
```

---

## 🎯 Quick Copy-Paste Format for Render

Here's the format for easy copy-paste into Render's environment variables section:

### Variable 1:
- **Key**: `MONGO_URI`
- **Value**: `[USE YOUR MONGODB ATLAS URI - Check backend/.env]`

### Variable 2:
- **Key**: `JWT_SECRET`
- **Value**: `[USE YOUR JWT_SECRET FROM backend/.env - Long random string]`

### Variable 3:
- **Key**: `PORT`
- **Value**: `5000`

### Variable 4:
- **Key**: `NODE_ENV`
- **Value**: `production`

### Variable 5:
- **Key**: `MAIL_PROVIDER`
- **Value**: `sendgrid`

### Variable 6:
- **Key**: `SENDGRID_API_KEY`
- **Value**: `[USE YOUR SENDGRID API KEY FROM backend/.env]`

### Variable 7:
- **Key**: `MAIL_FROM`
- **Value**: `[YOUR VERIFIED SENDGRID EMAIL]`

### Variable 8:
- **Key**: `FRONTEND_URL`
- **Value**: `http://localhost:5175`

### Variable 9:
- **Key**: `JWT_EXPIRE`
- **Value**: `7d`

---

## ⚠️ Important MongoDB Atlas Setup

If MongoDB connection still fails, check MongoDB Atlas:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **Network Access** (left sidebar)
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere**
5. Enter `0.0.0.0/0` in the IP Address field
6. Click **Confirm**

This allows Render servers to connect to your database.

---

## 🔍 Troubleshooting

### Still getting "MONGO_URI undefined"?
- Double-check the variable name is exactly `MONGO_URI` (all caps)
- Make sure there are no extra spaces in the key or value
- Click "Save Changes" after adding variables

### Still getting "SENDGRID_API_KEY missing"?
- Variable name must be exactly `SENDGRID_API_KEY`
- Copy the API key without any quotes or spaces
- Verify the API key is active in SendGrid dashboard

### Deployment keeps failing?
- Check the **Logs** tab in Render dashboard
- Look for specific error messages
- Ensure all required variables are added

---

## ✅ Success Indicators

Your deployment is successful when you see:
```
✅ MongoDB connection established
✅ Email service configured
✅ Server running on port 5000
✅ Build successful 🎉
✅ Live at: https://your-app-name.onrender.com
```

---

**Need more help?** Check the full [SETUP.md](./SETUP.md) for complete deployment guide.
