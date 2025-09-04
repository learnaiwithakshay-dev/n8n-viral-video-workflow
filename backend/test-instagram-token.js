const axios = require('axios');
require('dotenv').config();

async function testInstagramToken() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const businessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  
  console.log('🔍 Testing Instagram Token...');
  console.log('Access Token:', accessToken ? accessToken.substring(0, 20) + '...' : 'NOT FOUND');
  console.log('Business Account ID:', businessAccountId);
  console.log('');
  
  if (!accessToken) {
    console.log('❌ No access token found in .env file');
    return;
  }
  
  try {
    // Test 1: Check if token is valid
    console.log('📋 Test 1: Validating token...');
    const meResponse = await axios.get(`https://graph.facebook.com/v18.0/me`, {
      params: {
        access_token: accessToken,
        fields: 'id,name'
      }
    });
    console.log('✅ Token is valid!');
    console.log('User:', meResponse.data.name, `(ID: ${meResponse.data.id})`);
    console.log('');
    
    // Test 2: Check Instagram Business Account
    console.log('📋 Test 2: Checking Instagram Business Account...');
    const igResponse = await axios.get(`https://graph.facebook.com/v18.0/${businessAccountId}`, {
      params: {
        access_token: accessToken,
        fields: 'id,name,username,followers_count,profile_picture_url'
      }
    });
    console.log('✅ Instagram Business Account found!');
    console.log('Account:', igResponse.data.name);
    console.log('Username:', igResponse.data.username);
    console.log('Followers:', igResponse.data.followers_count);
    console.log('');
    
    // Test 3: Check permissions
    console.log('📋 Test 3: Checking permissions...');
    const permissionsResponse = await axios.get(`https://graph.facebook.com/v18.0/me/permissions`, {
      params: {
        access_token: accessToken
      }
    });
    
    const permissions = permissionsResponse.data.data;
    console.log('📋 Current permissions:');
    permissions.forEach(perm => {
      const status = perm.status === 'granted' ? '✅' : '❌';
      console.log(`${status} ${perm.permission}: ${perm.status}`);
    });
    
    // Check for required permissions
    const requiredPermissions = ['instagram_basic', 'instagram_content_publish', 'pages_read_engagement'];
    console.log('');
    console.log('📋 Required permissions check:');
    requiredPermissions.forEach(perm => {
      const found = permissions.find(p => p.permission === perm && p.status === 'granted');
      console.log(`${found ? '✅' : '❌'} ${perm}`);
    });
    
  } catch (error) {
    console.log('❌ Error testing token:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error Code:', error.response.data.error?.code);
      console.log('Error Type:', error.response.data.error?.type);
      console.log('Error Message:', error.response.data.error?.message);
      console.log('Full Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('Error:', error.message);
    }
  }
}

testInstagramToken();
