const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dtkps2uzi',
  api_key: '718438387522575',
  api_secret: 'WU0l288kOX_R1hXm2QYD8ASbfZs'
});

async function testCloudinaryUpload() {
  try {
    console.log('🧪 Testing Cloudinary upload functionality...\n');
    
    // Test 1: Check if we can list existing resources
    console.log('📋 Test 1: Listing existing resources...');
    const resources = await cloudinary.api.resources({
      resource_type: 'video',
      max_results: 5
    });
    console.log(`✅ Found ${resources.resources.length} existing videos\n`);
    
    // Test 2: Try to upload a small test file
    console.log('📤 Test 2: Attempting to upload a test file...');
    
    // Create a small test video file (1KB of data)
    const fs = require('fs');
    const testFilePath = './test_video.mp4';
    
    // Create a minimal MP4 file (just header data)
    const testData = Buffer.from([
      0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6F, 0x6D,
      0x00, 0x00, 0x02, 0x00, 0x69, 0x73, 0x6F, 0x6D, 0x69, 0x73, 0x6F, 0x32,
      0x61, 0x76, 0x63, 0x31, 0x6D, 0x70, 0x34, 0x31
    ]);
    
    fs.writeFileSync(testFilePath, testData);
    console.log(`📁 Created test file: ${testFilePath} (${testData.length} bytes)`);
    
    try {
      const result = await cloudinary.uploader.upload(testFilePath, {
        resource_type: 'video',
        folder: 'viral-videos',
        public_id: `test_upload_${Date.now()}`,
        transformation: [
          { width: 1080, height: 1920, crop: 'fill' },
          { quality: 'auto' }
        ]
      });
      
      console.log('✅ Upload successful!');
      console.log(`📁 Public ID: ${result.public_id}`);
      console.log(`🔗 URL: ${result.secure_url}`);
      console.log(`📏 Size: ${result.bytes} bytes`);
      console.log(`📂 Folder: ${result.folder}`);
      
      // Test 3: Verify the URL is accessible
      console.log('\n🔗 Test 3: Testing URL accessibility...');
      const axios = require('axios');
      try {
        const response = await axios.head(result.secure_url);
        console.log(`✅ URL is accessible (Status: ${response.status})`);
      } catch (urlError) {
        console.log(`⚠️ URL accessibility test failed: ${urlError.message}`);
      }
      
    } catch (uploadError) {
      console.error('❌ Upload failed:', uploadError.message);
      
      if (uploadError.message.includes('Invalid file')) {
        console.log('💡 The test file format might be invalid. Let\'s try a different approach.');
      }
    } finally {
      // Clean up test file
      if (fs.existsSync(testFilePath)) {
        fs.unlinkSync(testFilePath);
        console.log('🧹 Cleaned up test file');
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testCloudinaryUpload();
