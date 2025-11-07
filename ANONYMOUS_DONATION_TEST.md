# Anonymous Donation Testing Guide

## ✅ Anonymous Donation Features Implemented

### Backend Features:
1. **Payment Model Updates**:
   - `user` field is now conditional (not required for anonymous donations)
   - Added `anonymousId` and `donorEmail` fields for anonymous tracking
   - Added `isAnonymous` boolean flag

2. **AnonymousTracker Model**:
   - Tracks anonymous donor statistics
   - Generates unique QR codes for tracking
   - Maintains total donations, amount, and impact score

3. **New API Endpoints**:
   - `POST /api/payments/create-anonymous-order` - Creates anonymous payment orders
   - `POST /api/payments/verify-payment` - Now handles both authenticated and anonymous payments

### Frontend Features:
1. **DonationFlow Component**:
   - Anonymous checkbox option
   - Email input field for anonymous donations (appears when anonymous is selected)
   - Supports both authenticated and anonymous payment flows
   - Displays QR code for anonymous donations after successful payment

2. **RazorpayPayment Component**:
   - Updated to handle anonymous donation parameters
   - Validates email for anonymous donations
   - Returns anonymous tracking data in success callback

## 🧪 How to Test Anonymous Donations:

### Step 1: Frontend Testing
1. Go to your donation page
2. Select "Financial Donation"
3. Check the "🕵️ Donate Anonymously" checkbox
4. Enter an email address in the email field that appears
5. Enter a donation amount
6. Click "Proceed to Pay"

### Step 2: Payment Flow
1. Should create anonymous order without requiring login
2. Razorpay checkout should open normally
3. Complete payment with test card details
4. Should receive QR code for tracking

### Step 3: Backend Verification
Check the database for:
- Payment record with `isAnonymous: true`
- AnonymousTracker record with QR code
- No user association required

## 🔧 Test Data:
- **Test Email**: test@anonymous.com
- **Test Amount**: ₹100
- **Expected**: QR code generation and anonymous tracking

## 📊 Database Changes:
- `payments` collection: New anonymous fields
- `anonymoustrackers` collection: New collection for tracking
- No breaking changes to existing user payments

## 🎯 Success Criteria:
✅ Anonymous users can donate without logging in  
✅ Email validation works for anonymous donations  
✅ QR codes are generated for tracking  
✅ Payment verification works for anonymous payments  
✅ Anonymous tracker updates donation statistics  
✅ Campaign amounts update correctly  

## 🚨 Important Notes:
- Anonymous donations still require email for tracking and receipts
- QR codes allow anonymous users to track their donation impact
- All existing authenticated donation functionality remains unchanged
- Anonymous donations are fully integrated with Razorpay payment processing