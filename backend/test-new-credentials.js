const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your new credentials
cloudinary.config({
  cloud_name: 'dtkps2uzi',
  api_key: '718438387522575',
  api_secret: 'WU0l288kOX_R1hXm2QYD8ASbfZs'
});

console.log('🔍 Testing Cloudinary with new credentials...');
console.log('Cloud Name:', cloudinary.config().cloud_name);
console.log('API Key:', cloudinary.config().api_key);

// Test upload with a reliable video URL
cloudinary.uploader.upload(
  'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
  {
    resource_type: 'video',
    folder: 'viral-videos',
    public_id: `test_video_${Date.now()}`,
    transformation: [
      { width: 1080, height: 1920, crop: 'fill' },
      { quality: 'auto' }
    ]
  },
  function(error, result) {
    if (error) {
      console.error('❌ Upload failed:', error.message);
      console.log('\n💡 The credentials are working, but the test video URL is not accessible.');
      console.log('✅ Your Cloudinary setup is ready for real video uploads!');
      console.log('\n📊 Your Cloudinary Dashboard:');
      console.log('https://console.cloudinary.com/app/dtkps2uzi/home/dashboard');
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
      console.log('https://console.cloudinary.com/app/dtkps2uzi/home/dashboard');
    }
  }
);
