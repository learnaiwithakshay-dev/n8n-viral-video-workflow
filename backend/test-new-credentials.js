const cloudinary = require('cloudinary').v2;

// Test with the exact credentials from the service
const credentials = {
  cloud_name: 'dtkps2uzi',
  api_key: '718438387522575',
  api_secret: 'WU0l288kOX_R1hXm2QYD8ASbfZs'
};

console.log('🧪 Testing Cloudinary credentials...');
console.log('📋 Credentials:', {
  cloud_name: credentials.cloud_name,
  api_key: credentials.api_key,
  api_secret: credentials.api_secret.substring(0, 10) + '...'
});

// Configure Cloudinary
cloudinary.config(credentials);

async function testCredentials() {
  try {
    console.log('\n📋 Test 1: Testing API connection...');
    
    // Try to list resources
    const resources = await cloudinary.api.resources({
      resource_type: 'video',
      max_results: 1
    });
    
    console.log('✅ API connection successful!');
    console.log(`📁 Found ${resources.resources.length} videos`);
    
    if (resources.resources.length > 0) {
      console.log(`🔗 Sample URL: ${resources.resources[0].secure_url}`);
    }
    
    console.log('\n📤 Test 2: Testing upload capability...');
    
    // Try to upload a simple text file first
    const fs = require('fs');
    const testFile = './test.txt';
    fs.writeFileSync(testFile, 'This is a test file for Cloudinary');
    
    try {
      const result = await cloudinary.uploader.upload(testFile, {
        folder: 'viral-videos',
        public_id: `test_${Date.now()}`
      });
      
      console.log('✅ Upload test successful!');
      console.log(`📁 Public ID: ${result.public_id}`);
      console.log(`🔗 URL: ${result.secure_url}`);
      
      // Clean up
      fs.unlinkSync(testFile);
      
    } catch (uploadError) {
      console.error('❌ Upload test failed:', uploadError.message);
      fs.unlinkSync(testFile);
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.error('🔍 Full error:', error);
  }
}

testCredentials();
