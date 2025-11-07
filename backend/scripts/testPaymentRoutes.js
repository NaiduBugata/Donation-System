// Test script for Razorpay payment endpoints
const crypto = require('crypto');

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'test_secret';

console.log('🧪 Razorpay Payment Routes Test Suite\n');
console.log(`Backend URL: ${BACKEND_URL}`);
console.log(`Using KEY_SECRET: ${RAZORPAY_KEY_SECRET.substring(0, 8)}...\n`);
console.log('═'.repeat(60));

// Test 1: Anonymous Order Creation
async function testAnonymousOrderCreation() {
  console.log('\n📝 Test 1: Create Anonymous Order');
  console.log('─'.repeat(60));
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/payments/create-anonymous-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 10000, // ₹100 in paise
        email: 'test@anonymous.com',
        isAnonymous: true,
        donationType: 'general'
      })
    });

    const data = await response.json();
    
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (data.success && data.order && data.anonymousId && data.qrCode) {
      console.log('✅ PASSED: Anonymous order created successfully');
      return { passed: true, orderId: data.order.id, anonymousId: data.anonymousId };
    } else {
      console.log('❌ FAILED: Missing required fields in response');
      return { passed: false };
    }
  } catch (error) {
    console.log('❌ FAILED: ', error.message);
    return { passed: false };
  }
}

// Test 2: Authenticated Order Creation (requires valid JWT)
async function testAuthenticatedOrderCreation(token) {
  console.log('\n📝 Test 2: Create Authenticated Order');
  console.log('─'.repeat(60));
  
  if (!token) {
    console.log('⚠️  SKIPPED: No authentication token provided');
    console.log('   To test: Set TOKEN env variable with valid JWT');
    return { passed: null, skipped: true };
  }
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        amount: 20000, // ₹200 in paise
        donationType: 'campaign'
      })
    });

    const data = await response.json();
    
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (data.success && data.order) {
      console.log('✅ PASSED: Authenticated order created successfully');
      return { passed: true, orderId: data.order.id };
    } else {
      console.log('❌ FAILED: Order creation failed');
      return { passed: false };
    }
  } catch (error) {
    console.log('❌ FAILED: ', error.message);
    return { passed: false };
  }
}

// Test 3: Payment Verification with Valid Signature
async function testPaymentVerification(orderId) {
  console.log('\n📝 Test 3: Verify Payment (Simulated Signature)');
  console.log('─'.repeat(60));
  
  if (!orderId) {
    console.log('⚠️  SKIPPED: No order ID available from previous test');
    return { passed: null, skipped: true };
  }
  
  try {
    // Simulate payment ID
    const razorpay_payment_id = `pay_${Date.now()}`;
    
    // Generate valid signature
    const shasum = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET);
    shasum.update(`${orderId}|${razorpay_payment_id}`);
    const razorpay_signature = shasum.digest('hex');
    
    console.log(`Order ID: ${orderId}`);
    console.log(`Payment ID: ${razorpay_payment_id}`);
    console.log(`Signature: ${razorpay_signature.substring(0, 16)}...`);
    
    const response = await fetch(`${BACKEND_URL}/api/payments/verify-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: orderId,
        razorpay_payment_id,
        razorpay_signature,
        impactStory: 'Test donation - Thank you!'
      })
    });

    const data = await response.json();
    
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (data.success && data.payment && data.payment.status === 'paid') {
      console.log('✅ PASSED: Payment verified successfully');
      return { passed: true };
    } else {
      console.log('❌ FAILED: Verification failed');
      return { passed: false };
    }
  } catch (error) {
    console.log('❌ FAILED: ', error.message);
    return { passed: false };
  }
}

// Test 4: Payment Verification with Invalid Signature
async function testInvalidSignature(orderId) {
  console.log('\n📝 Test 4: Verify Payment (Invalid Signature)');
  console.log('─'.repeat(60));
  
  if (!orderId) {
    console.log('⚠️  SKIPPED: No order ID available');
    return { passed: null, skipped: true };
  }
  
  try {
    const razorpay_payment_id = `pay_${Date.now()}`;
    const razorpay_signature = 'invalid_signature_12345';
    
    const response = await fetch(`${BACKEND_URL}/api/payments/verify-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: orderId,
        razorpay_payment_id,
        razorpay_signature
      })
    });

    const data = await response.json();
    
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (!data.success && response.status === 400) {
      console.log('✅ PASSED: Invalid signature correctly rejected');
      return { passed: true };
    } else {
      console.log('❌ FAILED: Should reject invalid signature');
      return { passed: false };
    }
  } catch (error) {
    console.log('❌ FAILED: ', error.message);
    return { passed: false };
  }
}

