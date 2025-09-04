const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'c-0893750ab777a142a105a0bae065ea',
  api_key: '283458285266137',
  api_secret: '1ug1pCmOil2K3q8Bl4DfDHpGKjY'
});

console.log('🔍 Testing Cloudinary connection...');
console.log('Cloud Name:', cloudinary.config().cloud_name);
console.log('API Key:', cloudinary.config().api_key);

// Simple test upload
cloudinary.uploader.upload(
  'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  {
    resource_type: 'video',
    folder: 'viral-videos',
    public_id: `test_video_${Date.now()}`
  },
  function(error, result) {
    if (error) {
      console.error('❌ Upload failed:', error.message);
    } else {
      console.log('\n✅ Video uploaded successfully!');
      console.log('📹 Video URL:', result.secure_url);
      console.log('🆔 Public ID:', result.public_id);
      console.log('📁 Folder:', result.folder);
      console.log('⏱️ Duration:', result.duration, 'seconds');
      console.log('📏 Size:', (result.bytes / 1024 / 1024).toFixed(2), 'MB');
      
      console.log('\n🔗 You can view this video at:');
      console.log(result.secure_url);
      
      console.log('\n📊 Your Cloudinary Dashboard:');
      console.log(`https://console.cloudinary.com/app/${cloudinary.config().cloud_name}/home/dashboard`);
    }
  }
);
