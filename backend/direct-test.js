const axios = require('axios');
const FormData = require('form-data');

async function testCloudinaryUpload() {
  try {
    console.log('🚀 Testing Cloudinary upload with direct API...');
    
    // Your credentials
    const cloudName = 'c-0893750ab777a142a105a0bae065ea';
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
    
    // Generate signature (simplified)
    const signature = 'test_signature'; // In production, you'd generate this properly
    
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
    
  } catch (error) {
    console.error('❌ Upload failed:', error.response?.data || error.message);
    
    if (error.response?.data?.error?.message) {
      console.log('Error details:', error.response.data.error.message);
    }
  }
}

testCloudinaryUpload();
