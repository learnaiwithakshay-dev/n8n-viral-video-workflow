const axios = require('axios');

async function testN8nConnection() {
  const n8nWebhookUrl = 'https://learnaiwithakshay.app.n8n.cloud/webhook-test/webhook-test';
  
  const testPayload = {
    videoData: {
      id: 'test_123',
      filename: 'test_video.mp4',
      airtableRecordId: 'temp_record_123',
      airtableVideoUrl: 'https://temp-video-storage.com/videos/test_video.mp4'
    },
    title: 'Test Viral Title',
    accountId: 'test_account',
    accountName: 'Test Account'
  };

  try {
    console.log('🔍 Testing n8n webhook connection...');
    console.log('URL:', n8nWebhookUrl);
    console.log('Payload:', JSON.stringify(testPayload, null, 2));
    
    const response = await axios.post(n8nWebhookUrl, testPayload, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('✅ n8n Response:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.error('❌ n8n connection failed:');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return false;
  }
}

testN8nConnection();
