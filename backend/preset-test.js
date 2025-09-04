const axios = require('axios');
const FormData = require('form-data');

async function testWithUploadPreset() {
  try {
    console.log('🚀 Testing Cloudinary upload with preset...');
    
    // Your correct credentials
    const cloudName = 'dtkps2uzi';
    const uploadPreset = 'viral_videos'; // You need to create this in your dashboard
    
    // Test with a sample video URL
    const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    
    // Create form data
    const formData = new FormData();
    formData.append('file', videoUrl);
    formData.append('upload_preset', uploadPreset);
    formData.append('public_id', `test_video_${Date.now()}`);
    
    console.log('📤 Uploading to Cloudinary...');
    console.log('Cloud Name:', cloudName);
    console.log('Upload Preset:', uploadPreset);
    
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        }
      }
    );
    
    console.log('✅ Upload successful!');
    console.log('Video URL:', response.data.secure_url);
    console.log('Public ID:', response.data.public_id);
    console.log('Duration:', response.data.duration, 'seconds');
    console.log('Size:', (response.data.bytes / 1024 / 1024).toFixed(2), 'MB');
    
    console.log('\n🔗 You can view this video at:');
    console.log(response.data.secure_url);
    
    console.log('\n📊 Your Cloudinary Dashboard:');
    console.log(`https://console.cloudinary.com/app/${cloudName}/home/dashboard`);
    
  } catch (error) {
    console.error('❌ Upload failed:', error.response?.data || error.message);
    
    if (error.response?.data?.error?.message) {
      console.log('Error details:', error.response.data.error.message);
      console.log('\n💡 Please create an upload preset named "viral_videos" in your Cloudinary dashboard');
      console.log('Go to: https://console.cloudinary.com/app/dtkps2uzi/settings/upload');
    }
  }
}

testWithUploadPreset();
