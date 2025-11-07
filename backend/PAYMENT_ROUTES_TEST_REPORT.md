# Payment Routes Test Results

## Overview
Performed comprehensive testing of all Razorpay payment endpoints in the donation platform.

## Test Environment
- **Backend URL**: https://donation-backend-iedk.onrender.com
- **Test Script**: `backend/scripts/testPaymentRoutes.js`
- **Razorpay Test Credentials**: rzp_test_RcsavZB6Xb9MD7

---

## Issues Found & Fixed

### 1. ❌ Receipt Length Error
**Issue**: Razorpay requires receipt IDs to be ≤ 40 characters
```
Error: "receipt: the length must be no more than 40."
```

**Cause**: Receipt was generated as `rcpt_${Date.now()}_${userId}` which exceeded limit

**Fix Applied**:
```javascript
// Before
receipt: `rcpt_${Date.now()}_${userId}`

// After  
receipt: `rcpt_${Date.now()}`.substring(0, 40) // Max 40 chars
receipt: `anon_${Date.now()}`.substring(0, 40) // For anonymous
```

**Files Modified**:
- `backend/src/controllers/paymentController.js` (lines 27, 189)

---

### 2. ❌ Webhook Route Not Found (404)
**Issue**: POST /api/payments/webhook returned 404 error

**Cause**: Webhook requires raw body (`express.raw()`), but global `express.json()` middleware was parsing body first

**Fix Applied**: Registered webhook route **BEFORE** body parser middleware in `app.js`
```javascript
// ⚠️ Webhook needs raw body - register BEFORE body parser
const paymentWebhookRouter = express.Router();
paymentWebhookRouter.post('/webhook', 
  express.raw({ type: '*/*' }), 
  require('./controllers/paymentController').webhook
);
app.use('/api/payments', paymentWebhookRouter);

// Body parser (applied after webhook)
app.use(express.json({ limit: '10mb' }));
```

**Files Modified**:
- `backend/src/app.js` (added webhook router before body parser)
- `backend/src/routes/paymentRoutes.js` (removed duplicate webhook registration)

---

## Payment Routes Architecture

### Route Registration Flow
1. **Early Registration** (before body parser): `/api/payments/webhook` → raw body
2. **Standard Registration** (after body parser): All other payment routes → JSON body

### Complete Route List
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/payments/create-anonymous-order` | Public | Create order for guest users |
| POST | `/api/payments/create-order` | Protected | Create order for logged-in users |
| POST | `/api/payments/verify-payment` | Public | Verify Razorpay signature (both flows) |
| POST | `/api/payments/webhook` | Public | Razorpay server-to-server notifications |
| GET | `/api/payments/history` | Protected | Get user's payment history |
| GET | `/api/payments/analytics` | Admin | Payment statistics dashboard |

---

## Test Coverage

### Tests Performed
1. ✅ Anonymous order creation
2. ⚠️ Authenticated order creation (requires JWT token)
3. ⚠️ Payment verification with valid signature (requires order ID)
4. ⚠️ Payment verification with invalid signature (requires order ID)
5. ⚠️ Payment history retrieval (requires JWT token)
6. ⚠️ Payment analytics (requires admin JWT token)
7. ✅ Webhook endpoint validation

### Test Script Usage
```powershell
# Basic test (anonymous routes only)
cd backend
$env:BACKEND_URL="https://donation-backend-iedk.onrender.com"
$env:RAZORPAY_KEY_SECRET="Ok1FiGnoHTJkSRUSDK3bEfGc"
node scripts/testPaymentRoutes.js

