const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'c-0893750ab777a142a105a0bae065ea',
  api_key: '283458285266137',
  api_secret: '1ug1pCmOil2K3q8Bl4DfDHpGKjY'
});

async function checkCloudinaryAccount() {
  try {
    console.log('🔍 Checking Cloudinary account...');
    console.log('Cloud Name:', cloudinary.config().cloud_name);
    console.log('API Key:', cloudinary.config().api_key);
    
    // Get account usage info
    const usage = await cloudinary.api.usage();
    console.log('\n📊 Account Usage:');
    console.log('Plan:', usage.plan);
    console.log('Credits:', usage.credits);
    console.log('Objects:', usage.objects);
    console.log('Bandwidth:', usage.bandwidth);
    
    // List all resources (videos and images)
    console.log('\n🔍 Listing all resources...');
    const resources = await cloudinary.api.resources({
      type: 'upload',
      max_results: 20
    });
    
    if (resources.resources && resources.resources.length > 0) {
      console.log('\n✅ Found resources in your account:');
      resources.resources.forEach((resource, index) => {
        console.log(`\n📁 Resource ${index + 1}:`);
        console.log('  Type:', resource.resource_type);
        console.log('  Public ID:', resource.public_id);
        console.log('  URL:', resource.secure_url);
        console.log('  Format:', resource.format);
        console.log('  Size:', resource.bytes ? (resource.bytes / 1024 / 1024).toFixed(2) + ' MB' : 'N/A');
        console.log('  Created:', new Date(resource.created_at).toLocaleString());
      });
    } else {
      console.log('\n📭 No resources found in your account yet.');
    }
    
    // Try to upload a test video
    console.log('\n🧪 Testing video upload...');
    const uploadResult = await cloudinary.uploader.upload(
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
    console.log('📹 Video URL:', uploadResult.secure_url);
    console.log('🆔 Public ID:', uploadResult.public_id);
    console.log('📁 Folder:', uploadResult.folder);
    
    // Generate the correct dashboard URL
    const dashboardUrl = `https://console.cloudinary.com/app/${cloudinary.config().cloud_name}/home/dashboard`;
    console.log('\n🔗 Your Cloudinary Dashboard:', dashboardUrl);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.http_code === 401) {
      console.log('🔑 Authentication failed. Please check your API credentials.');
    }
  }
}

checkCloudinaryAccount();
