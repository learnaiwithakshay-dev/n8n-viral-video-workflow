const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dtkps2uzi',
  api_key: '718438387522575',
  api_secret: 'WU0l288kOX_R1hXm2QYD8ASbfZs'
});

async function testCloudinaryUpload() {
  try {
    console.log('🧪 Testing Cloudinary upload...\n');
    
    // Test upload a small video
    const testVideoUrl = 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4';
    
    console.log('📤 Attempting to upload test video...');
    
    const result = await cloudinary.uploader.upload(testVideoUrl, {
      resource_type: 'video',
      folder: 'viral-videos',
      public_id: `test_video_${Date.now()}`,
      transformation: [
        { width: 1080, height: 1920, crop: 'fill' },
        { quality: 'auto' }
      ]
    });
    
    console.log('✅ Upload successful!');
    console.log(`📁 Public ID: ${result.public_id}`);
    console.log(`🔗 URL: ${result.secure_url}`);
    console.log(`📏 Size: ${(result.bytes / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📂 Folder: ${result.folder}`);
    
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    
    if (error.message.includes('Upload preset')) {
      console.log('💡 You need to create an upload preset in Cloudinary dashboard');
      console.log('📋 Go to Settings → Upload → Upload presets');
      console.log('🔧 Create a preset named "viral_videos" with folder: viral-videos');
    }
  }
}

// Run the test
testCloudinaryUpload();
