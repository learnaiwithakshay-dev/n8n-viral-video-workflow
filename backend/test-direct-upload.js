const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dtkps2uzi',
  api_key: '718438387522575',
  api_secret: 'WU0l288kOX_R1hXm2QYD8ASbfZs'
});

async function testDirectUpload() {
  try {
    console.log('🧪 Testing direct Cloudinary upload...\n');
    
    // Create a small test video buffer (1KB of random data)
    const testBuffer = Buffer.alloc(1024, 'A');
    
    console.log('📤 Attempting to upload test buffer...');
    console.log(`📁 Buffer size: ${testBuffer.length} bytes`);
    
    const result = await cloudinary.uploader.upload_stream(
      {
        resource_type: 'video',
        folder: 'viral-videos',
        public_id: `test_video_${Date.now()}`,
        transformation: [
          { width: 1080, height: 1920, crop: 'fill' },
          { quality: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          console.error('❌ Upload failed:', error);
        } else {
          console.log('✅ Upload successful!');
          console.log(`📁 Public ID: ${result.public_id}`);
          console.log(`🔗 URL: ${result.secure_url}`);
          console.log(`📏 Size: ${(result.bytes / 1024 / 1024).toFixed(2)} MB`);
          console.log(`📂 Folder: ${result.folder}`);
        }
      }
    );
    
    result.end(testBuffer);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testDirectUpload();