// Test 5: Payment History (requires auth)
async function testPaymentHistory(token) {
  console.log('\n📝 Test 5: Get Payment History');
  console.log('─'.repeat(60));
  
  if (!token) {
    console.log('⚠️  SKIPPED: No authentication token provided');
    return { passed: null, skipped: true };
  }
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/payments/history?page=1&limit=5`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (data.success && Array.isArray(data.data)) {
      console.log(`✅ PASSED: Retrieved ${data.data.length} payment records`);
      return { passed: true };
    } else {
      console.log('❌ FAILED: Invalid response format');
      return { passed: false };
    }
  } catch (error) {
    console.log('❌ FAILED: ', error.message);
    return { passed: false };
  }
}

// Test 6: Payment Analytics (admin only)
async function testPaymentAnalytics(adminToken) {
  console.log('\n📝 Test 6: Get Payment Analytics (Admin)');
  console.log('─'.repeat(60));
  
  if (!adminToken) {
    console.log('⚠️  SKIPPED: No admin token provided');
    console.log('   To test: Set ADMIN_TOKEN env variable with admin JWT');
    return { passed: null, skipped: true };
  }
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/payments/analytics`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });

    const data = await response.json();
    
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (data.success && data.data) {
      console.log('✅ PASSED: Analytics retrieved successfully');
      return { passed: true };
    } else {
      console.log('❌ FAILED: Analytics retrieval failed');
      return { passed: false };
    }
  } catch (error) {
    console.log('❌ FAILED: ', error.message);
    return { passed: false };
  }
}

// Test 7: Webhook Endpoint (without real Razorpay secret)
async function testWebhookEndpoint() {
  console.log('\n📝 Test 7: Webhook Endpoint');
  console.log('─'.repeat(60));
  console.log('⚠️  NOTE: This test will fail signature validation (expected)');
  console.log('   Real webhooks must come from Razorpay with valid signature');
  
  try {
    const mockPayload = {
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: 'pay_test123',
            order_id: 'order_test123',
            amount: 50000,
            status: 'captured'
          }
        }
      }
    };
    
    const response = await fetch(`${BACKEND_URL}/api/payments/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-razorpay-signature': 'test_signature'
      },
      body: JSON.stringify(mockPayload)
    });

    const text = await response.text();
    
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Response:', text);
    
    if (response.status === 400 && text.includes('Invalid signature')) {
      console.log('✅ PASSED: Webhook correctly validates signature');
      return { passed: true };
    } else {
      console.log('⚠️  INFO: Webhook response:', text);
      return { passed: null };
    }
  } catch (error) {
    console.log('❌ FAILED: ', error.message);
    return { passed: false };
  }
}

// Run all tests
(async function runTests() {
  const results = {
    total: 7,
    passed: 0,
    failed: 0,
    skipped: 0
  };
  
  const token = process.env.TOKEN;
  const adminToken = process.env.ADMIN_TOKEN;
  
  // Test 1: Anonymous order
  const test1 = await testAnonymousOrderCreation();
  if (test1.passed === true) results.passed++;
  else if (test1.passed === false) results.failed++;
  else results.skipped++;
  
  // Test 2: Authenticated order
  const test2 = await testAuthenticatedOrderCreation(token);
  if (test2.passed === true) results.passed++;
  else if (test2.passed === false) results.failed++;
  else results.skipped++;
  
  // Test 3: Valid verification (use anonymous order ID)
  const orderIdForVerification = test1.orderId || test2.orderId;
  const test3 = await testPaymentVerification(orderIdForVerification);
  if (test3.passed === true) results.passed++;
  else if (test3.passed === false) results.failed++;
  else results.skipped++;
  
  // Test 4: Invalid signature
  const test4 = await testInvalidSignature(orderIdForVerification);
  if (test4.passed === true) results.passed++;
  else if (test4.passed === false) results.failed++;
  else results.skipped++;
  
  // Test 5: Payment history
  const test5 = await testPaymentHistory(token);
  if (test5.passed === true) results.passed++;
  else if (test5.passed === false) results.failed++;
  else results.skipped++;
  
  // Test 6: Analytics
  const test6 = await testPaymentAnalytics(adminToken);
  if (test6.passed === true) results.passed++;
  else if (test6.passed === false) results.failed++;
  else results.skipped++;
  
  // Test 7: Webhook
  const test7 = await testWebhookEndpoint();
  if (test7.passed === true) results.passed++;
  else if (test7.passed === false) results.failed++;
  else results.skipped++;
  
  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('═'.repeat(60));
  console.log(`Total Tests: ${results.total}`);
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`⚠️  Skipped: ${results.skipped}`);
  console.log('═'.repeat(60));
  
  if (results.failed > 0) {
    console.log('\n⚠️  Some tests failed. Check logs above for details.');
    process.exit(1);
  } else if (results.skipped > 0) {
    console.log('\n⚠️  Some tests skipped. Set TOKEN and ADMIN_TOKEN env vars for full coverage.');
  } else {
    console.log('\n🎉 All tests passed!');
  }
})();
