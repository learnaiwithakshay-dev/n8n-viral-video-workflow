const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dtkps2uzi',
  api_key: '718438387522575',
  api_secret: 'WU0l288kOX_R1hXm2QYD8ASbfZs'
});

async function simpleTest() {
  try {
    console.log('🧪 Simple Cloudinary test...\n');
    
    // Test 1: Check if we can connect to Cloudinary
    console.log('📋 Test 1: Checking Cloudinary connection...');
    const resources = await cloudinary.api.resources({
      resource_type: 'video',
      max_results: 1
    });
    console.log(`✅ Connection successful! Found ${resources.resources.length} videos`);
    
    if (resources.resources.length > 0) {
      console.log(`📁 Sample video: ${resources.resources[0].public_id}`);
      console.log(`🔗 Sample URL: ${resources.resources[0].secure_url}`);
    }
    
    // Test 2: Try to upload from a public URL
    console.log('\n📤 Test 2: Testing upload from public URL...');
    try {
      const result = await cloudinary.uploader.upload(
        'https://res.cloudinary.com/dtkps2uzi/video/upload/v1756999096/samples/elephants.mp4',
        {
          resource_type: 'video',
          folder: 'viral-videos',
          public_id: `test_copy_${Date.now()}`
        }
      );
      
      console.log('✅ Upload from URL successful!');
      console.log(`📁 Public ID: ${result.public_id}`);
      console.log(`🔗 URL: ${result.secure_url}`);
      
    } catch (uploadError) {
      console.error('❌ Upload from URL failed:', uploadError.message);
    }
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
  }
}

// Run the test
simpleTest();
