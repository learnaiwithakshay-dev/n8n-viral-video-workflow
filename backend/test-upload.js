const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'c-0893750ab777a142a105a0bae065ea',
  api_key: '283458285266137',
  api_secret: '1ug1pCmOil2K3q8Bl4DfDHpGKjY'
});

async function testVideoUpload() {
  try {
    console.log('🚀 Testing Cloudinary video upload...');
    
    // Upload a test video from a public URL
    const result = await cloudinary.uploader.upload(
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      {
        resource_type: 'video',
        folder: 'viral-videos',
        public_id: `test_video_${Date.now()}`,
        transformation: [
          { width: 1080, height: 1920, crop: 'fill' },
          { quality: 'auto' }
        ]
      }
    );
    
    console.log('\n✅ Video uploaded successfully!');
    console.log('📹 Video URL:', result.secure_url);
    console.log('🆔 Public ID:', result.public_id);
    console.log('⏱️ Duration:', result.duration, 'seconds');
    console.log('📏 Size:', (result.bytes / 1024 / 1024).toFixed(2), 'MB');
    console.log('📁 Folder:', result.folder);
    
    // Test if the URL is accessible
    console.log('\n🔗 Testing URL accessibility...');
    const response = await fetch(result.secure_url);
    if (response.ok) {
      console.log('✅ Video URL is accessible!');
    } else {
      console.log('❌ Video URL is not accessible');
    }
    
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
  }
}

testVideoUpload();
