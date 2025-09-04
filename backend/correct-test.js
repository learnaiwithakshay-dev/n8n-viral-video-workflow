const axios = require('axios');
const FormData = require('form-data');

async function testWithCorrectCloudName() {
  try {
    console.log('🚀 Testing Cloudinary upload with correct cloud name...');
    
    // Your correct credentials
    const cloudName = 'dtkps2uzi';
    const apiKey = '283458285266137';
    const apiSecret = '1ug1pCmOil2K3q8Bl4DfDHpGKjY';
    
    // Test with a sample video URL
    const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    
    // Create form data
    const formData = new FormData();
    formData.append('file', videoUrl);
    formData.append('cloud_name', cloudName);
    formData.append('api_key', apiKey);
    formData.append('timestamp', Math.round(new Date().getTime() / 1000));
    formData.append('resource_type', 'video');
    formData.append('folder', 'viral-videos');
    formData.append('public_id', `test_video_${Date.now()}`);
    
    console.log('📤 Uploading to Cloudinary...');
    console.log('Cloud Name:', cloudName);
    console.log('API Key:', apiKey);
    
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
    }
  }
}

testWithCorrectCloudName();
