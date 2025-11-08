# User Credentials Management

## Overview
This system stores all user registration data in MongoDB database with proper password hashing for security.

## Stored Information

### All Users
- Email (unique identifier)
- Name
- Password (bcrypt hashed - cannot be retrieved in plain text)
- Role (admin/donor/helper/receiver/organization)
- Phone number
- Trust score
- Badge
- KYC status
- Verification status
- Created date

### Role-Specific Fields

#### Helper
- Profession (doctor, teacher, police, etc.)
- License/Professional ID

#### Receiver
- Full address
- Aadhar number (for KYC)

#### Organization/NGO
- Registration number
- Website URL

#### Admin
- Admin code (for verification)

## How to View All Credentials

### Method 1: Run the Script (Recommended)
```bash
cd backend
node scripts/getAllCredentials.js
```

This will display:
- ✅ All user emails
- ✅ Names and roles
- ✅ Phone numbers
- ✅ Role-specific information
- ✅ Trust scores and badges
- ✅ KYC status
- ✅ Hashed passwords (first 20 characters)
- ✅ Summary by role

### Method 2: API Endpoint
```bash
# Requires authentication token
GET /api/users/credentials/all
Authorization: Bearer <your-admin-token>
```

### Method 3: Admin Dashboard
- Login as admin
- Navigate to "Users" tab
- Click "View Details" on any user
- All stored information will be displayed

### Method 4: Direct Database Query
```bash
# Using MongoDB shell or Compass
use social-impact
db.users.find().pretty()
```

## Security Notes

⚠️ **IMPORTANT:**
- Passwords are stored using bcrypt hashing
- Plain text passwords CANNOT be retrieved
- Only hashed versions are stored
- Password can be reset via admin dashboard or API

## Current Status

As of now, the database shows:
- **Total Users: 0** (No registrations yet)

To test the system:
1. Register users through the signup form
2. Run the script again to see stored credentials
3. Check the admin dashboard

## API Endpoints

### Get All Users
```
GET /api/users
Response: List of all users with full details
```

### Get All Credentials (Protected)
```
GET /api/users/credentials/all
Authorization: Bearer <token>
Response: Formatted credentials list
```

### Update User Password
```
PATCH /api/users/:id/password
Body: { "newPassword": "newpass123" }
```

### Delete User
```
DELETE /api/users/:id
```

## Next Steps

1. **Register Test Users:**
   - Register as Donor
   - Register as Helper
   - Register as Receiver
   - Register as Organization

2. **Run the Script:**
   ```bash
   node scripts/getAllCredentials.js
   ```

3. **View in Admin Dashboard:**
   - Login as admin
   - Go to Users tab
   - Click "View Details" on any user

## Troubleshooting

### "No users found"
- Database is empty
- Register users through the signup form first

### "Connection failed"
- Check `.env` file for correct `MONGO_URI`
- Ensure MongoDB Atlas is accessible
- Check network connectivity

### "Unauthorized"
- Ensure you have a valid admin token
- Login as admin first