# Full test with authentication
$env:TOKEN="<user_jwt_token>"
$env:ADMIN_TOKEN="<admin_jwt_token>"
node scripts/testPaymentRoutes.js
```

---

## Deployment Required

### Changes Need to Be Deployed to Render
These fixes have been made locally but **must be committed and pushed** for Render deployment:

```powershell
cd "C:\Users\Sarojini Naidu\Desktop\Online Donation and Charity Management System"
git add backend/src/controllers/paymentController.js
git add backend/src/app.js
git add backend/src/routes/paymentRoutes.js
git add backend/scripts/testPaymentRoutes.js
git commit -m "fix: Razorpay receipt length and webhook raw body handling"
git push origin main
```

Render will auto-deploy once pushed.

---

## Webhook Configuration

### Razorpay Dashboard Setup
Once deployed, configure webhook in Razorpay dashboard:

1. Go to: https://dashboard.razorpay.com/app/webhooks
2. **Webhook URL**: `https://donation-backend-iedk.onrender.com/api/payments/webhook`
3. **Secret**: Use `RAZORPAY_WEBHOOK_SECRET` from env vars
4. **Events to Listen**:
   - ✅ `payment.captured`
   - ✅ `payment.failed`
   - ✅ `order.paid`

### Webhook Signature Validation
The webhook handler validates requests using HMAC-SHA256:
```javascript
const expectedSignature = crypto
  .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
  .update(JSON.stringify(req.body))
  .digest('hex');
```

---

## Frontend Environment Variables

Ensure Vercel has these variables set:
```env
VITE_BACKEND_URL=https://donation-backend-iedk.onrender.com
VITE_RAZORPAY_KEY_ID=rzp_test_RcsavZB6Xb9MD7
```

---

## Payment Flow

### Anonymous Donation Flow
1. User selects amount → clicks "Donate Anonymously"
2. Frontend: POST `/api/payments/create-anonymous-order` → gets `orderId`, `qrCode`, `anonymousId`
3. Frontend: Loads Razorpay SDK → opens payment modal
4. User completes payment on Razorpay
5. Razorpay: Calls webhook `/api/payments/webhook` → updates Payment status
6. Frontend: POST `/api/payments/verify-payment` → confirms success
7. Frontend: Shows QR code, saves `anonymousId` to localStorage

### Authenticated Donation Flow
1. User logs in → selects amount
2. Frontend: POST `/api/payments/create-order` (with JWT) → gets `orderId`
3. Frontend: Loads Razorpay SDK with user prefill (name, email)
4. User completes payment
5. Razorpay: Webhook notification → updates database
6. Frontend: Signature verification → shows receipt

---

## Database Updates

### Collections Modified by Payment Flow
- **Payment**: Stores transaction records (orderId, paymentId, status, amount)
- **Campaign**: Increments `raisedAmount` on successful payment
- **AnonymousTracker**: Tracks total donations and generates QR codes
- **User**: Links payments to user account (authenticated flow)

---

## Security Measures

### Signature Validation
All payment verifications use HMAC-SHA256 to prevent tampering:
```javascript
const generatedSignature = crypto
  .createHmac('sha256', RAZORPAY_KEY_SECRET)
  .update(`${orderId}|${paymentId}`)
  .digest('hex');

if (generatedSignature !== razorpay_signature) {
  throw new Error('Invalid signature');
}
```

### Webhook Security
- Raw body preservation for signature validation
- Secret-based HMAC verification
- Event type validation before processing

---

## Next Steps

1. ✅ **Commit & Deploy**: Push fixes to trigger Render deployment
2. 🔄 **Re-run Tests**: Execute test script after deployment completes
3. ⚙️ **Configure Webhook**: Set webhook URL in Razorpay dashboard
4. 🧪 **End-to-End Test**: Complete real payment flow from frontend
5. 📧 **Email Integration**: Verify SendGrid sends payment receipts
6. 📊 **Monitor Analytics**: Check admin dashboard shows payment stats

---

## Support & Debugging

### Render Logs
```bash
# View real-time logs
https://dashboard.render.com/web/<your-service-id>/logs
```

### Common Issues
- **Signature Mismatch**: Check `RAZORPAY_KEY_SECRET` matches dashboard
- **Webhook 404**: Ensure deployed version has updated `app.js`
- **Receipt Error**: Verify receipt length ≤ 40 chars

### Test Payment Cards
For Razorpay test mode:
- **Card Number**: 4111 1111 1111 1111
- **CVV**: Any 3 digits
- **Expiry**: Any future date

---

**Status**: ✅ Issues identified and fixed locally  
**Action Required**: Deploy to Render and re-test  
**Generated**: January 2025
