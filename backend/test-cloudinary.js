const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'c-0893750ab777a142a105a0bae065ea',
  api_key: '283458285266137',
  api_secret: '1ug1pCmOil2K3q8Bl4DfDHpGKjY'
});

async function checkCloudinaryVideos() {
  try {
    console.log('🔍 Checking Cloudinary account for videos...');
    
    // List all videos in your account
    const result = await cloudinary.api.resources({
      type: 'video',
      max_results: 10,
      prefix: 'viral-videos/'
    });
    
    console.log('📊 Cloudinary Account Info:');
    console.log('Cloud Name:', cloudinary.config().cloud_name);
    console.log('API Key:', cloudinary.config().api_key);
    
    if (result.resources && result.resources.length > 0) {
      console.log('\n✅ Found videos in Cloudinary:');
      result.resources.forEach((video, index) => {
        console.log(`\n🎥 Video ${index + 1}:`);
        console.log('  Name:', video.public_id);
        console.log('  URL:', video.secure_url);
        console.log('  Duration:', video.duration, 'seconds');
        console.log('  Size:', (video.bytes / 1024 / 1024).toFixed(2), 'MB');
        console.log('  Format:', video.format);
        console.log('  Created:', new Date(video.created_at).toLocaleString());
      });
    } else {
      console.log('\n📭 No videos found in Cloudinary yet.');
      console.log('💡 Upload a video through your frontend to see it here!');
    }
    
    // Test upload a small video file
    console.log('\n🧪 Testing Cloudinary upload...');
    const testResult = await cloudinary.uploader.upload(
      'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
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
    
    console.log('\n✅ Test upload successful!');
    console.log('Test Video URL:', testResult.secure_url);
    console.log('Public ID:', testResult.public_id);
    
  } catch (error) {
    console.error('❌ Error checking Cloudinary:', error.message);
  }
}

checkCloudinaryVideos();
