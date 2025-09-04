const axios = require('axios');

async function testN8nWebhook() {
  const webhookUrl = 'https://learnaiwithakshay.app.n8n.cloud/webhook-test/webhook-test';
  
  const testData = {
    videoDescription: 'Test video content',
    videoCategory: 'entertainment',
    title: 'Test Title',
    accountId: 'test_account_123',
    accountName: 'Test Account',
    airtableRecordId: 'temp_record_123',
    airtableVideoUrl: 'https://temp-video-storage.com/videos/test.mp4',
    instagramCredentials: {
      accessToken: 'test_token',
      businessAccountId: 'test_business_id'
    }
  };

  try {
    console.log('Testing n8n webhook...');
    console.log('URL:', webhookUrl);
    console.log('Data:', JSON.stringify(testData, null, 2));
    
    const response = await axios.post(webhookUrl, testData, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('✅ SUCCESS!');
    console.log('Response:', response.data);
  } catch (error) {
    console.log('❌ ERROR!');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Response:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }
}

testN8nWebhook();
